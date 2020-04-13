import { FeedbackService } from "./../core/services/feedback.service";
import { StaffauthService } from "./../core/services/staffauth.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable } from "rxjs";
import { ChatService } from "../chat.service";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../auth.service";
import { OrderService } from "../order.service";
import { StarRatingComponent } from "ng-starrating";

@Component({
  selector: "app-order-chat",
  templateUrl: "./order-chat.component.html",
  styleUrls: ["./order-chat.component.css"],
})
export class OrderChatComponent implements OnInit {
  chat$: Observable<any>;
  order$: Observable<any>;

  orderId: string;
  accPassword: string = "viktor";
  newMsg: string;

  rating: number;
  text: string;
  // feedbackSent: boolean = false;

  constructor(
    public cs: ChatService,
    private route: ActivatedRoute,
    public auth: AuthService,
    private orderService: OrderService,
    public staffauth: StaffauthService,
    private feedback: FeedbackService
  ) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get("id");
    this.cs.create(this.orderId).then((res) => {
      const source = this.cs.get(this.orderId);
      this.chat$ = this.cs.joinUsers(source);
    });
    this.order$ = this.orderService.getCurrentOrder(this.orderId);
  }

  // submit uses two-way data binding for the msg and needs the chatid from async chat$ observable
  submit(chatId) {
    this.cs.sendMessage(chatId, this.newMsg);
    this.newMsg = "";
  }
  // When looping over real-time array in Angular - trackBy method is needed - tells Angular to only re-render items that have changed
  trackByCreated(i, msg) {
    return msg.createdAt;
  }

  updateAccPassword() {
    console.log(this.orderId + " " + this.accPassword);
    this.orderService.updatePassword(this.orderId, this.accPassword);
  }

  togglePauseOrder(status) {
    this.orderService.toggleOrderPauseStatus(this.orderId, status);
  }

  confirmCompletion(status) {
    this.orderService.confirmCompletion(this.orderId, status);
  }

  markAsCompleted() {
    this.orderService.markAsCompleted(this.orderId);
  }

  onRate($event: {
    oldValue: number;
    newValue: number;
    starRating: StarRatingComponent;
  }) {
    alert(`Old Value:${$event.oldValue},
      New Value: ${$event.newValue},
      Checked Color: ${$event.starRating.checkedcolor},
      Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  }

  sendFeedback() {
    this.feedback
      .createFeedback(this.orderId, this.rating, this.text)
      .then(() => {
        console.log("Feedback received");
        this.text = "";
        // this.feedbackSent = true;
      });
  }
}
