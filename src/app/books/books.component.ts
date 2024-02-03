import { Component, OnInit } from '@angular/core';
import { BooksService } from './books.service';
import { mType, IsBaseComponent } from 'src/modules/isComponentBase';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Product, SelectItem } from './shared/models/interfaces';
import { handleNavigate } from './shared/models/book-utils';
import { CartService } from '../cart/cart.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PopupDeleteComponent } from '../auth/popup-delete/popup-delete.component';
import { ShareService } from '../shared/share.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent extends IsBaseComponent implements OnInit {
  layout: 'list' | 'grid' = 'list';

  products!: Product[];
  sortOptions!: SelectItem[];

  sortOrder!: number;

  productDetail!: Product[];
  sortField!: string;

  actionType = '';
  titlePopUp = '';
  openPopAdd = false;
  itemSelect: any;
  roleAdmin: any

  constructor(
    private service: BooksService,
    public msg: MessageService,
    private router: Router,
    private cartService: CartService, 
    private dialogService : DialogService,
    private shareService : ShareService
  ) {
    super(msg);
  }

  ngOnInit() {
    this.getBooks();
    this.sortOptions = [
      { label: 'Giá từ cao đến thấp', value: '!price' },
      { label: 'Giá từ thấp đến cao', value: 'price' },
    ];
    this.roleAdmin = this.shareService.checkRole()
    console.log(this.roleAdmin)
  }

  getBooks() {
    this.service.getBooks().subscribe({
      next: (data) => {
        if (data) {
          console.log({ data });
          this.products = data.reverse();
        }
      },
      error: (error) => {
        this.showMessage(mType.error, 'Lỗi', error);
      },
    });
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
  }

  navigateTo(id: string | number) {
    const queryParams = {
      id: id,
    };
    handleNavigate(this.router, 'book-detail', queryParams);
  }

  onSortChange(event: any) {
    const sortOption = event.value; 
  
    if (sortOption === '!price') {
      this.products.sort((a, b) => {
        if (a && b && a.price && b.price) {
          return b.price - a.price; 
        }
        return 0;
      });
    } else if (sortOption === 'price') {
      this.products.sort((a, b) => {
        if (a && b && a.price && b.price) {
          return a.price - b.price;
        }
        return 0;
      });
    }
  }

  addToCart(product: Product) {
    this.cartService.updateCart(product, 1);
    this.showMessage(
      mType.success,
      'Thành công',
      'Thêm sản phẩm vào giỏ hàng thành công'
    );
  }

  handlOpenAdd(actionType: string) {
    this.actionType = actionType;
    this.openPopAdd = true;
    this.titlePopUp = 'Thêm mới sách';
  }

  handleOpenEdit(actionType: string, params: any){
    this.actionType = actionType;
    this.itemSelect = params;
    this.titlePopUp = 'Chỉnh sửa sách'
    this.openPopAdd = true
  }

  handleShowDelete(id: string) {
    const dialogRef: DynamicDialogRef = this.dialogService.open(
      PopupDeleteComponent,
      {
        data: {
          name: 'Bạn có chắc chắn muốn xóa?',
          ok: 'Đồng ý',
          no: 'Đóng',
        },
        header: 'Xác nhận',
      }
    );
    dialogRef.onClose.subscribe((result: any) => {
      if (result === true) {
        this.service.deleteBook(id).subscribe(
          (response: any) => {
            this.getBooks();
            this.showMessage(mType.success, 'Thành công', 'Xóa sách thành công');
          },
          (error: any) => {
            console.log({ error });
            this.showMessage(mType.error, 'Thất bại', error);
          }
        );
      }
      return false;
    });
  }

  handleSubmit(params?: any) {
    if(this.actionType === 'add'){
      this.service.addBook(params).subscribe({
        next: data => {
          if(data){
            this.getBooks();
            this.showMessage(mType.success, 'Thành công', 'Thêm mới sách thành công');
          }
        },
        error: error => {
          this.showMessage(mType.error, "Thất bại", error)
        }
      })
    }
    if(this.actionType === 'edit'){
      this.service.editBook(params, this.itemSelect.id).subscribe({
        next: data => {
          this.getBooks();
          this.showMessage(mType.success, 'Thành công', 'Update sách thành công');
        },
        error: err => {
          this.showMessage(mType.error, "Thất bại", err)
        },
      })
    }
    if(this.actionType === 'delete'){
      this.handleShowDelete(params)
    }
  }

  closePopUp(e: any) {
    this.actionType = '';
    this.openPopAdd = e;
    this.itemSelect = null;
  }
}
