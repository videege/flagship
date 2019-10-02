import { Component, OnInit } from '@angular/core';
import { Campaign } from 'src/app/domain/campaign/campaign';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { CampaignState } from 'src/app/domain/campaign/campaignState';
import { Phase } from 'src/app/domain/campaign/phase';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'flagship-campaign-dashboard',
  templateUrl: './campaign-dashboard.component.html',
  styleUrls: ['./campaign-dashboard.component.css']
})
export class CampaignDashboardComponent implements OnInit {

  public campaign: Campaign;
  public currentState: CampaignState;

  public phases = Phase;

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
  }

  copyInviteUrl() {
    this.clipboardService.copyFromContent(this.campaign.inviteUrl());
    this.snackbar.open('Invite link copied to clipboard!', 'OK', {
      duration: 1500
    });
  }
}
