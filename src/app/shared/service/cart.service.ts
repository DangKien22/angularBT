import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemCountSource = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCountSource.asObservable();
  private cartItems: any[] = [];
  private cartItemsSource = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItemsSource.asObservable();

  constructor() {
    this.loadCartItemCount();
  }

  private loadCartItemCount() {
    const itemCount = localStorage.getItem('cartItemCount');
    const items = localStorage.getItem('cartItems');
    if (itemCount && items) {
      this.cartItemCountSource.next(+itemCount);
      this.cartItemsSource.next(this.cartItems);
    }
  }

  updateCartItemCount(count: number, item: any) {
    const newCount = this.cartItemCountSource.value + count;
    console.log('count')
    console.log('item', item)
    if (newCount >= 0) {
      localStorage.setItem('cartItemCount', newCount.toString());
      localStorage.setItem('cartItems', JSON.stringify(item));
      this.cartItems.push(item);
      this.cartItemCountSource.next(newCount);
      this.cartItemsSource.next(this.cartItems);
    }
  }

  clearCartItem() {
    localStorage.removeItem('cartItemCount');
    localStorage.removeItem('cartItems');
    this.cartItemCountSource.next(0);
    this.cartItemsSource.next([]);
  }
}
