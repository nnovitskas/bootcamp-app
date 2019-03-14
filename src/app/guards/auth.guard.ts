import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Injectable()
export class AuthGuard implements CanLoad {

  constructor(private authService: AuthService,
              private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): boolean | Promise<boolean> {
    if (this.authService.isLoggedIn.getValue()) {
      return true;
    } else {
      return this.router.navigate(['auth']).then(() => false);
    }
  }
}
