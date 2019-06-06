import { Component } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html"
})
export class HomeComponent {
  url;

  constructor(public authService: AuthService, private router: Router) {
    this.url = window.location.href;
  }

  goToProfile(event) {
    console.log(event);
    this.router.navigate(["/account"]);
  }

  signup() {
    window.open(
      "https://auth0.com/signup?utm_source=stackblitz&utm_medium=devsponsor&utm_campaign=stackblitz-angular",
      "_blank"
    );
  }
}
