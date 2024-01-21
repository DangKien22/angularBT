import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<any>();
  @Output() ArrayOutPut: EventEmitter<any> = new EventEmitter<any>();
  @Input() isShow = false;
  @Input() actionType: string ="";
  @Input() titlePopUp: string ="";
  @Input() data: any;
  errorMsg: { [key: string]: string } = {};

  constructor(
    private formBuilder : FormBuilder
  ) { }
   public formData: FormGroup = this.formBuilder.group({
       userName: ["", Validators.required],
       password: ["", Validators.required],
       email: ["", Validators.required],
       name: ["", Validators.required],
       phoneNumber: ["", Validators.required],
       address: ["", Validators.required],
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
    console.log({dataChanges})
    console.log({a:dataChanges['data']})

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
    if(this.formData.valid){
      this.ArrayOutPut.emit(this.formData.value);
      this.formData.reset();
      this.onClose();
    }else{
      Object.keys(this.formData.controls).forEach((key)=> {
        const controlErrors = this.formData.get(key)?.errors;
        if(controlErrors){
            if(controlErrors['required']){
                this.errorMsg[key]= "Không được để trống!"
            }
        }
      })
    }
  }
}
