import { Upgrade } from "../upgrade";
import { UpgradeType } from "../upgradeType";
import { Faction } from "../faction";

export class CustomCommanderUpgrade extends Upgrade {
    constructor(name: string, faction: Faction) {
        super(-1, name, UpgradeType.CustomCommander, faction, null, false, 0, true, null);
    }
}
