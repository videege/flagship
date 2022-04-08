import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CampaignEra } from 'src/app/domain/campaign/campaignEra';

export class SetCampaignPointsDialogData {
  constructor(public act: number,
    public empireScore: number,
    public rebelScore: number,
    public era: CampaignEra) {
  }
}

@Component({
  selector: 'flagship-set-campaign-points-dialog',
  templateUrl: './set-campaign-points-dialog.component.html',
  styleUrls: ['./set-campaign-points-dialog.component.scss']
})
export class SetCampaignPointsDialogComponent implements OnInit {
  public isForCampaign = false;
  public empireScore = null;
  public rebelScore = null;
  public era = null;

  constructor(public dialogRef: MatDialogRef<SetCampaignPointsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SetCampaignPointsDialogData) {
  }

  ngOnInit() {
    this.rebelScore = this.data.rebelScore;
    this.empireScore = this.data.empireScore;
    this.era = this.data.era;
    this.isForCampaign = this.data.act === null;
  }

  cancel() {
    this.dialogRef.close(null);
  }

  setScore() {
    this.dialogRef.close(new SetCampaignPointsDialogData(this.data.act,
      this.empireScore, this.rebelScore, this.data.era));
  }
}
