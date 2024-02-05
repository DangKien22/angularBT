import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IsBaseComponent, mType } from 'src/modules/isComponentBase';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent extends IsBaseComponent implements OnInit {
  dataSelect: any;
  selectedDelivery: any = null;
  selectPayment: any = null;
  errorMsg: { [key: string]: string } = {};

  deliverys: any[] = [
    { name: 'Giao hàng tiết kiệm', key: 'GHTK' },
    { name: 'Viettel Post.', key: 'VT' },
    { name: 'J&T Express.', key: 'TT' },

  ];
  payments: any[] = [
    { name: 'Thanh toán ngay', key: 'A' },
    { name: 'Thanh toán khi nhận hàng', key: 'M' },
  ];
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    public formBuilder: FormBuilder,
    public msg: MessageService,

  ) {
    super(msg)
  }

  public formData: FormGroup = this.formBuilder.group({
    name: ["", Validators.required],
    address: ["", Validators.required],
    delivery: ["", Validators.required],
    payment: ["", Validators.required],
  })

  ngOnInit() {
    this.dataSelect = this.cartService.selectedItems;
    this.selectedDelivery = this.deliverys[0]
    this.selectPayment = this.payments[0]
  }

  handleSubmit() {
    console.log("a", this.formData)
    if (this.formData.valid) {
      this.formData.reset();
      this.cartService.completeOrder
      this.showMessage(mType.success, 'Thành công', 'Đặt hàng thành công')
    } else {
      Object.keys(this.formData.controls).forEach((key) => {
        console.log(key)
        const controlErrors = this.formData.get(key)?.errors;
        console.log(this.formData.get(key))
        if (controlErrors) {
          if (controlErrors['required']) {
            this.errorMsg[key] = "Không được để trống!"
          }
        }
      })
    }
  }

}
