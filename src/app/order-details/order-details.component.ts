import { OrderService } from "./../core/services/order.service";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

@Component({
  selector: "app-order-details",
  templateUrl: "./order-details.component.html",
  styleUrls: ["./order-details.component.css"],
})
export class OrderDetailsComponent implements OnInit {
  orders$: Observable<any>;
  orderId: string;
  accPassword = "viktor";

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

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
