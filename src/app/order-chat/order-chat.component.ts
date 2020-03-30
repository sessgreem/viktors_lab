import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ChatService } from "../chat.service";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../auth.service";
import { OrderService } from "../order.service";

@Component({
  selector: "app-order-chat",
  templateUrl: "./order-chat.component.html",
  styleUrls: ["./order-chat.component.css"]
})
export class OrderChatComponent implements OnInit {
  chat$: Observable<any>;
  newMsg: string;

  accPassword: string = "viktor";
  boostStatus: string = "";
  docId: string;

  constructor(
    public cs: ChatService,
    private route: ActivatedRoute,
    public auth: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.docId = this.route.snapshot.paramMap.get("id");
    this.cs.create(this.docId).then(res => {
      const source = this.cs.get(this.docId);
      this.chat$ = this.cs.joinUsers(source);
    });
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
    console.log(this.docId + " " + this.accPassword);
    this.orderService.updatePassword(this.docId, this.accPassword);
  }
}
