import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Campaign } from 'src/app/domain/campaign/campaign';
import { CampaignUser } from 'src/app/domain/campaign/campaignUser';
import { CampaignState } from 'src/app/domain/campaign/campaignState';
import { Phase } from 'src/app/domain/campaign/phase';

@Component({
  selector: 'flagship-campaign-info',
  templateUrl: './campaign-info.component.html',
  styleUrls: ['./campaign-info.component.scss']
})
export class CampaignInfoComponent implements OnInit, OnChanges {

  @Input() campaign: Campaign;

  public ownerUser: CampaignUser;
  public invitedUsers: CampaignUser[] = [];
  public currentState: CampaignState;
  public showCurrentActStats = false;
  constructor() { }

  ngOnInit() {
    this.setup();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setup();
  }

  setup() {
    this.ownerUser = this.campaign.campaignOwner();
    this.invitedUsers = this.campaign.invitedUsers();
    this.currentState = this.campaign.currentState();
    this.showCurrentActStats = this.currentState.phase !== Phase.CampaignSetup &&
      this.currentState.phase !== Phase.Finished;
  }
}
