import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { BooksComponent } from './books/books.component';
import { TopMenuComponent } from './shared/components/layout/top-menu/top-menu.component';

const routes: Routes = [
   {path: 'login', component: LoginComponent},
   {path: 'books', component: BooksComponent, canActivate: [AuthGuard],
   loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
