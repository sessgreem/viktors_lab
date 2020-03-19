import { StaffauthService } from "./services/staffauth.service";
import { OrderService } from "./../order.service";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { tap, map, take, first } from "rxjs/operators";
import { AuthService } from "../auth.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private orderService: OrderService,
    private staffauth: StaffauthService
  ) {}
  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let orderId = next.params.id;
    let staffuid = await this.staffauth.getStaff().then(res => {
      if (res) return res.uid;
      else res;
    });
    let uid = await this.auth.getUser().then(res => {
      if (res) {
        return res.uid;
      } else {
        return res;
      }
    });
    console.log("staffuid is " + staffuid);
    if (uid || staffuid) {
      let order = await this.orderService.getOrder(orderId).then(res => {
        if (res) {
          return res;
          // return res.orderUid;
        } else {
          return res;
        }
      });
      console.log(
        order.orderUid +
          " is the order.orderUid and " +
          order.orderAssigned +
          " is the order.orderAssigned"
      );
      if (uid === order.orderUid) {
        return true;
      } else if (staffuid === order.orderAssigned) {
        return true;
      } else {
        this.router.navigate(["/"]);
        return false;
      }
    } else {
      this.router.navigate(["/"]);
      return false;
    }
  }
}
// return this.auth.user$.pipe(
//   take(1),
//   map(user => {
//     if (user) {
//       return true;
//     } else {
//       this.router.navigate(["/"]);
//       return false;
//     }
//   })
