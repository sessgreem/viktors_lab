import { FormBuilder, Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/core/services/auth.service";

@Component({
  selector: "app-modal-login",
  templateUrl: "./modal-login.component.html",
  styleUrls: ["./modal-login.component.scss"],
})
export class ModalLoginComponent implements OnInit {
  signInForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) {}

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
    return this.auth
      .emailSignIn(this.email.value, this.password.value)
      .then((res) => {
        console.log("Login successful.");
      });
  }
}
