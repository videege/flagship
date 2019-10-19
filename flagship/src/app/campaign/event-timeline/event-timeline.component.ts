import { Component, OnInit, Input } from '@angular/core';
import { Campaign } from 'src/app/domain/campaign/campaign';

@Component({
  selector: 'flagship-event-timeline',
  templateUrl: './event-timeline.component.html',
  styleUrls: ['./event-timeline.component.css']
})
export class EventTimelineComponent implements OnInit {
  @Input() campaign: Campaign;
  
  constructor() { }

  ngOnInit() {
  }

}
