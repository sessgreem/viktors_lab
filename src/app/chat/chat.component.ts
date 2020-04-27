import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { ChatService } from "../core/services/chat.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"],
})
export class ChatComponent implements OnInit {
  chat$: Observable<any>;
  newMsg: string;
  @Input() orderId: string;

  constructor(public cs: ChatService) {}

  ngOnInit(): void {
    this.cs.create(this.orderId).then(() => {
      const source = this.cs.get(this.orderId);
      this.chat$ = this.cs.joinUsers(source);
    });
  }

  // When looping over real-time array in Angular - trackBy method is needed - tells Angular to only re-render items that have changed
  trackByCreated(i, msg) {
    return msg.createdAt;
  }

  submit(chatId) {
    this.cs.sendMessage(chatId, this.newMsg);
    this.newMsg = "";
  }
}
