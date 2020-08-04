import { Faction } from './faction';
import { UpgradeType } from './upgradeType';
import { Ship } from './ship';
import { UpgradeSlot } from './upgradeSlot';
import { Size } from './size';
import { Resources } from './resource';

export enum UpgradeClass {
  Normal,
  Commander,
  SlotGranting
}

export interface UpgradeData {
  id: number;
  name: string;
  type: UpgradeType;
  faction: Faction;
  text: string;
  modification: boolean;
  points: number;
  unique: boolean;
  upgradeClass: UpgradeClass,
  sizeRestriction?: Size[],
  shipRestriction?: number[],
  traitRestriction?: string[],
  startingResources?: Resources,
  resupplyResources?: Resources
}

export interface SlotGrantingUpgradeData extends UpgradeData {
  grantedType: UpgradeType;
  canEquipToShipWithMatchingSlot: boolean;
}

export class Upgrade implements UpgradeData {
  upgradeClass: UpgradeClass;

  constructor(public id: number, public name: string, public type: UpgradeType, 
    public faction: Faction, public text: string, public modification: boolean,
    public points: number, public unique: boolean, public sizeRestriction: Size[] = null,
    public shipRestriction: number[] = null, public traitRestriction: string[] = null,
    public startingResources: Resources = null, public resupplyResources: Resources = null) {

    }

  getText(): string { 
    return this.text;
  }
  
  canEquipToShip(ship: Ship): boolean {
    // Can't equip if wrong faction
    if (this.faction !== ship.faction && this.faction !== Faction.Any) {
      return false;
    }

    if (this.shipRestriction && !this.shipRestriction.includes(ship.id)) {
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

    // Can't equip if this card has a size restriction and the ship size doesn't match
    if (this.sizeRestriction) {
      let matchingSize = this.sizeRestriction.find(x => x === ship.size);
      if (!matchingSize) {
        return false;
      }
    }

    // Can't equip to ships not matching the trait restriction(s), if any
    if (this.traitRestriction) {
      if (!ship.traits) { 
        return false;
      }
      for (const trait of this.traitRestriction) {
        let matchingTrait = ship.traits.find(t => t === trait);
        if (!matchingTrait) {
          return false;
        }
      }
    }
    
    return true;
  }

  onUpgradeEquipped(ship: Ship): void {
    
  }

  onUpgradeUnequipped(ship: Ship): void {

  }
  
}
