import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html"
})
export class AccountComponent implements OnInit {
  profile: any;
  profileJson: any;
  userLoggedIn: boolean;
  lastLogin: any;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    
        this.profile = localStorage.getItem("userProfile");
        this.profileJson = JSON.parse(this.profile);

        if (this.profileJson.updated_at) {
          this.lastLogin = new Date(this.profileJson.updated_at).toDateString();
        }
        

        let loginCookie = localStorage.getItem("isLoggedIn");
        this.userLoggedIn = loginCookie === "false" ? false : true;

  
  }
}
