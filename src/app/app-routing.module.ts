import { OrderChatComponent } from "./order-chat/order-chat.component";
import { PanelComponent } from "./panel/panel.component";
import { OrderDetailsComponent } from "./order-details/order-details.component";
import { UserFormComponent } from "./user-form/user-form.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ChatComponent } from "./chat/chat.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./core/auth.guard";

import {
  canActivate,
  redirectUnauthorizedTo,
  redirectLoggedInTo
} from "@angular/fire/auth-guard";
import { map } from "rxjs/operators";

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo(["/"]);
// const onlyAllowSelf = next =>
// map(user => !!user && next.param.uid === user.uid);
// const redirectToProfileEditOrLogin = () => map(user => user ? ['profiles', user.uid, 'edit'] : ['login']);
const redirectToHome = () => redirectLoggedInTo(["/"]);
const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "chats/:id", component: ChatComponent },
  { path: "login", component: UserFormComponent },
  {
    path: "orders/:id",
    component: OrderChatComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "orders",
    component: HomeComponent,
    ...canActivate(redirectToHome)
  }
  // {
  //   path: "orders",
  //   component: HomeComponent,
  //   ...canActivate(redirectUnauthorizedToHome)
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
