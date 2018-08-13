import { Faction } from "./faction";
import { Ship } from "./ship";
import { Squadron } from "./squadron";
import { Upgrade } from "./upgrade";
import { UpgradeSlot } from "./upgradeSlot";
import { UpgradeType } from "./upgradeType";

export class Fleet {
  id: number;
  name: string;
  author: string;
  faction: Faction;
  pointLimit: number;

  ships: Ship[];
  squadrons: Squadron[];

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

  onUpgradeEquipped(ship: Ship, upgrade: Upgrade): void {

    // TODO: move this logic to a commander-type upgrade subclass
    // If the upgrade was a commander, disable the commander slot on all other ships
    if (upgrade.type === UpgradeType.Commander) {
      for (const shipInFleet of this.ships) {
        if (shipInFleet !== ship) {
          let commanderSlot = shipInFleet.upgradeSlots.find((u: UpgradeSlot) => u.type === UpgradeType.Commander);
          if (commanderSlot !== null) {
            commanderSlot.isEnabled = false;
          }
        }
      }
    }
  }

}
