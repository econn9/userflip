import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth/auth.service";
import { AccountService } from "./account/account.service.ts.service";

@Component({
  selector: "uf",
  template: `
    <router-outlet></router-outlet>
    `
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private accountService: AccountService) {}

  ngOnInit() {
    this.authService.renewAuth();
  }
}
