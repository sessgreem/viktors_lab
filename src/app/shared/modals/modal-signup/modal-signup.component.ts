import { ToastrService } from "ngx-toastr";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { AuthService } from "src/app/core/services/auth.service";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ModalService } from "src/app/core/services/modal.service";
@Component({
  selector: "app-modal-signup",
  templateUrl: "./modal-signup.component.html",
  styleUrls: ["./modal-signup.component.scss"],
})
export class ModalSignupComponent implements OnInit {
  signUpForm: FormGroup;
  termsAgreed = false;

  @Output() openLoginForm = new EventEmitter<boolean>();

  loginFormEmit() {
    this.openLoginForm.emit(false);
  }

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    public modalService: ModalService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      repeatPassword: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  get email() {
    return this.signUpForm.get("email");
  }
  get password() {
    return this.signUpForm.get("password");
  }
  get repeatPassword() {
    return this.signUpForm.get("repeatPassword");
  }

  emailSignUp() {
    if (this.email.invalid) {
      console.log("Email is invalid");
    } else if (this.password.invalid) {
      console.log("Password is invalid");
    } else if (this.password.value !== this.repeatPassword.value) {
      console.log("Passwords do not match");
    } else if (this.termsAgreed === false) {
      console.log("Terms not agreed");
    } else {
      return this.auth
        .emailSignUp(this.email.value, this.password.value)
        .then(() => {
          this.modalService.closeModal(), this.loginSuccessful();
        })
        .catch((err) => {
          console.log(err);
          if (err.code === "auth/email-already-in-use") {
            console.log("Email is in use");
          }
        });
    }
  }
  openLogin(event) {
    event.preventDefault();
    this.modalService.openLoginForm();
  }

  loginSuccessful() {
    this.toastr.success("Sign up and Login Succesful", "Welcome!");
  }
  toggleTermsAgreed() {
    this.termsAgreed = !this.termsAgreed;
  }
}
