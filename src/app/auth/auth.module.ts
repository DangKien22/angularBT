import { NgModule } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { PrimeNgModule } from "src/modules/primeng-module/primeng.module";
import { LoginComponent } from "./login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AdminUserComponent } from "./admin-user/admin-user.component";
import { AddAdminComponent } from "./admin-user/add-admin/add-admin.component";
import { DialogModule } from "primeng/dialog";
import { PopupDeleteComponent } from "./popup-delete/popup-delete.component";
import { DialogService } from "primeng/dynamicdialog";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

const routes: Routes = [
    { path: 'admin-user', component: AdminUserComponent },
    { path: 'add-admin-user', component: AddAdminComponent },
];
@NgModule({
    imports: [
        PrimeNgModule,
        ButtonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        DialogModule,
    ],
    declarations: [
        LoginComponent,
        AddAdminComponent,
        AdminUserComponent,
        PopupDeleteComponent
    ],
    providers: [
        DialogService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AuthModule { }