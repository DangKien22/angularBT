import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  products = [
    {name: 'Shirt', quantity: 1, price: 44.00},
  ];

  shippingOptions = [
    {name: 'Standard Delivery', code: 'SD'},
  ];
  constructor() { }

  ngOnInit() {
  }

  removeProduct(e?: any) {}
   
  checkout() {

  }
  
}
