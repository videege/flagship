import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export class ConfirmDialogData {

  constructor(
    public message: string = "Are you sure?",
    public confirm: string = "OK",
    public cancel: string = "Cancel",
    public confirmColor: string = "primary") {

  }

  static warn(message: string, confirm: string, cancel: string) {
    return new ConfirmDialogData(message, confirm, cancel, 'warn');
  }

  static accent(message: string, confirm: string, cancel: string) {
    return new ConfirmDialogData(message, confirm, cancel, 'accent');
  }
}

@Component({
  selector: 'flagship-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) { }

  ngOnInit() {
  }

  confirm() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }

}
