import { Component, OnInit, Output } from '@angular/core';
import { BooksService } from '../books.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../shared/models/interfaces';
import { getSeverity, handleNavigate } from '../shared/models/book-utils';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  dataDetail: any;
  products!: Product[];
  responsiveOptions!: any[];
  value: number = 0;

  constructor(
    private service: BooksService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const id = params["id"];
      if (id) {
        this.getBookDetail(id);
      }
    });
    this.getBooks()
  }

  getBookDetail(id?: string | number) {
    this.service.getBookDetail(id).subscribe({
      next: data => {
        if (data) {
          console.log('dataDetail', data)
          this.dataDetail = data;
          console.log('kooko', this.dataDetail)
        }
      },
      error: error => {
        console.log('error')
      }
    })
  }

  getSeverity(product: Product) {
    return getSeverity(product?.inventoryStatus)
  };

  getBooks() {
    this.service.getBooks().subscribe({
      next: data => {
        if (data) {
          this.products = data;
          console.log({ data: this.products })
        }
      },
      error: error => {
        console.log('error')
      }
    })
  }

  navigateTo(id: string) {
    const queryParams = {
      id: id
    };
    handleNavigate(this.router, '/book-detail', queryParams);
  }

}
