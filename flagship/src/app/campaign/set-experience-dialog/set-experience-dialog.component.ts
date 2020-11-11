import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export class SetExperienceDialogData {
  currentExperience: number;
}

@Component({
  selector: 'flagship-set-experience-dialog',
  templateUrl: './set-experience-dialog.component.html',
  styleUrls: ['./set-experience-dialog.component.scss']
})
export class SetExperienceDialogComponent implements OnInit {

  public xp: number = null;

  constructor(public dialogRef: MatDialogRef<SetExperienceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SetExperienceDialogData) { 
    }

  ngOnInit() {
    this.xp = this.data.currentExperience;
  }

  cancel() {
    this.dialogRef.close(-1);
  }
  setExperience() {
    this.dialogRef.close(this.xp);
  }

}
