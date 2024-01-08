import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  constructor(
    private service: AuthService
  ) { }

  ngOnInit() {
  }
  logout() {
    this.service.fakeLogout()
  }

}
