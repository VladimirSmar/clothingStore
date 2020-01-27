import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, from } from 'rxjs';
import { User } from './../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUserObservable: Observable<User | null> = null;
  public currentUserSnapshot: User | null = null;

  constructor() { }

  public login(email: string, password: string): Observable<boolean> {
    console.log(email, password);
    const xhr = new XMLHttpRequest();

    xhr.open('GET', `/api/login?email=${email}&password=${password}`, true);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send();

    xhr.onload = () => {
      console.log(xhr.response);
    };

    return of(true);
  }

  public signup(email: string, password: string): Observable<boolean> {
    return of(true);
  }

  private _subscribeToCurrentUserSnapshot(): void {
    this.currentUserObservable.subscribe(user => this.currentUserSnapshot = user);
  }

}
