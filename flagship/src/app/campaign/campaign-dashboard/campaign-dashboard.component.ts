import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Location } from '@angular/common';
import { Campaign } from 'src/app/domain/campaign/campaign';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
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
  public selectedSubNavIndex: number;
  public campaign: Campaign;
  public currentState: CampaignState;

  public phases = Phase;

  public loading = true;

  constructor(private breakpointObserver: BreakpointObserver, private dialog: MatDialog,
    private route: ActivatedRoute, private clipboardService: ClipboardService,
    private snackbar: MatSnackBar, private campaignService: CampaignService,
    private breadcrumbService: BreadcrumbService, private router: Router, private location: Location) {
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

  getSubNavIndex(data) {
    switch (data.subNav) {
      case 'roster': return 1;
      case 'locations': return 2;
      case 'timeline': return 3;
      default: return 0;
    }
  }

  ngOnInit() {
    let campaignId = this.route.snapshot.params.id;
    this.selectedSubNavIndex = this.getSubNavIndex(this.route.snapshot.data);
    this.campaignService.getCampaignForUser(campaignId).subscribe((campaign) => {
      this.campaign = campaign;
      this.breadcrumbService.setBreadcrumb(new FlagshipRouteData(campaign.name, 'Campaigns', '/campaigns'));
      this.currentState = this.campaign.currentState();
      this.loading = false;
    });
  }

  onSelectedTabChange(event: MatTabChangeEvent) {
    const subNavPath = event.tab.textLabel.toLowerCase();
    const url = this
      .router
      .createUrlTree(['/campaigns', this.campaign.id, subNavPath])
      .toString();

    this.location.go(url);
  }
}
