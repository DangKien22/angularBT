import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiServiceBase } from 'src/modules/api-services-base';

@Injectable({
    providedIn: 'root'
})
export class BooksService extends apiServiceBase {

    public getBooks(): Observable<any> {
        return this.get("http://localhost:3000/books")
    }

    public getBookDetail(id?: string | number): Observable<any> {
        return this.get(`http://localhost:3000/books/${id}`)
    }
}