import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { BooksComponent } from './books/books.component';
import { TopMenuComponent } from './shared/components/layout/top-menu/top-menu.component';
import { HeaderComponent } from './shared/components/header/header.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'books', component: BooksComponent, canActivate: [AuthGuard],
    loadChildren: () => import("./books/books.module").then(m => m.BooksModule)
  },
  { path: '', component: BooksComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
