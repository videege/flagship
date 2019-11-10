import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Campaign } from 'src/app/domain/campaign/campaign';
import { CampaignEvent } from 'src/app/domain/campaign/campaignEvent';

@Component({
  selector: 'flagship-event-timeline',
  templateUrl: './event-timeline.component.html',
  styleUrls: ['./event-timeline.component.scss']
})
export class EventTimelineComponent implements OnInit {
  
  @Input() campaign: Campaign;
  
  constructor() { }

  ngOnInit() {
  }
}
