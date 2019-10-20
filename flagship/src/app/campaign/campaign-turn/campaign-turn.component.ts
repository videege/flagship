import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Campaign } from 'src/app/domain/campaign/campaign';
import { CampaignState } from 'src/app/domain/campaign/campaignState';

@Component({
  selector: 'flagship-campaign-turn',
  templateUrl: './campaign-turn.component.html',
  styleUrls: ['./campaign-turn.component.css']
})
export class CampaignTurnComponent implements OnInit, OnChanges {
  
  @Input() campaign: Campaign;

  currentState: CampaignState;

  constructor() { }

  ngOnInit() {
    this.setup();
  }

  ngOnChanges(changes: SimpleChanges): void {
    //)
    this.setup();
  }

  setup() {
    this.currentState = this.campaign.currentState();
  }

}
