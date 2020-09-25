import { ModalService } from "./../../core/services/modal.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
})
export class NavigationComponent implements OnInit {
  open = false;
  outsideEnabled = false;
  constructor(public modalService: ModalService) {}

  ngOnInit(): void {}

  closeSideNav(event) {
    this.outsideEnabled = false;
    this.open = false;
    console.log(event);
  }

  openSideNav() {
    this.open = true;
    setTimeout(() => (this.outsideEnabled = true), 700);
  }

  openLoginForm() {
    this.modalService.openModal();
    this.modalService.openLoginForm();
  }

  openSignUpForm() {
    this.modalService.openModal();
    this.modalService.openSignUpForm();
  }
}
