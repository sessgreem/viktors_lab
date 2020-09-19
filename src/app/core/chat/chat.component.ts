import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  AfterContentChecked,
} from "@angular/core";
import { Observable } from "rxjs";
import { ChatService } from "../services/chat.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild("Messages") private scrollContainer: ElementRef;
  chat$: Observable<any>;
  newMsg: string;
  @Input() orderId: string;
  disableScrollDown = false;
  constructor(public cs: ChatService) {}

  ngOnInit(): void {
    this.cs.create(this.orderId).then(() => {
      const source = this.cs.get(this.orderId);
      this.chat$ = this.cs.joinUsers(source);
    });
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  // ngAfterContentChecked() {
  //   // this.scrollToBottom();
  // }

  // When looping over real-time array in Angular - trackBy method is needed - tells Angular to only re-render items that have changed
  trackByCreated(i, msg) {
    return msg.createdAt;
  }

  submit(chatId) {
    this.cs.sendMessage(chatId, this.newMsg);
    this.newMsg = "";
  }

  // private scrollToBottom(): void {
  //   try {
  //     this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
  //   } catch (err) {}
  // }

  onScroll() {
    const element = this.scrollContainer.nativeElement;
    const atBottom =
      element.scrollHeight - element.scrollTop === element.clientHeight;
    console.log(
      ` scrollHeight ${element.scrollHeight} and scrollTop ${element.scrollTop} and element clientHeight ${element.clientHeight}`
    );
    console.log(atBottom);
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
