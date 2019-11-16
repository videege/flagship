import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Campaign } from 'src/app/domain/campaign/campaign';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { CampaignState } from 'src/app/domain/campaign/campaignState';
import { Phase } from 'src/app/domain/campaign/phase';
import { ClipboardService } from 'ngx-clipboard';
import { CampaignUser } from 'src/app/domain/campaign/campaignUser';
import { CampaignSetupDialogComponent, CampaignSetupDialogData } from '../campaign-setup-dialog/campaign-setup-dialog.component';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { BreadcrumbService } from 'src/app/core/services/breadcrumb.service';
import { FlagshipRouteData } from 'src/app/app.route-data';

@Component({
  selector: 'flagship-campaign-dashboard',
  templateUrl: './campaign-dashboard.component.html',
  styleUrls: ['./campaign-dashboard.component.scss']
})
export class CampaignDashboardComponent implements OnInit {

  public campaign: Campaign;
  public currentState: CampaignState;

  public phases = Phase;

  public loading = true;

  constructor(private breakpointObserver: BreakpointObserver, private dialog: MatDialog,
    private route: ActivatedRoute, private clipboardService: ClipboardService,
    private snackbar: MatSnackBar, private campaignService: CampaignService,
    private breadcrumbService: BreadcrumbService) {
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
    let campaignId = this.route.snapshot.params.id;
    this.campaignService.getCampaignForUser(campaignId).subscribe((campaign) => {
      this.campaign = campaign;
      this.breadcrumbService.setBreadcrumb(new FlagshipRouteData(campaign.name, 'Campaigns', '/campaigns'));
      this.currentState = this.campaign.currentState();
      this.loading = false;
    });
  }
}
