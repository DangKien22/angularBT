import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from './shared/models/user';
import { apiServiceBase } from 'src/modules/api-services-base';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends apiServiceBase {
  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    super(http)
  }
  redirectUrl: string = '';
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }
  fakeLogin(user: User): Observable<any> {
    const fakeUser: User = { username: 'user', password: 'Password@123' };
    if (
      user.username === fakeUser.username &&
      user.password === fakeUser.password
    ) {
      localStorage.setItem('currentUser', JSON.stringify(fakeUser));
      localStorage.setItem('authToken', 'fakeAuthToken');
      this.router.navigate(['/']);
      return of({
        authToken: 'fakeAuthToken',
        role: 'user',
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

  public getListUsers(): Observable<any> {
    return this.get("http://localhost:3000/admin-user");
  };
  public addUser(params?: any): Observable<any> {
    console.log(params)
    return this.post("http://localhost:3000/admin-user", params);
  };
  public deleteUser(id?: string | number): Observable<any> {
    console.log(id)
    return this.delete(`${"http://localhost:3000/admin-user"}/${id}`);
  };
}
