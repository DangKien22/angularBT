import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from 'src/Pages/HomePage/HomePage.component';
import { LoginComponent } from 'src/auth/login/login.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
   {path: 'login', component: LoginComponent},
   {path: '', component: HomePageComponent, canActivate: [AuthGuard],
   loadChildren: () => import("../auth/auth.module").then(m => m.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
