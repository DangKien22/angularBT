import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { apiServiceBase } from 'src/modules/api-services-base';

@Injectable({
  providedIn: 'root',
})
export class UserService extends apiServiceBase {
  constructor(
    private http: HttpClient,
  ) {
    super(http)
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
  public updateUser(params: any, id?: string | number): Observable<any> {
    console.log(id)
    return this.put(`${"http://localhost:3000/admin-user"}/${id}`, params);
  };
}
