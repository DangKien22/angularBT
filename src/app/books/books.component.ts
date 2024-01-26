import { Component, OnInit } from '@angular/core';
import { BooksService } from './books.service';
import { mType, IsBaseComponent } from 'src/modules/isComponentBase';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Product, SelectItem } from './shared/models/interfaces';
import { handleNavigate } from './shared/models/book-utils';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent extends IsBaseComponent implements OnInit {
  layout: 'list' | 'grid' = "list";

  products!: Product[];
  sortOptions!: SelectItem[];

  sortOrder!: number;

  productDetail!: Product[];
  sortField!: string;

  constructor(
    private service: BooksService,
    public msg: MessageService,
    private router: Router
  ) {
    super(msg)
  }

  ngOnInit() {
    this.getBooks();
    this.sortOptions = [
      { label: 'Giá từ cao đến thấp', value: '!price' },
      { label: 'Giá từ thấp đến cao', value: 'price' }
    ];
  }

  getBooks() {
    this.service.getBooks().subscribe({
      next: data => {
        if (data) {
          console.log({ data })
          this.products = data;
        }
      },
      error: error => {
        this.showMessage(mType.error, "Lỗi", error)
      }
    })
  }

  getSeverity(product: Product) {
    switch (product.inventoryStatus) {
      case 'IN STOCK':
        return 'success';

      case 'LOW STOCK':
        return 'warning';

      case 'OUT OF STOCK':
        return 'danger';

      default:
        return '';
    }
  };

  navigateTo(id: string | number) {
    const queryParams = {
      id: id
    };
    handleNavigate(this.router, 'book-detail', queryParams);
  }

  onSortChange(event: any) {
  }
}
