import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from 'src/modules/primeng-module/primeng.module';
import { MessageService } from 'primeng/api';
import { DataViewModule } from 'primeng/dataview';
import { BooksComponent } from './books.component';
import {RatingModule} from 'primeng/rating';
@NgModule({
  declarations: [
    BooksComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    DataViewModule,
    RatingModule
    ],
  providers: [
    MessageService,
  ],
})
export class BooksModule { }