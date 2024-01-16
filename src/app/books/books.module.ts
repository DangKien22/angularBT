import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from 'src/modules/primeng-module/primeng.module';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrimeNgModule,
  ],
  providers: [
    MessageService,
  ],
})
export class BooksModule { }