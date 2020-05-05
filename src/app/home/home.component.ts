import { FeedbackService } from "./../core/services/feedback.service";
import { OrderService } from "../core/services/order.service";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../core/services/auth.service";
import { ChatService } from "../core/services/chat.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  userChats$;
  userOrders$;
  email = "sess_greem@abv.bg";
  password = "viktor";
  constructor(
    public auth: AuthService,
    public cs: ChatService,
    public orderService: OrderService
  ) {}

  ngOnInit() {
    this.userChats$ = this.cs.getUserChats();
    this.userOrders$ = this.orderService.getUserOrders();
  }
}
