import { Observable } from "rxjs";
import { FeedbackService } from "./../core/services/feedback.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-latest-feedback",
  templateUrl: "./latest-feedback.component.html",
  styleUrls: ["./latest-feedback.component.css"],
})
export class LatestFeedbackComponent implements OnInit {
  feedback$: Observable<any>;
  constructor(private feedback: FeedbackService) {
    this.feedback$ = this.feedback.getLatestFeedback();
  }

  ngOnInit(): void {}
}
