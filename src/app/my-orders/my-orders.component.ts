import { Observable } from "rxjs";
import { OrderService } from "./../core/services/order.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-my-orders",
  templateUrl: "./my-orders.component.html",
  styleUrls: ["./my-orders.component.scss"],
})
export class MyOrdersComponent implements OnInit {
  userOrders$: Observable<any>;
  constructor(private orderService: OrderService) {
    this.userOrders$ = this.orderService.getUserOrders();
  }

  ngOnInit(): void {}
}
