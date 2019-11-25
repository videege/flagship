import { Component, OnInit, Input, Inject } from '@angular/core';
import { Ship, IgnitionCapableShip, HugeShip, ShipClass } from '../../domain/game/ship';
import { UpgradeType, sortUpgradeTypes } from '../../domain/game/upgradeType';
import { Upgrade } from '../../domain/game/upgrade';
import { MatDialog } from '@angular/material/dialog';
import { ShipCardComponent, ShipCardData } from '../ship-card/ship-card.component';
import { UpgradeSlot } from '../../domain/game/upgradeSlot';
import { UpgradeSelectorData, UpgradeSelectorComponent } from '../upgrade-selector/upgrade-selector.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'flagship-ship-editor',
  templateUrl: './ship-editor.component.html',
  styleUrls: ['./ship-editor.component.scss']
})
export class ShipEditorComponent implements OnInit {
  public ship: Ship | IgnitionCapableShip | HugeShip;
  hugeShip: HugeShip;
  ignitionShip : IgnitionCapableShip;

  public upgradeTypes = UpgradeType;
  constructor(private dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit() {
    this.ship = this.route.snapshot.data.ship;
    this.hugeShip = this.ship.shipClass === ShipClass.Huge ? <HugeShip>this.ship : null;
    this.ignitionShip = this.ship.shipClass === ShipClass.IgnitionCapable ? <IgnitionCapableShip>this.ship : null;
  }

  viewShipCard() {
    this.dialog.open(ShipCardComponent, {
      width: '300px',
      data: <ShipCardData>{ shipId: this.ship.id }
    });
  }

  selectUpgrade(slot: UpgradeSlot) {
    if (!this.ship.fleet.canEdit) return;

    let ref = this.dialog.open(UpgradeSelectorComponent, {
      width: '650px',
      data: <UpgradeSelectorData>{ slot: slot, ship: this.ship }
    });
    ref.afterClosed().subscribe((upgrade: Upgrade) => {
      if (<any>upgrade === "rm" && slot.isFilled()) {
        this.ship.unequipUpgrade(slot);
      }
      else if (upgrade) {
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
      case UpgradeType.CustomCommander:
        return "Commander";
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
