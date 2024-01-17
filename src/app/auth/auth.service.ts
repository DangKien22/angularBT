import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from './shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) { }
  redirectUrl: string = '';
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }
  fakeLogin(user: User): Observable<any> {
    const fakeUser: User = { username: 'user', password: 'Password@123' };
    if (user.username === fakeUser.username && user.password === fakeUser.password) {
      localStorage.setItem('currentUser', JSON.stringify(fakeUser));
      localStorage.setItem('authToken', 'fakeAuthToken');
      this.router.navigate(['/']);
      return of({
        authToken: 'fakeAuthToken',
        role: 'user'
      });
    } else {
      return of({ error: 'Đăng nhập thất bại' });
    }
  }

  fakeLogout(): Observable<any> {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
    return of({});
  }

}
