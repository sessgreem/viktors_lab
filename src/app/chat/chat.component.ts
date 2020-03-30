import { AuthService } from "./../auth.service";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ChatService } from "../chat.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"]
})
export class ChatComponent implements OnInit {
  chat$: Observable<any>;
  newMsg: string;

  constructor(
    public cs: ChatService,
    private route: ActivatedRoute,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    const chatId = this.route.snapshot.paramMap.get("id");
    //  this.cs.create(chatId).then(res => {
    const source = this.cs.get(chatId);
    this.chat$ = this.cs.joinUsers(source);
    // });
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
}
