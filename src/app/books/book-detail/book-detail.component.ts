import { Component, OnInit, Output } from '@angular/core';
import { BooksService } from '../books.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../shared/models/interfaces';
import { getSeverity, handleNavigate } from '../shared/models/book-utils';
import { IsBaseComponent, mType } from 'src/modules/isComponentBase';
import { MessageService } from 'primeng/api';
import { Title } from '@angular/platform-browser';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent extends IsBaseComponent implements OnInit {
  dataDetail: any;
  products!: Product[];
  responsiveOptions!: any[];
  value: number = 0;

  constructor(
    private service: BooksService,
    private route: ActivatedRoute,
    private router: Router,
    public msg: MessageService,
    public title: Title,
    private cartService: CartService
  ) {
    super(msg);
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      console.log(id)
      if (id) {
        this.getBookDetail(id);
      }
    });
    this.getBooks();
  }

  getBookDetail(id?: string | number) {
    console.log(id)
    this.service.getBookDetail(id).subscribe({
      next: (data) => {
        if (data) {
          console.log('dataDetail', data);
          this.dataDetail = data;
          console.log('kooko', this.dataDetail);
        }
      },
      error: (error) => {
        console.log('error');
      },
    });
  }

  getSeverity(product: Product) {
    return getSeverity(product?.inventoryStatus);
  }

  getBooks() {
    this.service.getBooks().subscribe({
      next: (data) => {
        if (data) {
          this.products = data;
          console.log({ data: this.products });
        }
      },
      error: (error) => {
        console.log('error');
      },
    });
  }

  navigateTo(id: string) {
    handleNavigate(this.router, '/book-detail', { queryParams: { id: id } });
  }

  addToCart() {
    if (this.value > 0 && this.dataDetail.inventoryStatus === 'IN STOCK') {
      this.cartService.updateCart(this.dataDetail, this.value);
      this.showMessage(
        mType.success,
        'Thành công',
        'Thêm sản phẩm vào giỏ hàng thành công'
      );
    } else {
      this.showMessage(
        mType.error,
        'Lỗi',
        'Thêm sản phẩm vào giỏ hàng thất bại'
      );
    }
  }
}
