import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): any {
    const isLoggedIn = this.auth.authStatus;
    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['']);
    }
  }
}
