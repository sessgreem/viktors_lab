import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { StaffauthService } from "./../../core/services/staffauth.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  constructor(public fb: FormBuilder, public staffauth: StaffauthService,
        private router: Router) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      "email": ["", [Validators.required, Validators.email]],
      "password": ["", [Validators.minLength(6), Validators.maxLength(20)]]
    });
  }
  get email() {
    return this.signupForm.get("email");
  }
  get password() {
    return this.signupForm.get("password");
  }

  signup() {
    return this.staffauth.emailSignUp(this.email.value, this.password.value).then( res =>
      this.router.navigate(["/"])
    )
  }
}
