import { Component, OnInit } from '@angular/core';
import { Campaign } from 'src/app/domain/campaign/campaign';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { CampaignState } from 'src/app/domain/campaign/campaignState';
import { Phase } from 'src/app/domain/campaign/phase';
import { ClipboardService } from 'ngx-clipboard';
import { CampaignUser } from 'src/app/domain/campaign/campaignUser';
import { CampaignSetupDialogComponent, CampaignSetupDialogData } from '../campaign-setup-dialog/campaign-setup-dialog.component';

@Component({
  selector: 'flagship-campaign-dashboard',
  templateUrl: './campaign-dashboard.component.html',
  styleUrls: ['./campaign-dashboard.component.css']
})
export class CampaignDashboardComponent implements OnInit {

  public campaign: Campaign;
  public currentState: CampaignState;

  public phases = Phase;

  public ownerUser: CampaignUser;
  public invitedUsers: CampaignUser[] = [];

  constructor(private breakpointObserver: BreakpointObserver, private dialog: MatDialog,
    private route: ActivatedRoute, private clipboardService: ClipboardService,
    private snackbar: MatSnackBar) {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          //this.colSpan = 2;
        }
        else {
          //this.colSpan = 1;
        }
      });
  }

  ngOnInit() {
    this.campaign = this.route.snapshot.data.campaign;
    this.currentState = this.campaign.currentState();
    this.ownerUser = this.campaign.campaignOwner();
    this.invitedUsers = this.campaign.invitedUsers();
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
        campaign: this.campaign
      }
    }); 
    ref.afterClosed().subscribe((data: CampaignSetupDialogData) => {
      if (data) {
        alert('todo');
        // this.campaignService.createCampaign(data.name, data.type)
        //   .then(() => {
        //     //this.dataSource = new MatTableDataSource<Fleet>(this.fleets);
            
        //   });
      }
    });
  }
}
