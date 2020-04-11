import { OrderService } from "./../../order.service";
import { Observable } from "rxjs";
import { StaffauthService } from "./../../core/services/staffauth.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  staff$: Observable<any>;
  displayName: string;
  orders$: Observable<any>;
  availableOrders$: Observable<any>;
  constructor(
    public auth: StaffauthService,
    private orderService: OrderService
  ) {
    this.staff$ = this.auth.staff$;
  }

  ngOnInit(): void {
    this.orders$ = this.orderService.getAssignedOrders();
    this.availableOrders$ = this.orderService.getAvailableOrders();
  }

  changeDisplayName() {
    if (this.displayName)
      this.auth
        .updateDisplayName(this.displayName)
        .then(res => {
          console.log("password update successfully");
          this.displayName = "";
        })
        .catch(error => console.log("password didnt not update " + error));
    else console.log("displayName is empty or undefined " + this.displayName);
  }
  assignStaff(orderId) {
    return this.orderService.assignStaff(orderId).then(res => {
      console.log("Successfuly assigned " + res);
    });
  }
}