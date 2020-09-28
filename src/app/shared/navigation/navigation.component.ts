import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { AuthService } from "src/app/core/services/auth.service";
import { ModalService } from "./../../core/services/modal.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
})
export class NavigationComponent implements OnInit {
  user$: Observable<any>;
  open = false;
  outsideEnabled = false;
  constructor(
    public modalService: ModalService,
    private auth: AuthService,
    private toastr: ToastrService
  ) {
    this.user$ = this.auth.user$;
  }

  ngOnInit(): void {}

  closeSideNav(event) {
    this.outsideEnabled = false;
    this.open = false;
  }

  openSideNav() {
    this.open = true;
    setTimeout(() => (this.outsideEnabled = true), 700);
  }

  openLoginForm(event) {
    event.preventDefault();
    this.modalService.openModal();
    this.modalService.openLoginForm();
  }

  openSignUpForm(event) {
    event.preventDefault();
    this.modalService.openModal();
    this.modalService.openSignUpForm();
  }
  userLogout(event) {
    event.preventDefault();
    this.auth
      .signOut()
      .then(() => {
        this.logoutSuccessful();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  logoutSuccessful() {
    this.toastr.info("Logout successful.");
  }
}
