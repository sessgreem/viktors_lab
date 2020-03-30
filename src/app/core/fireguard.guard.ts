import { StaffauthService } from "./services/staffauth.service";
import { ChatService } from "./../chat.service";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable({
  providedIn: "root"
})
export class FireguardGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private chatService: ChatService,
    private staffauth: StaffauthService
  ) {}
  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let chatId = next.params.id;
    const uid = await this.auth.getUser().then(res => {
      if (res) return res.uid;
      else return res;
    });
    let staffuid;
    if (!uid) {
      staffuid = await this.staffauth.getStaff().then(res => {
        if (res) return res.uid;
        else return res;
      });
    }
    if (uid || staffuid) {
      let chat: any = await this.chatService
        .getChat(chatId)
        .then(res => {
          return res;
        })
        .catch(err => {
          console.log("Did not get chat " + err);
        });
      if (!chat) {
        this.router.navigate(["/"]);
        return false;
      }
      if (uid === chat.uid || staffuid) {
        return true;
      } else {
        console.log("Unauthorized user.");
        this.router.navigate(["/"]);
        return false;
      }
    } else {
      this.router.navigate(["/"]);
      return false;
    }
  }
}
