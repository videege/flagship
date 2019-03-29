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

  currentPointsFromShips(): number {
    let points = 0;
    for (let i = 0; i < this.ships.length; i++) {
      points += this.ships[i].currentPoints();
    }
    return points;
  }

  currentPointsFromSquadrons(): number {
    let points = 0;
    for (let i = 0; i < this.squadrons.length; i++) {
      points += this.squadrons[i].points;
    }
    return points;
  }

  currentPoints(): number {
    return this.currentPointsFromShips() + this.currentPointsFromSquadrons();
  }

  getCommanderName(): string {
    let commander = "None";
    for (const ship of this.ships) {
      let commanderSlot = ship.upgradeSlots.find((u: UpgradeSlot) => {
        return u.isEnabled && u.isFilled() && u.type === UpgradeType.Commander;
      });
      if (commanderSlot != null) {
        commander = commanderSlot.upgrade.name;
        break;
      }
    }
    return commander;
  }

  canEquipUpgrade(ship: Ship, upgrade: Upgrade): boolean {
    // Can't equip if unique and there is already a upgrade/squadron with
    // the same name
    if (upgrade.unique) {
      let shipWithMatchingUpgrade = this.ships.find((s: Ship) => {
        let matchingUpgrade = s.upgradeSlots.find((u: UpgradeSlot) => u.isEnabled && u.isFilled() && u.upgrade.name === upgrade.name);
        return matchingUpgrade !== null;
      });
      if (shipWithMatchingUpgrade) {
        return false;
      }

      let matchingSquadron = this.squadrons.find((s: Squadron) => s.name === upgrade.name);
      if (matchingSquadron) {
        return false;
      }
    }
    return true;
  }

  getAvailableShipId(): string {
    while (true) {
      const id = Math.floor(Math.random() * 1000).toString();
      let matchingId = this.ships.find(s => s.id === id);
      if (!matchingId) {
        return id;
      }
    }
  }

  deleteShip(ship: Ship): void {
    let idx = this.ships.indexOf(ship);
    if (idx >= 0) {
      this.ships.splice(idx, 1);
      
    }
  }
}
