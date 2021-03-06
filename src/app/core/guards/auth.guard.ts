import { StaffauthService } from "../services/staffauth.service";
import { OrderService } from "../services/order.service";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
// import { tap, map, take, first } from "rxjs/operators";
import { AuthService } from "../services/auth.service";
// import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private orderService: OrderService,
    private staffauth: StaffauthService
  ) {}
  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const orderId = next.params.id;
    const uid = await this.auth.getUser().then((res) => {
      if (res) return res.uid;
      else return res;
    });
    let staffId;
    if (!uid) {
      staffId = await this.staffauth.getStaff().then((res) => {
        if (res) return res.staffId;
        else return res;
      });
    }
    if (uid || staffId) {
      const order = await this.orderService
        .getOrder(orderId)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          console.log("Did not not get order " + err);
        });
      if (!order) {
        this.router.navigate(["/"]);
        return false;
      }
      if (uid === order.orderUid || order.orderAssigned.includes(staffId)) {
        return true;
      } else {
        console.log("Unassigned staff or unauthorized user.");
        this.router.navigate(["/"]);
        return false;
      }
    } else {
      this.router.navigate(["/"]);
      return false;
    }
  }
}
