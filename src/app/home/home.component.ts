import { FeedbackService } from "./../core/services/feedback.service";
import { OrderService } from "./../order.service";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { ChatService } from "../chat.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  userChats$;
  userOrders$;
  email: string = "sess_greem@abv.bg";
  password: string = "viktor";
  constructor(
    public auth: AuthService,
    public cs: ChatService,
    public OrderService: OrderService
  ) {}

  ngOnInit() {
    this.userChats$ = this.cs.getUserChats();
    this.userOrders$ = this.OrderService.getUserOrders();
  }
}
