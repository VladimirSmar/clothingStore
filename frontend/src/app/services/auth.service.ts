import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from './../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUserObservable: Observable<User | null> = null;
  public currentUserSnapshot: User | null = null;

  constructor(
    private _router: Router,
    private _http: HttpClient
  ) {
    this.currentUserObservable = of(null);

    this._subscribeToCurrentUserSnapshot();
  }

  public signup(email: string, password: string): Observable<boolean> {

    const signupBody = { email, password };

    return this._http.post('api/signup', signupBody).pipe(
      mergeMap(() => {
        return of(true);
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  public login(email: string, password: string): Observable<boolean> {
    console.log(email, password);

    let loginParams = new HttpParams();

    loginParams = loginParams.append('email', email);
    loginParams = loginParams.append('password', password);

    return this._http.get(`/api/login`, { params: loginParams }).pipe(
      mergeMap(() => {
        return of(true);
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  public logout(): void {

  }

  private _subscribeToCurrentUserSnapshot(): void {
    this.currentUserObservable.subscribe(user => this.currentUserSnapshot = user);
  }

}
