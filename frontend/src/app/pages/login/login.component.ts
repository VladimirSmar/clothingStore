import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup = null;
  private _subscriptions: Subscription[] = [];
  private _returnUrl: string = null;

  constructor(
    private _formBuilder: FormBuilder,
    private _auth: AuthService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    this._createForm();
  }

  ngOnInit() {
    this._returnUrl = this._route.snapshot.queryParams.returnUrl || '/catalog';

    this._subscriptions.push(
      this._auth.currentUserObservable.subscribe(user => {
        if (!!user) {
          this._router.navigateByUrl('/catalog');
        }
      })
    );
  }

  ngOnDestroy() {
    this._subscriptions.forEach(sub => sub.unsubscribe);
  }

  private _createForm(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  public submit(): void {

    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this._subscriptions.push(
        this._auth.login(email, password).subscribe(success => {
          if (success) {
            this._router.navigateByUrl(this._returnUrl);
          } else {
            this._displayFailedLogin();
          }
        })
      );
    } else {
      this._displayFailedLogin();
    }
  }

  private _displayFailedLogin(): void {
    console.log('Your Email or Password were invalid, try again.');
  }
}
