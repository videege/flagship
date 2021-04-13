import { Upgrade, IgnitionGrantingUpgradeData, UpgradeClass } from "../game/upgrade";
import { UpgradeType } from "../game/upgradeType";
import { Faction } from "../game/faction";
import { Ship } from "../game/ship";
import { Size } from '../game/size';
import { Resources } from '../game/resource';
import { Armament } from "../game/armament";

export class IgnitionGrantingUpgrade extends Upgrade implements IgnitionGrantingUpgradeData {
    constructor(id: number, name: string, type: UpgradeType, faction: Faction | Faction[], text: string, modification: boolean,
        points: number, unique: boolean, sizeRestriction: Size[] = null,
        shipRestriction: number[] = null, traitRestriction: string[] = null,
        startingResources: Resources = null, resupplyResources: Resources = null,
        public ignitionArmament: Armament) {
        super(id, name, type, faction, text, modification, points, unique, 
            sizeRestriction, shipRestriction, traitRestriction,
            startingResources, resupplyResources);
        this.upgradeClass = UpgradeClass.IgnitionGranting;
    }
 
    canEquipToShip(ship: Ship): boolean {
        return super.canEquipToShip(ship);
    }

    onUpgradeEquipped(ship: Ship) {
        super.onUpgradeEquipped(ship);
    }

    onUpgradeUnequipped(ship: Ship) {
        super.onUpgradeUnequipped(ship);
    }
}
