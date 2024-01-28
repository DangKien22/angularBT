import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from './../../modules/primeng-module/primeng.module';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { CartComponent } from './cart/cart.component';
@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
  CommonModule,
  PrimeNgModule, 
  TableModule
  ],
  providers: [
    MessageService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CartModule { }