import { Component, OnInit, Input, Inject } from '@angular/core';
import { Ship } from '../domain/ship';
import { UpgradeType, sortUpgradeTypes } from '../domain/upgradeType';
import { Upgrade } from '../domain/upgrade';
import { MatDialog } from '@angular/material/dialog';
import { ShipCardComponent, ShipCardData } from '../ship-card/ship-card.component';
import { UpgradeSlot } from '../domain/upgradeSlot';
import { UpgradeSelectorData, UpgradeSelectorComponent } from '../upgrade-selector/upgrade-selector.component';

@Component({
  selector: 'flagship-ship-editor',
  templateUrl: './ship-editor.component.html',
  styleUrls: ['./ship-editor.component.css']
})
export class ShipEditorComponent implements OnInit {

  @Input() ship: Ship;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  viewShipCard() {
    this.dialog.open(ShipCardComponent, {
      width: '300px',
      data: <ShipCardData>{ shipId: this.ship.id }
    });
  }

  selectUpgrade(slot: UpgradeSlot) {
    let ref = this.dialog.open(UpgradeSelectorComponent, {
      width: '650px',
      data: <UpgradeSelectorData>{ slot: slot, ship: this.ship }
    });
    ref.afterClosed().subscribe((upgrade: Upgrade) => {
      if (<any>upgrade === "rm" && slot.isFilled()) {
        this.ship.unequipUpgrade(slot);
      }
      if (upgrade) {
        if (slot.isFilled()) {
          this.ship.unequipUpgrade(slot);
        }
        this.ship.equipUpgrade(upgrade, slot);
      }
    });
  }

  enabledUpgradeSlots() {
    return this.ship.upgradeSlots.filter(x => x.isEnabled).sort((a, b) => {
      return sortUpgradeTypes(a.type, b.type);
    });
  }

  upgradeTypeName(type: UpgradeType): string {
    switch (type) {
      case UpgradeType.BoardingTeam:
        return "Boarding Team";
      case UpgradeType.DefensiveRetrofit:
        return "Defensive Retrofit";
      case UpgradeType.ExperimentalRetrofit:
        return "Experimental Retrofit";
      case UpgradeType.FleetCommand:
        return "Fleet Command";
      case UpgradeType.FleetSupport:
        return "Fleet Support";
      case UpgradeType.IonCannons:
        return "Ion Cannons";
      case UpgradeType.OffensiveRetrofit:
        return "Offensive Retrofit";
      case UpgradeType.SupportTeam:
        return "Support Team";
      case UpgradeType.WeaponsTeam:
        return "Weapons Team";
      default:
        return type.toString();
    }
  }

}
