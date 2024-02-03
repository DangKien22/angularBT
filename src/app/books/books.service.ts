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

    public addBook(params: any): Observable<any> {
        return this.post("http://localhost:3000/books", params)
    }

    public editBook(params: any, id?: string | number): Observable<any> {
        return this.put(`http://localhost:3000/books/${id}`, params)
    }

    public deleteBook(id: string | number): Observable<any> {
        return this.delete(`http://localhost:3000/books/${id}`)
    }

    public getBookDetail(id?: string | number): Observable<any> {
        return this.get(`http://localhost:3000/books/${id}`)
    }
}