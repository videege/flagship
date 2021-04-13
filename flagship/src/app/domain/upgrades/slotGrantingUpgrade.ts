import { Upgrade, SlotGrantingUpgradeData } from "../game/upgrade";
import { UpgradeType } from "../game/upgradeType";
import { Faction } from "../game/faction";
import { Ship } from "../game/ship";
import { UpgradeSlot } from "../game/upgradeSlot";
import { Size } from '../game/size';
import { Resources } from '../game/resource';

export class SlotGrantingUpgrade extends Upgrade implements SlotGrantingUpgradeData {
    constructor(id: number, name: string, type: UpgradeType, faction: Faction | Faction[], text: string, modification: boolean,
        points: number, unique: boolean, public grantedType: UpgradeType, 
        public canEquipToShipWithMatchingSlot: boolean = false, sizeRestriction: Size[] = null,
        shipRestriction: number[] = null, traitRestriction: string[] = null,
        startingResources: Resources = null, resupplyResources: Resources = null,
        public removedTypes: UpgradeType[] = null) {
        super(id, name, type, faction, text, modification, points, unique, 
            sizeRestriction, shipRestriction, traitRestriction,
            startingResources, resupplyResources);
    }
 
    canEquipToShip(ship: Ship): boolean {
        if (!super.canEquipToShip(ship)) {
            return false;
        }

        // Slot granting upgrades can never be equipped to huge ships
        if (ship.size === Size.Huge) {
            return false;
        }
        // Can't equip if the ship already has a slot of the granted type
        
        const matchingUpgrade = ship.upgradeSlots.find((u: UpgradeSlot) => u.isEnabled && u.type === this.grantedType);
        if (matchingUpgrade) {
            // Handle Minister Tua special case here
            if (this.id === 10217 && (ship.size === Size.SmallFlotilla || ship.size === Size.Small)) {
                // minister tua can equip to small ships even if they have a defensive retrofit
                return true;
            }
            return this.canEquipToShipWithMatchingSlot;
        }

        return true;
    }

    onUpgradeEquipped(ship: Ship) {
        super.onUpgradeEquipped(ship);

        const slot = new UpgradeSlot(this.grantedType);
        ship.upgradeSlots.push(slot);

        if (this.removedTypes) {
            for (const type of this.removedTypes) {
                const matchingSlots = ship.upgradeSlots.filter(x => x.type === type);
                for (const matchingSlot of matchingSlots) {
                    if (matchingSlot.isFilled()) {
                        matchingSlot.unequipUpgrade(ship);
                    }
                    matchingSlot.isEnabled = false;
                }
            }
        }
    }

    onUpgradeUnequipped(ship: Ship) {
        super.onUpgradeUnequipped(ship);
        const matchingUpgrade = ship.upgradeSlots.find((u: UpgradeSlot) => u.isEnabled && u.type === this.grantedType);
        ship.upgradeSlots.splice(ship.upgradeSlots.indexOf(matchingUpgrade, 1));

        if (this.removedTypes) {
            for (const type of this.removedTypes) {
                const matchingSlots = ship.upgradeSlots.filter(x => x.type === type);
                for (const matchingSlot of matchingSlots) {
                    matchingSlot.isEnabled = true;
                }
            }
        }
    }
}
