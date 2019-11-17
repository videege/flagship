import { Component, OnInit, Input } from '@angular/core';
import { Upgrade } from '../../domain/game/upgrade';
import { UpgradeType } from 'src/app/domain/game/upgradeType';

@Component({
  selector: 'flagship-upgrade-summary',
  templateUrl: './upgrade-summary.component.html',
  styleUrls: ['./upgrade-summary.component.scss']
})
export class UpgradeSummaryComponent implements OnInit {

  @Input() upgrade: Upgrade;
  @Input() isLast: boolean;

  public isDetailed = false;
  public isCustomCommander = false;

  constructor() { }

  ngOnInit() {
    this.isDetailed = [UpgradeType.CustomCommander, UpgradeType.Commander, UpgradeType.Title]
      .indexOf(this.upgrade.type) >= 0;
    this.isCustomCommander = this.upgrade.type === UpgradeType.CustomCommander;
  }

}
