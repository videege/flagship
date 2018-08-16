import { Faction } from "./faction";
import { Ship } from "./ship";
import { Squadron } from "./squadron";
import { Upgrade } from "./upgrade";
import { UpgradeSlot } from "./upgradeSlot";
import { UpgradeType } from "./upgradeType";

export class Fleet {
  public ships: Ship[];
  public squadrons: Squadron[];

  constructor(public id: string, public name: string,
    public author: string, public faction: Faction, public pointLimit: number) {
      this.ships = [];
      this.squadrons = [];
  }

  squadronPointLimit(): number {
    return Math.ceil(this.pointLimit / 3);
  }

  currentPoints(): number {
    let points = 0;
    for (let i = 0; i < this.ships.length; i++) {
      points += this.ships[i].currentPoints();
    }
    for (let i = 0; i < this.squadrons.length; i++) {
      points += this.squadrons[i].points;
    }

    return points;
  }

  canEquipUpgrade(ship: Ship, upgrade: Upgrade): boolean {
    // Can't equip if unique and there is already a upgrade/squadron with
    // the same name
    if (upgrade.unique) {
      let shipWithMatchingUpgrade = this.ships.find((s: Ship) => {
        let matchingUpgrade = s.upgradeSlots.find((u: UpgradeSlot) => u.isEnabled && u.isFilled() && u.upgrade.name === upgrade.name);
        return matchingUpgrade !== null;
      });
      if (shipWithMatchingUpgrade !== null) {
        return false;
      }

      let matchingSquadron = this.squadrons.find((s: Squadron) => s.name === upgrade.name);
      if (matchingSquadron !== null) {
        return false;
      }
    }

    
    return true;
  }

}
