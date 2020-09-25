import { ModalService } from "./../../../core/services/modal.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { AuthService } from "src/app/core/services/auth.service";

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
    public modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  get email() {
    return this.signInForm.get("email");
  }
  get password() {
    return this.signInForm.get("password");
  }
  emailSignIn() {
    return this.auth.emailSignIn(this.email.value, this.password.value);
  }
}
