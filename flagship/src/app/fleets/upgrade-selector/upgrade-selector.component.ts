import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpgradeSlot } from '../../domain/upgradeSlot';
import { UpgradeFactory } from '../../domain/factories/upgradeFactory';
import { Faction } from '../../domain/faction';
import { Ship } from '../../domain/ship';
import { Upgrade } from '../../domain/upgrade';
import { UpgradeType } from 'src/app/domain/upgradeType';

export interface UpgradeSelectorData {
  slot: UpgradeSlot;
  ship: Ship;
}
@Component({
  selector: 'flagship-upgrade-selector',
  templateUrl: './upgrade-selector.component.html',
  styleUrls: ['./upgrade-selector.component.scss']
})
export class UpgradeSelectorComponent implements OnInit {

  private upgradeFactory: UpgradeFactory = new UpgradeFactory();
  public upgrades: Upgrade[] = [];
  public isFilled: boolean = false;
  constructor(public dialogRef: MatDialogRef<UpgradeSelectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UpgradeSelectorData) { }

  ngOnInit() {
    let type = this.data.slot.type;
    this.isFilled = this.data.slot.isFilled();

    let allUpgrades = type === UpgradeType.CustomCommander 
      ? [this.upgradeFactory.getCustomCommanderUpgrade(this.data.ship.fleet.customCommander, this.data.ship.faction)]
      : this.upgradeFactory.getUpgradesOfType(type, this.data.ship.faction);
    this.upgrades = allUpgrades.filter(u => this.data.ship.isUpgradeSelectable(u, this.data.slot));
  } 

  selectUpgrade(upgrade: Upgrade) {
    this.dialogRef.close(upgrade);
  }

}
