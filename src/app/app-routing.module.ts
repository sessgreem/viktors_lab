import { OrderDetailsComponent } from "./order-details/order-details.component";
import { IntroductionComponent } from "./introduction/introduction.component";
// import { FireguardGuard } from "./core/guards/fireguard.guard";
import { LoginComponent } from "./staff/login/login.component";
import { DashboardComponent } from "./staff/dashboard/dashboard.component";
import { SignupComponent } from "./staff/signup/signup.component";
import { OrderChatComponent } from "./order-chat/order-chat.component";
// import { PanelComponent } from "./panel/panel.component";
import { UserFormComponent } from "./user-form/user-form.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// import { ChatComponent } from "./chat/chat.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./core/guards/auth.guard";

// import {
//   canActivate,
//   redirectUnauthorizedTo,
//   redirectLoggedInTo
// } from "@angular/fire/auth-guard";
// import { map } from "rxjs/operators";

// const redirectToHome = () => redirectLoggedInTo(["/"]);

const routes: Routes = [
  { path: "lol-boost", component: HomeComponent },
  // {
  //   path: "chats/:id",
  //   component: ChatComponent,
  //   canActivate: [FireguardGuard]
  // },
  { path: "login", component: UserFormComponent },
  {
    path: "orders/:id",
    component: OrderChatComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "staff/signup",
    component: SignupComponent,
    // add a guard
  },
  {
    path: "staff/dashboard",
    component: DashboardComponent,
    // add a guard
  },
  {
    path: "staff/login",
    component: LoginComponent,
  },
  // {
  //   path: "**",
  //   redirectTo: "/", // create a 404 page with timeout redirect
  // },
  {
    path: "",
    component: IntroductionComponent,
  },
  {
    path: "orderv2/:id",
    component: OrderDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
