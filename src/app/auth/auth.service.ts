import { Injectable } from "@angular/core";
import * as auth0 from "auth0-js";
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";
import { AccountService } from "../account/account.service.ts.service";
import {BehaviorSubject, bindNodeCallback, Observable, of} from "rxjs";

@Injectable()
export class AuthService {
  // Create Auth0 web auth instance
  private _Auth0 = new auth0.WebAuth({
    clientID: environment.auth.CLIENT_ID,
    domain: environment.auth.CLIENT_DOMAIN,
    responseType: "id_token token",
    redirectUri: environment.auth.REDIRECT,
    scope: "openid profile email"
  });

  // Track whether or not to renew token
  private _authFlag = "isLoggedIn";

  // Store authentication data
  // Create stream for token
  token$: Observable<string>;
  // Create stream for user profile data
  userProfile$ = new BehaviorSubject<any>(null);

  // Authentication Navigation
  onAuthSuccessUrl = "/";
  onAuthFailureUrl = "/";
  logoutUrl =  environment.auth.LOGOUT_URL;

  // Create observable of Auth0 parseHash method to gather auth results
  parseHash$ = bindNodeCallback(this._Auth0.parseHash.bind(this._Auth0));
  // Create observable of Auth0 checkSession method to
  // verify authorization server session and renew tokens
  checkSession$ = bindNodeCallback(this._Auth0.checkSession.bind(this._Auth0));

  constructor(private router: Router, private accountService: AccountService) {}

  login = () => this._Auth0.authorize();

  handleLoginCallback = () => {
    if (window.location.hash && !this.authenticated) {
      this.parseHash$().subscribe({
        next: authResult => {
          this._setAuth(authResult);
          let auth0profile = (authResult as any).idTokenPayload;

          let userProfile = {};
          userProfile["name"] = auth0profile.name;
          userProfile["gender"] = auth0profile.gender;
          userProfile["photo"] = auth0profile.picture;
          userProfile["email"] = auth0profile.email;
          userProfile["locale"] = auth0profile.locale;
          userProfile["lastLogin"] = auth0profile.updated_at;


          this.accountService.getUsername("coolname")
          .subscribe((username: any) => {
            if (username.body) {
              console.log(JSON.parse(username.body));
            }
          });


          this.accountService.createProfile((userProfile as any).email, userProfile)
          .subscribe((profile: any) => {
            if (profile.body) {
              console.log("PRFILE: ", JSON.parse(profile.body));
            }
          });

          
          window.location.hash = "";

          this.router.navigate([this.onAuthSuccessUrl]);
        },
        error: err => this._handleError(err)
      });
    }
  };

  private _setAuth = authResult => {
    // Save authentication data and update login status subject

    // Observable of token
    this.token$ = of(authResult.accessToken);

    // Emit value for user data subject
    this.userProfile$.next(authResult.idTokenPayload);

    localStorage.setItem(this._authFlag, JSON.stringify(true));
    localStorage.setItem('userProfile', JSON.stringify(this.userProfile$.value));

    this.accountService.getUsername("");

  };

  get authenticated(): boolean {
    return JSON.parse(localStorage.getItem(this._authFlag));
  }

  renewAuth() {
    if (this.authenticated) {
      this.checkSession$({}).subscribe({
        next: authResult => this._setAuth(authResult),
        error: err => {
          localStorage.removeItem(this._authFlag);
          this.router.navigate([this.onAuthFailureUrl]);
        }
      });
    }
  }

  logout = () => {
    // Set authentication status flag in local storage to false
    localStorage.setItem(this._authFlag, JSON.stringify(false));
    localStorage.setItem('userProfile', '');

    // This does a refresh and redirects back to homepage
    // Make sure you have the logout URL in your Auth0
    // Dashboard Application settings in Allowed Logout URLs
    this._Auth0.logout({
      returnTo: this.logoutUrl,
      clientID: environment.auth.CLIENT_ID
    });
  };

  // Utility functions

  private _handleError = err => {
    if (err.error_description) {
      console.error(`Error: ${err.error_description}`);
    } else {
      console.error(`Error: ${JSON.stringify(err)}`);
    }
  };
}
