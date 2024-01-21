import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
})
export class TopMenuComponent implements OnInit {
  menuItems = [
    { label: 'Home', icon: 'pi pi-home', routerLink: '/' },
    { label: 'Books', icon: 'pi pi-list', routerLink: '/books' },
    { label: 'User', icon: 'pi pi-info-circle', routerLink: '/admin-user' },
  ];

  constructor(
    private service: AuthService
  ) { }

  ngOnInit() { }
  logout() {
    this.service.fakeLogout()
  }
}
