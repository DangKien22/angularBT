import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from './shared/models/user';
import { apiServiceBase } from 'src/modules/api-services-base';
import { Title } from '@angular/platform-browser';
import { AdminUser } from './helpers/interfaces/admin-user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends apiServiceBase {
  public listAdminUser: AdminUser[] = [];
  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService
  ) {
    super(http);
  }
  redirectUrl: string = '';
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getListUsers() {
    this.userService.getListUsers().subscribe({
      next: (data) => {
        if (data) {
          console.log({ data });
          this.listAdminUser = data;
        }
      },
    });
  }

  fakeLogin(user: AdminUser): Observable<any> {
    return new Observable((observer) => {
      this.userService.getListUsers().subscribe((users) => {
        const foundUser = users.find(
          (u: AdminUser) =>
            u.userName === user.userName && u.password === user.password
        );

        if (foundUser) {
          localStorage.setItem('currentUser', JSON.stringify(foundUser));
          localStorage.setItem('authToken', 'fakeAuthToken');
          observer.next({
            authToken: 'fakeAuthToken',
          });
          observer.complete();

          this.router.navigate(['/']);
        } else {
          observer.next({ error: 'Đăng nhập thất bại' });
          observer.complete();
        }
      });
    });
  }


  fakeLogout(): Observable<any> {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
    return of({});
  }
}
