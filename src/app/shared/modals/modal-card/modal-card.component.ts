import { ModalService } from "./../../../core/services/modal.service";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-modal-card",
  templateUrl: "./modal-card.component.html",
  styleUrls: ["./modal-card.component.scss"],
})
export class ModalCardComponent implements OnInit {
  signUpOpened = true;
  // outsideEnabled = false;
  openLoginForm(event) {
    this.signUpOpened = event; // should be false
  }
  openSignUpForm(event) {
    this.signUpOpened = event; // should be true
  }

  constructor(public modalService: ModalService) {}

  // closeModal(event) {
  //   console.log(event);
  //   // tslint:disable-next-line: curly
  //   if (this.outsideEnabled === false) this.outsideEnabled = true;
  //   // setTimeout(() => (this.outsideEnabled = true), 1000);
  //   // tslint:disable-next-line: curly
  //   else this.modalService.closeModal();
  // }

  ngOnInit(): void {}
}
