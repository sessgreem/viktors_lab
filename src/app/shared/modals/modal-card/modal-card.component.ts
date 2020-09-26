import { ModalService } from "./../../../core/services/modal.service";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-modal-card",
  templateUrl: "./modal-card.component.html",
  styleUrls: ["./modal-card.component.scss"],
})
export class ModalCardComponent implements OnInit {
  outsideEnabled = false;

  constructor(public modalService: ModalService) {}

  // closeModal() {
  //   if (
  //     this.modalService.modalOpened === true &&
  //     this.outsideEnabled === false
  //   ) {
  //     setTimeout(
  //       () => (console.log("Timeout Finished"), (this.outsideEnabled = true)),
  //       1500
  //     );
  //   } else {
  //     this.modalService.closeModal();
  //     this.outsideEnabled = false;
  //   }
  // }
  ngOnInit(): void {}
}
