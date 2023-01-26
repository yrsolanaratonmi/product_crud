import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  public authStatus: boolean = false;

  public err = false;

  public register(login: string, password: string) {
    return this.http
      .post('http://localhost:8080/auth/registration', {
        login: login,
        password: password,
      })
      .subscribe(
        () => {
          this.authorize(login, password);
        },
        (err) => console.log(err),
      );
  }

  public authorize(login: string, password: string) {
    return this.http
      .post('http://localhost:8080/auth/authorization', {
        login: login,
        password: password,
      })
      .subscribe(
        () => {
          this.authStatus = true;
          this.router.navigate(['home']);
        },
        () => (this.err = true),
      );
  }

  public logout() {
    this.authStatus = false;
    this.router.navigate(['']);
  }
}
