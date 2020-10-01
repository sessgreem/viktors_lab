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
  price = 0;
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderDetails.priority = this.priority;
    this.orderDetails.price = this.price;
  }

  sendOrderDetails() {
    this.orderService
      .setOrder(this.orderDetails)
      .then(() => {
        alert("Order created. Click on my order");
      })
      .catch((err) => {
        alert("You must log in first :(");
      });
  }
  togglePriority() {
    this.orderDetails.priority = !this.priority;
    this.priority = !this.priority;
  }
}
