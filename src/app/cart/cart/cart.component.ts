import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { handleNavigate } from 'src/app/books/shared/models/book-utils';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  dataCart: any;
  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cartService.cartItems$.subscribe(item => {
      this.dataCart = item;
      console.log(this.dataCart)
    })
  }

  handleRomove(id?: string | number) {
    this.cartService.removeItemById(id)
  }

  backTo() {
    handleNavigate(this.router, '/books')
  }

  checkout() {

  }

}
