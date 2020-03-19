import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";
import { StaffauthService } from "./../../core/services/staffauth.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

  signInForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: StaffauthService, private router: Router) {}

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]],
      'password': ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    });
  }

  get email() {
    return this.signInForm.get('email');
  }
  get password() {
    return this.signInForm.get('password');
  }

  emailSignIn() {
    return this.auth.emailSignIn(this.email.value, this.password.value).then(res => {
      console.log("Login successful - redirecting to dashboard...");
      this.router.navigate(["staff/dashboard"]);
    });
  }
}
