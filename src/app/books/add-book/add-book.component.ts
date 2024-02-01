import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<any>();
  @Output() ArrayOutPut: EventEmitter<any> = new EventEmitter<any>();
  @Input() isShow = false;
  @Input() actionType: string = "";
  @Input() titlePopUp: string = "";
  @Input() data: any;
  errorMsg: { [key: string]: string } = {};
  roleOptions: any[] = [
    { inventoryStatus: "IN STOCK", label: "IN STOCK" },
    { inventoryStatus: "OUT OF STOCK", label: "OUT OF STOCK" },
    { inventoryStatus: "LOW STOCK", label: "LOW STOCK" }
  ]

  constructor(
    public formBuilder: FormBuilder
  ) { }
  public formData: FormGroup = this.formBuilder.group({
    userName: ["", Validators.required],
    password: ["", Validators.required],
    email: ["", Validators.required],
    name: ["", Validators.required],
    phoneNumber: ["", Validators.required],
    address: ["", Validators.required],
    role: ["", Validators.required]
  })
  ngOnInit() {
  }

  onClose() {
    this.isShow = false;
    this.formData.reset();
    this.clickClose.emit(this.isShow);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const dataChanges = changes;

    if (dataChanges['data']) {
      this.setValueForm(dataChanges['data']);
    }

    if (dataChanges[this.actionType]) {
      if (this.actionType === "view") {
        Object.keys(this.formData.controls).forEach((key) => {
          this.formData.controls[key].disable();
        });
      } else {
        Object.keys(this.formData.controls).forEach((key) => {
          this.formData.controls[key].enable();
        });
      }
    }
    if (this.actionType === "add") {
      this.formData.reset();
      this.errorMsg = {};
    }
  }

  setValueForm(data: any) {
    if (data) {
      console.log({ data });
      this.formData.patchValue({
        userName: data.currentValue?.userName,
        password: data.currentValue?.password,
        email: data.currentValue?.email,
        name: data.currentValue?.name,
        phoneNumber: data.currentValue?.phoneNumber,
        address: data.currentValue?.address,
        role: data.currentValue?.role
      });
    }

    if (this.actionType === "view") {
      Object.keys(this.formData.controls).forEach((key) => {
        this.formData.controls[key].disable();
      });
    } else {
      Object.keys(this.formData.controls).forEach((key) => {
        this.formData.controls[key].enable();
      });
    }
  }

  handleSubmit() {
    console.log("a", this.formData)
    if (this.formData.valid) {
      this.ArrayOutPut.emit(this.formData.value);
      this.formData.reset();
      this.onClose();
    } else {
      Object.keys(this.formData.controls).forEach((key) => {
        const controlErrors = this.formData.get(key)?.errors;
        if (controlErrors) {
          if (controlErrors['required']) {
            this.errorMsg[key] = "Không được để trống!"
          } else if (controlErrors['invalidUsername']) {
            this.errorMsg[key] = 'Tên đăng nhập không hợp lệ!';
          } else if (controlErrors['invalidPassword']) {
            this.errorMsg[key] = 'Mật khẩu không hợp lệ!';
          }
        }
      })
    }
  }
}
