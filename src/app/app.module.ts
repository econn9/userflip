import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { AccountComponent } from "./account/account.component";
import { CallbackComponent } from "./callback/callback.component";

import { AuthService } from "./auth/auth.service";
import { HttpClientModule } from "@angular/common/http";
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountComponent,
    CallbackComponent,
    SearchBarComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgSelectModule, FormsModule, ReactiveFormsModule, NgbModule],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
