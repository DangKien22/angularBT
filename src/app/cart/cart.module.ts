import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from './../../modules/primeng-module/primeng.module';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { CartComponent } from './cart/cart.component';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'check-out', component: CheckoutComponent }
]
@NgModule({
  declarations: [
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    TableModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    MessageService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CartModule { }