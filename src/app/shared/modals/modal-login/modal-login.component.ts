import { ModalService } from "./../../../core/services/modal.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { AuthService } from "src/app/core/services/auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-modal-login",
  templateUrl: "./modal-login.component.html",
  styleUrls: ["./modal-login.component.scss"],
})
export class ModalLoginComponent implements OnInit {
  signInForm: FormGroup;

  @Output() openSignUpForm = new EventEmitter<boolean>();

  signUpFormEmit() {
    this.openSignUpForm.emit(true);
  }

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    public modalService: ModalService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ["test@abv.bg", [Validators.required, Validators.email]],
      password: ["test123", [Validators.required, Validators.minLength(6)]],
    });
  }

  get email() {
    return this.signInForm.get("email");
  }
  get password() {
    return this.signInForm.get("password");
  }
  emailSignIn() {
    return this.auth
      .emailSignIn(this.email.value, this.password.value)
      .then(
        (res) => (
          this.modalService.closeModal(),
          this.loginSuccessfulToast(),
          console.log(res)
        )
      )
      .catch((err) => {
        alert("something went wrong!");
        console.log(err);
      });
  }
  openSignUp(event) {
    event.preventDefault();
    this.modalService.openSignUpForm();
  }
  loginSuccessfulToast() {
    this.toastr.success("Login Successful!");
  }
}
