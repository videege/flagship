import { Component, OnInit, Input } from '@angular/core';
import { CampaignSetupDialogData, CampaignSetupDialogComponent } from '../campaign-setup-dialog/campaign-setup-dialog.component';
import { Campaign } from 'src/app/domain/campaign/campaign';
import { ClipboardService } from 'ngx-clipboard';
import { MatSnackBar, MatDialog } from '@angular/material';
import { CampaignService } from 'src/app/core/services/campaign.service';

@Component({
  selector: 'flagship-campaign-setup',
  templateUrl: './campaign-setup.component.html',
  styleUrls: ['./campaign-setup.component.scss']
})
export class CampaignSetupComponent implements OnInit {
  @Input() campaign: Campaign;

  constructor(private dialog: MatDialog, private clipboardService: ClipboardService,
    private snackbar: MatSnackBar, private campaignService: CampaignService) { }

  ngOnInit() {
  }

  copyInviteUrl() {
    this.clipboardService.copyFromContent(this.campaign.inviteUrl());
    this.snackbar.open('Invite link copied to clipboard!', 'OK', {
      duration: 1500
    });
  }

  finishSetup() {
    let ref = this.dialog.open(CampaignSetupDialogComponent, {
      width: '450px',
      data: <CampaignSetupDialogData> {
        campaign: this.campaign,
        shouldStart: false
      }
    }); 
    ref.afterClosed().subscribe((data: CampaignSetupDialogData) => {
      if (data && data.shouldStart) {
        this.campaign.finishSetup();
        this.campaignService.updateCampaign(this.campaign).then(() => {
          this.snackbar.open('Campaign Setup Complete', 'OK', {
            duration: 1500
          });
        });
      }
    });
  }
}
