import { StaffauthService } from "./../core/services/staffauth.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../core/services/auth.service";
import { OrderService } from "../core/services/order.service";

@Component({
  selector: "app-order-chat",
  templateUrl: "./order-chat.component.html",
  styleUrls: ["./order-chat.component.scss"],
})
export class OrderChatComponent implements OnInit {
  order$: Observable<any>;

  orderId: string;
  accPassword = "viktor";

  constructor(
    public auth: AuthService,
    public staffauth: StaffauthService,
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get("id");
    this.order$ = this.orderService.getCurrentOrder(this.orderId);
  }

  updateAccPassword() {
    console.log(this.orderId + " " + this.accPassword);
    this.orderService.updatePassword(this.orderId, this.accPassword);
  }

  toggleOrderPause(status) {
    this.orderService.toggleOrderPause(this.orderId, status);
  }

  confirmCompletion(status, iscompleted) {
    this.orderService.confirmCompletion(this.orderId, status, iscompleted);
  }

  markAsCompleted() {
    this.orderService.markAsCompleted(this.orderId);
  }
}
