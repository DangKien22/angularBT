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
  selectedItems: any[] = [];
  constructor() {
    this.loadCart();
    const selectedItemsString = localStorage.getItem('selectedItems');
    if (selectedItemsString) {
      this.selectedItems = JSON.parse(selectedItemsString);
    }
  }

  private loadCart() {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
      this.cartItemsSource.next(this.cartItems);
      this.cartItemCountSource.next(this.cartItems.length);
    }
  }

  updateCart(product: any, quantityAdd: number) {
    let existingProduct = this.cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantityAdd += quantityAdd;
    } else {
      existingProduct = { ...product, quantityAdd };
      this.cartItems.push(existingProduct);
    }
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.cartItemsSource.next(this.cartItems);
    this.cartItemCountSource.next(this.cartItems.length);
  }

  clearCartItem() {
    localStorage.removeItem('cartItemCount');
    localStorage.removeItem('cartItems');
    this.cartItems = [];
    this.cartItemsSource.next(this.cartItems);
    this.cartItemCountSource.next(0);
  }

  removeItemById(id?: string | number) {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
    this.cartItemCountSource.next(this.cartItems.length);
    this.cartItemsSource.next(this.cartItems)
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  updateSelectedItems(items: any[]) {
    this.selectedItems = items;
    localStorage.setItem('selectedItems', JSON.stringify(items));
  }

  completeOrder() {
    localStorage.removeItem('selectedItems');
  }

}
