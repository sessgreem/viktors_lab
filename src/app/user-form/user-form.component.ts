import { Router } from "@angular/router";
import { AuthService } from "../core/services/auth.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.css"],
})
export class UserFormComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.minLength(2), Validators.maxLength(25)]],
    });
  }

  get email() {
    return this.signupForm.get("email");
  }
  get password() {
    return this.signupForm.get("password");
  }

  signup() {
    return this.auth
      .emailSignUp(this.email.value, this.password.value)
      .then((res) => {
        console.log("Staff sign up successful - redirecting to login...");
        this.router.navigate(["staff/login"]);
      });
  }
}
