import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  public signupForm: FormGroup = null;
  private _subscriptions: Subscription[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _auth: AuthService,
    private _router: Router
  ) {
    this._createForm();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._subscriptions.forEach(sub => sub.unsubscribe);
  }

  private _createForm(): void {
    this.signupForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  public submit(): void {

    if (this.signupForm.valid) {
      const { email, password } = this.signupForm.value;

      this._subscriptions.push(
        this._auth.signup(email, password).subscribe(success => {
          if (success) {
            this._router.navigate(['/catalog']);
          } else {
            this._displayFailedSignup();
          }

        })
      );
    } else {
      this._displayFailedSignup();
    }

  }

  private _displayFailedSignup(): void {
    console.log('There is a problem with signing in, please try again');
  }
}
