import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Campaign } from 'src/app/domain/campaign/campaign';
import { RITRValidator, Validator } from 'src/app/domain/campaign/validator';
import { CampaignType } from 'src/app/domain/campaign/campaignType';
import { Issue, IssueSeverity } from 'src/app/domain/campaign/issue';

export interface CampaignSetupDialogData {
  campaign: Campaign;
}

@Component({
  selector: 'flagship-campaign-setup-dialog',
  templateUrl: './campaign-setup-dialog.component.html',
  styleUrls: ['./campaign-setup-dialog.component.css']
})
export class CampaignSetupDialogComponent implements OnInit {

  public campaign: Campaign;
  private validator: Validator;

  public issues: Issue[] = [];
  public canFinalize = false;

  constructor(public dialogRef: MatDialogRef<CampaignSetupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CampaignSetupDialogData) { 
    }

  ngOnInit() {
    this.campaign = this.data.campaign;
    this.validator = this.campaign.type === CampaignType.RITR ? new RITRValidator() : null;

    // Perform validation
    this.issues = this.validator.validateSetupPhase(this.campaign);
    this.canFinalize = this.issues.filter(x => x.severity === IssueSeverity.Error).length === 0;
  }

  finalize() {

  }

}
