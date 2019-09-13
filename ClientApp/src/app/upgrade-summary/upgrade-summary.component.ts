import { Component, OnInit, Input } from '@angular/core';
import { Upgrade } from '../domain/upgrade';

@Component({
  selector: 'flagship-upgrade-summary',
  templateUrl: './upgrade-summary.component.html',
  styleUrls: ['./upgrade-summary.component.css']
})
export class UpgradeSummaryComponent implements OnInit {

  @Input() upgrade: Upgrade;
  @Input() isLast: boolean;

  constructor() { }

  ngOnInit() {
  }

}
