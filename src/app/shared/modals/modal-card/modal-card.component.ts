import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-modal-card",
  templateUrl: "./modal-card.component.html",
  styleUrls: ["./modal-card.component.scss"],
})
export class ModalCardComponent implements OnInit {
  signUpOpened = true;

  openLoginForm(event) {
    this.signUpOpened = event; // should be false
  }
  openSignUpForm(event) {
    this.signUpOpened = event; // should be true
  }
  constructor() {}

  ngOnInit(): void {}
}
