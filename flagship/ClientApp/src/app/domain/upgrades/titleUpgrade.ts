import { Upgrade } from "../upgrade";
import { UpgradeType } from "../upgradeType";
import { Faction } from "../faction";
import { ShipClass } from "../shipClass";

export class TitleUpgrade extends Upgrade {
    constructor(name: string, type: UpgradeType, faction: Faction, text: string, modification: boolean,
        points: number, unique: boolean, public shipClass: ShipClass) {
        super(name, type, faction, text, modification, points, unique);
    }
}