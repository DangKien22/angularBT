import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { handleNavigate } from 'src/app/books/shared/models/book-utils';
import { CartService } from 'src/app/shared/service/cart.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
})
export class TopMenuComponent implements OnInit {
  menuItems: any[] = [];
  cartItemCount: number = 0;

  constructor(
    private service: AuthService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit() {
    this.menuItems = [
      { label: 'Trang chủ', icon: 'pi pi-home', routerLink: '/' },
      { label: 'Sách', icon: 'pi pi-list', routerLink: '/books' },
      { label: 'Người dùng', icon: 'pi pi-user', routerLink: '/admin-user' },
    ];
    this.cartService.cartItemCount$.subscribe(count => {
      console.log('count', count)
      this.cartItemCount = count;
    });
  }
  logout() {
    this.service.fakeLogout()
  }

  navigateTo() {
    handleNavigate(this.router, '/cart')
  }
}
