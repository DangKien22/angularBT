import { NgModule } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { PrimeNgModule } from "src/modules/primeng-module/primeng.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TopMenuComponent } from "./components/layout/top-menu/top-menu.component";
import { InputTextModule } from "primeng/inputtext";
import { HeaderComponent } from './components/header/header.component';

@NgModule({
    imports: [
        PrimeNgModule,
        ButtonModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule
    ],
    declarations: [
        TopMenuComponent,
        HeaderComponent
    ],
    exports: [
        TopMenuComponent,
        HeaderComponent
    ]
})

export class SharedModule { }