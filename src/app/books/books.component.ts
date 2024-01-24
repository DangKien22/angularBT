import { Component, OnInit } from '@angular/core';
import { BooksService } from './books.service';
import { Product } from './shared/models/book-utils';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
    layout: 'list' | 'grid' ="list";

    products!: Product[];

    constructor(private productService: BooksService) {}

    ngOnInit() {
        this.productService.getProducts().then((data) => (this.products = data.slice(0, 12)));
    }
}
