import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
})
export class TopMenuComponent implements OnInit {
  menuItems: any[] = []

  constructor(
    private service: AuthService
  ) { }

  ngOnInit() {
    this.menuItems = [
      { label: 'Trang chủ', icon: 'pi pi-home', routerLink: '/' },
      { label: 'Sách', icon: 'pi pi-list', routerLink: '/books' },
      { label: 'Người dùng', icon: 'pi pi-user', routerLink: '/admin-user' },
    ];
  }
  logout() {
    this.service.fakeLogout()
  }
}
