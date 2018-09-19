import { Faction } from './faction';
import { UpgradeType } from './upgradeType';
import { Ship } from './ship';
import { UpgradeSlot } from './upgradeSlot';

export class Upgrade {
  constructor(public id: number, public name: string, public type: UpgradeType, 
    public faction: Faction, public text: string, public modification: boolean,
    public points: number, public unique: boolean) {

    }
  
  canEquipToShip(ship: Ship): boolean {
    // Can't equip if wrong faction
    if (this.faction !== ship.faction && this.faction !== Faction.Any) {
      return false;
    }

    // Can't equip if there is no available slot of the correct type
    const availableSlot = ship.upgradeSlots.find((u: UpgradeSlot) => u.isEnabled && u.type === this.type && !u.isFilled());
    if (!availableSlot) {
      return false;
    }

    // Can't equip if this card (same name) is already equipped
    const matchingUpgrade = ship.upgradeSlots.find((u: UpgradeSlot) => u.isEnabled && u.isFilled() && u.upgrade.name === this.name);
    if (matchingUpgrade) {
      return false;
    }
    
    return true;
  }

  onUpgradeEquipped(ship: Ship): void {
    
  }

  onUpgradeUnequipped(ship: Ship): void {

  }
  
}