import { StaffauthService } from "./../core/services/staffauth.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable } from "rxjs";
import { ChatService } from "../chat.service";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../auth.service";
import { OrderService } from "../order.service";

@Component({
  selector: "app-order-chat",
  templateUrl: "./order-chat.component.html",
  styleUrls: ["./order-chat.component.css"],
})
export class OrderChatComponent implements OnInit, OnDestroy {
  chat$: Observable<any>;
  newMsg: string;
  order$: Observable<any>;
  accPassword: string = "viktor";
  orderId: string;
  // Status;

  constructor(
    public cs: ChatService,
    private route: ActivatedRoute,
    public auth: AuthService,
    private orderService: OrderService,
    public staffauth: StaffauthService
  ) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get("id");
    this.cs.create(this.orderId).then((res) => {
      const source = this.cs.get(this.orderId);
      this.chat$ = this.cs.joinUsers(source);
    });
    this.order$ = this.orderService.getCurrentOrder(this.orderId);
    // this.order$.subscribe((s) => {
    //   this.Status = s.orderStatus;
    // });
  }
  ngOnDestroy(): void {
    // this.order$.;
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
    // this.orderService.toggleOrderPauseStatus(this.orderId, this.Status);
    this.orderService.toggleOrderPauseStatus(this.orderId, status);
  }

  confirmCompletion(status) {
    this.orderService.confirmCompletion(this.orderId, status);
  }

  markAsCompleted() {
    this.orderService.markAsCompleted(this.orderId);
  }
}
