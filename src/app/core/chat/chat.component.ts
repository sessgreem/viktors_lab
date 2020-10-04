import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewChecked,
} from "@angular/core";
import { Observable } from "rxjs";
import { ChatService } from "../services/chat.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @Input() orderId: string;
  @ViewChild("Messages") private scrollContainer: ElementRef;
  chat$: Observable<any>;
  newMsg: string;
  disableScrollDown = false;

  constructor(public chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.create(this.orderId).then(() => {
      const source = this.chatService.get(this.orderId);
      this.chat$ = this.chatService.joinUsers(source);
    });
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  // When looping over real-time array in Angular - trackBy method is needed - tells Angular to only re-render items that have changed
  trackByCreated(i, msg) {
    return msg.createdAt;
  }

  submit(chatId): void {
    this.chatService.sendMessage(chatId, this.newMsg);
    this.newMsg = "";
  }

  onScroll(): void {
    const element = this.scrollContainer.nativeElement;
    const atBottom =
      element.scrollHeight - element.scrollTop === element.clientHeight;
    if (atBottom) {
      this.disableScrollDown = false;
    } else {
      this.disableScrollDown = true;
    }
  }

  private scrollToBottom(): void {
    if (this.disableScrollDown) {
      return;
    }
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
