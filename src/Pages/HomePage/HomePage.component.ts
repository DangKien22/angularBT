import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/auth/auth.service';

@Component({
  selector: 'app-HomePage',
  templateUrl: './HomePage.component.html',
  styleUrls: ['./HomePage.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(
    private service: AuthService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.service.fakeLogout()
  }
}
