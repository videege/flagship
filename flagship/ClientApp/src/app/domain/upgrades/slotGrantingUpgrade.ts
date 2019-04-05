import { Upgrade, SlotGrantingUpgradeData } from "../upgrade";
import { UpgradeType } from "../upgradeType";
import { Faction } from "../faction";
import { Ship } from "../ship";
import { UpgradeSlot } from "../upgradeSlot";

export class SlotGrantingUpgrade extends Upgrade implements SlotGrantingUpgradeData {
    constructor(id: number, name: string, type: UpgradeType, faction: Faction, text: string, modification: boolean,
        points: number, unique: boolean, public grantedType: UpgradeType) {
        super(id, name, type, faction, text, modification, points, unique);
    }
 
    canEquipToShip(ship: Ship): boolean {
        if (!super.canEquipToShip(ship)) {
            return false;
        }

        // Can't equip if the ship already has a slot of the granted type
        const matchingUpgrade = ship.upgradeSlots.find((u: UpgradeSlot) => u.isEnabled && u.type === this.grantedType);
        if (matchingUpgrade) {
            return false;
        }

        return true;
    }

    onUpgradeEquipped(ship: Ship) {
        super.onUpgradeEquipped(ship);

        let slot = new UpgradeSlot(this.grantedType);
        ship.upgradeSlots.push(slot);
    }

    onUpgradeUnequipped(ship: Ship) {
        super.onUpgradeUnequipped(ship);
        let matchingUpgrade = ship.upgradeSlots.find((u: UpgradeSlot) => u.isEnabled && u.type === this.grantedType);
        ship.upgradeSlots.splice(ship.upgradeSlots.indexOf(matchingUpgrade, 1));
    }
}