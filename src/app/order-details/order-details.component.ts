import { AuthService } from "src/app/core/services/auth.service";
import { OrderService } from "./../core/services/order.service";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { leagues, divisions } from "../shared/variables";

@Component({
  selector: "app-order-details",
  templateUrl: "./order-details.component.html",
  styleUrls: ["./order-details.component.scss"],
})
export class OrderDetailsComponent implements OnInit {
  orders$: Observable<any>;
  user$: Observable<any>;
  orderId: string;
  accPassword = "viktor";
  leagues = leagues;
  divisions = divisions;
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private auth: AuthService
  ) {
    this.user$ = this.auth.user$;
  }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get("id");
    this.orders$ = this.orderService.getCurrentOrder(this.orderId);
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
