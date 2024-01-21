import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
@Component({
  selector: 'app-popup-delete',
  templateUrl: './popup-delete.component.html',
  styleUrls: ['./popup-delete.component.scss'],
})
export class PopupDeleteComponent implements OnInit {
  data: any = []
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private dialogConfig: DynamicDialogConfig
  ) {
  }

  ngOnInit(): void {
    this.data = this.dialogConfig.data;
  }

  handleCloseDialog() {
    const passingValue = false;
    this.ref.close(passingValue);
  }
  handleSubmitDialog() {
    const passingValue = true;
    this.ref.close(passingValue);
  }
}

