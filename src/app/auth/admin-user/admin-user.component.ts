import { Component, OnInit } from '@angular/core';
import { AdminUser } from '../helpers/interfaces/admin-user';
import { AuthService } from '../auth.service';
import { IsBaseComponent, mType } from 'src/modules/isComponentBase';
import { MessageService } from 'primeng/api';
import { Title } from '@angular/platform-browser';
import { msgAdminUser } from 'src/modules/enum/admin-user.enum';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PopupDeleteComponent } from 'src/app/auth/popup-delete/popup-delete.component';
import { UserService } from '../user.service';

interface MsgAdminUser {
  add: string;
  edit: string;
  delete: string;
}

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss'],
})
export class AdminUserComponent extends IsBaseComponent implements OnInit {
  public listAdminUser: AdminUser[] = [];
  searchText: string = '';
  actionType = '';
  titlePopUp = '';
  openPopAdd = false;
  itemSelect: any;

  constructor(
    private service: UserService,
    public msg: MessageService,
    public title: Title,
    public dialogService: DialogService
  ) {
    super(msg);
  }

  ngOnInit() {
    this.getListUsers();
  }
  handleShowDelete(id: string) {
    const dialogRef: DynamicDialogRef = this.dialogService.open(
      PopupDeleteComponent,
      {
        data: {
          name: 'Bạn có chắc chắn muốn xóa?',
          ok: 'Đồng ý',
          no: 'Đóng',
        },
        header: 'Xác nhận',
      }
    );
    dialogRef.onClose.subscribe((result: any) => {
      if (result === true) {
        this.service.deleteUser(id).subscribe(
          (response: any) => {
            this.showMessageType('delete');
            this.getListUsers();
          },
          (error: any) => {
            console.log({ error });
            this.showMessage(mType.error, 'Thất bại', error);
          }
        );
      }
      return false;
    });
  }
  handleEdit(actionType: string, params: any) {
    this.actionType = actionType;
    this.itemSelect = params;
    this.titlePopUp = 'Chỉnh sửa User';
    this.openPopAdd = true;
  }
  handleView(actionType: string, params: any) {
    this.actionType = actionType;
    this.itemSelect = params;
    this.titlePopUp = 'Xem thông tin User';
    this.openPopAdd = true;
  }
  handlOpenAdd(actionType: string) {
    this.actionType = actionType;
    this.openPopAdd = true;
    this.titlePopUp = 'Thêm mới User';
  }
  performSearch() { }
  closePopUp(ev: any) {
    this.actionType = '';
    this.openPopAdd = ev;
    this.itemSelect = null;
  }
  getListUsers() {
    this.service.getListUsers().subscribe({
      next: (data) => {
        if (data) {
          console.log({ data });
          this.listAdminUser = data;
        }
      },
    });
  }
  handleAddUser(params: any) {
    console.log({ params });
    this.service.addUser(params).subscribe({
      next: (data) => {
        if (data) {
          this.getListUsers();
          this.showMessageType('add');
        }
      },
      error: (error) => {
        console.log('errr');
        this.showMessage(mType.error, 'Thất bại', error);
      },
    });
  }
  handleEditUser(params?: any, id?: string | number) {
    this.service.updateUser(params, id).subscribe({
      next: data => {
        if (data) {
          this.getListUsers();
          this.showMessageType('edit')
        }
      },
      error: error => {
        this.showMessage(mType.error, "Thất bại", error)
      }
    })
  }
  handleShowMessage(ev?: any) {
    console.log(ev);
    if (this.actionType === 'add') {
      this.handleAddUser(ev);
    }
    if (this.actionType === 'delete') {
      this.handleShowDelete(ev)
    }
    if (this.actionType === 'edit') {
      this.handleEditUser(ev, this.itemSelect.id)
    }
  }
  showMessageType(action?: keyof MsgAdminUser) {
    if (action) {
      this.showMessage(mType.success, 'Thông báo', msgAdminUser[action]);
    }
  }
}
