import { Component, OnInit, Input } from "@angular/core";
import { FeedbackService } from "../../core/services/feedback.service";

@Component({
  selector: "app-send-feedback",
  templateUrl: "./send-feedback.component.html",
  styleUrls: ["./send-feedback.component.scss"],
})
export class SendFeedbackComponent implements OnInit {
  @Input() orderId: string;
  @Input() feedbackSent: boolean;
  rating: number;
  text: string;

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {}

  sendFeedback() {
    this.feedbackService
      .createFeedback(this.orderId, this.rating, this.text)
      .then(() => {
        console.log("Feedback received");
        this.text = "";
      });
  }
}
