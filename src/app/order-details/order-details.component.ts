import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

@Component({
  selector: "app-order-details",
  templateUrl: "./order-details.component.html",
  styleUrls: ["./order-details.component.css"],
})
export class OrderDetailsComponent implements OnInit {
  order$: Observable<any>;
  orderId: string;
  accPassword = "viktor";

  constructor() {}

  ngOnInit(): void {}
}
