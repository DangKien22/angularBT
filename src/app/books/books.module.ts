import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from 'src/modules/primeng-module/primeng.module';
import { MessageService } from 'primeng/api';
import { DataViewModule } from 'primeng/dataview';
import { BooksComponent } from './books.component';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { SplitterModule } from 'primeng/splitter';
import { AddBookComponent } from './add-book/add-book.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'book-detail', component: BookDetailComponent },
]
@NgModule({
  declarations: [
    BooksComponent,
    BookDetailComponent,
    AddBookComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    DataViewModule,
    RatingModule,
    TableModule,
    RouterModule.forChild(routes),
    SplitterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    MessageService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BooksModule { }