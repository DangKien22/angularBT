import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { handleNavigate } from 'src/app/books/shared/models/book-utils';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
    private router : Router
  ) { }

  ngOnInit() {
  }

  navigateTo() {
    handleNavigate(this.router, '/books')
  }

}
