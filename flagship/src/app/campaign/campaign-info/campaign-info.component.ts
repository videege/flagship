import { Component, OnInit, Input } from '@angular/core';
import { Campaign } from 'src/app/domain/campaign/campaign';
import { CampaignUser } from 'src/app/domain/campaign/campaignUser';

@Component({
  selector: 'flagship-campaign-info',
  templateUrl: './campaign-info.component.html',
  styleUrls: ['./campaign-info.component.scss']
})
export class CampaignInfoComponent implements OnInit {
  @Input() campaign: Campaign;

  public ownerUser: CampaignUser;
  public invitedUsers: CampaignUser[] = [];


  constructor() { }

  ngOnInit() {
    this.ownerUser = this.campaign.campaignOwner();
    this.invitedUsers = this.campaign.invitedUsers();
  }

}
