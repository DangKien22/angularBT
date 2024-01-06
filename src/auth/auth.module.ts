import { NgModule } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { PrimeNgModule } from "src/modules/primeng-module/primeng.module";
import { LoginComponent } from "./login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomePageComponent } from "src/Pages/HomePage/HomePage.component";

@NgModule({
    imports: [
    PrimeNgModule,
    ButtonModule,
    FormsModule, 
    ReactiveFormsModule
    ],
    declarations: [
        LoginComponent,
        HomePageComponent
    ],
})

export class AuthModule {}