import { ModalService } from "./../core/services/modal.service";
import { Router } from "@angular/router";
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
  constructor(
    private orderService: OrderService,
    private router: Router,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.orderDetails.priority = this.priority;
    this.orderDetails.price = this.price;
  }

  sendOrderDetails() {
    this.orderService
      .setOrder(this.orderDetails)
      .then(() => {
        this.router.navigate(["/my-orders"]);
      })
      .catch((err) => {
        this.modalService.openModal();
      });
  }
  togglePriority() {
    this.orderDetails.priority = !this.priority;
    this.priority = !this.priority;
  }
}
