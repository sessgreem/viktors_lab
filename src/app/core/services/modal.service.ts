import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ModalService {
  signUpOpened = false;
  modalOpened = false;
  constructor() {}

  openSignUpForm() {
    this.signUpOpened = true;
  }

  openLoginForm() {
    this.signUpOpened = false;
  }

  openModal() {
    this.modalOpened = true;
  }

  closeModal() {
    this.modalOpened = false;
  }
}
