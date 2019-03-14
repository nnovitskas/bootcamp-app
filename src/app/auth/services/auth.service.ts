import { Injectable } from '@angular/core';
import {DEFAULT_USERS} from '../default-user';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {map, timeout} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  defaultUsers = DEFAULT_USERS;
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(undefined);
  constructor() { }

  login(credentials: {username: string, password: string}): Observable<any> {
    const loggedInUser = this.defaultUsers.find(
      (user) => user.username === credentials.username && user.password === credentials.password
    );
    return of(loggedInUser).pipe(
      timeout(500),
      map((response) => {
        if (response) {
          sessionStorage.setItem('user', JSON.stringify(loggedInUser));
          this.setIsLoggedIn(true);
        }
        return response;
      })
    );
  }

  setIsLoggedIn(loggedIn: boolean): void {
    this.isLoggedIn.next(!!loggedIn);
  }

  initUser(): void {
    if (sessionStorage.getItem('user')) {
      this.isLoggedIn.next(true);
    }
  }

  getUser(): any {
    return JSON.parse(sessionStorage.getItem('user'));
  }

  isAdmin(): boolean {
    const user = this.getUser();
    return user && user.role === 'admin';
  }
}
