import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { environment } from "./../environments/environment";
import { AngularFireModule } from "@angular/fire";
// import { ChatComponent } from "./chat/chat.component";

import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from "./home/home.component";
import { UserFormComponent } from "./user-form/user-form.component";
// import { PanelComponent } from "./panel/panel.component";
import { OrderMenuComponent } from "./order-menu/order-menu.component";
import { OrderChatComponent } from "./order-chat/order-chat.component";
import { SignupComponent } from "./staff/signup/signup.component";
import { DashboardComponent } from "./staff/dashboard/dashboard.component";
import { LoginComponent } from "./staff/login/login.component";
// import { AuthGuard } from './core/auth.guard';
import { REGION } from "@angular/fire/functions";
import { RatingModule } from "ng-starrating";
import { LatestFeedbackComponent } from "./latest-feedback/latest-feedback.component";
import { IntroductionComponent } from "./introduction/introduction.component";
import { FlexLayoutModule } from "@angular/flex-layout";
@NgModule({
  declarations: [
    AppComponent,
    // ChatComponent,
    HomeComponent,
    UserFormComponent,
    // PanelComponent,
    OrderMenuComponent,
    OrderChatComponent,
    SignupComponent,
    DashboardComponent,
    LoginComponent,
    LatestFeedbackComponent,
    IntroductionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    RatingModule,
    FlexLayoutModule,
  ],
  providers: [{ provide: REGION, useValue: "europe-west1" }],
  bootstrap: [AppComponent],
})
export class AppModule {}
