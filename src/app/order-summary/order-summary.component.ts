import { Component, Input, OnInit } from "@angular/core";
import { OrderService } from "../core/services/order.service";

@Component({
  selector: "app-order-summary",
  templateUrl: "./order-summary.component.html",
  styleUrls: ["./order-summary.component.scss"],
})
export class OrderSummaryComponent implements OnInit {
  @Input() orderDetails: any;
  priority = false;
  price: number;
  // ? need to find a way to add priority and  price to orderDetails before sending it to the service
  // need to change the HMTL file
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {}

  createOrder() {
    this.orderService.setOrder(this.orderDetails);
  }
}
