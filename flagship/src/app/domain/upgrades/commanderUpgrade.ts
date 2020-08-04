import { Upgrade } from "../game/upgrade";
import { UpgradeType } from "../game/upgradeType";
import { Faction } from "../game/faction";
import { Ship } from "../game/ship";
import { UpgradeSlot } from "../game/upgradeSlot";
import { Size } from "../game/size";
import { Resources } from '../game/resource';
import { start } from 'repl';

export class CommanderUpgrade extends Upgrade {
    constructor(id: number, name: string, faction: Faction, text: string, modification: boolean,
        points: number, sizeRestriction: Size[] = null, shipRestriction: number[] = null,
        traitRestriction: string[] = null, startingResources: Resources = null, resupplyResources: Resources = null) {
        super(id, name, UpgradeType.Commander, faction, text, modification, points, true, sizeRestriction,
            shipRestriction, traitRestriction, startingResources, resupplyResources);
    }

    canEquipToShip(ship: Ship): boolean {
        if (!super.canEquipToShip(ship)) {
            return false;
        }

        // Can't equip commander if this ship is a flotilla
        if (ship.size === Size.SmallFlotilla) {
            return false;
        }

        return true;
    }

    onUpgradeUnequipped(ship: Ship) {
        super.onUpgradeUnequipped(ship);
        for (const shipInFleet of ship.fleet.ships) {
            if (shipInFleet !== ship) {
                let commanderSlot = shipInFleet.upgradeSlots.find((u: UpgradeSlot) => u.type === UpgradeType.Commander);
                if (commanderSlot) {
                    commanderSlot.isEnabled = true;
                }
            }
        }
    }

    onUpgradeEquipped(ship: Ship) {
        super.onUpgradeEquipped(ship);
        for (const shipInFleet of ship.fleet.ships) {
            if (shipInFleet !== ship) {
                let commanderSlot = shipInFleet.upgradeSlots.find((u: UpgradeSlot) => u.type === UpgradeType.Commander);
                if (commanderSlot) {
                    commanderSlot.isEnabled = false;
                }
            }
        }
    }
}
