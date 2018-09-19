import { Upgrade } from "../upgrade";
import { UpgradeType } from "../upgradeType";
import { Faction } from "../faction";

export class UpgradeFactory {
    upgrades: { [id: number]: () => Upgrade };

    instantiateUpgrade(id: number): Upgrade {
        const upgrade = this.upgrades[id]();
        return upgrade;
    }

    constructor() {
        this.upgrades = {
            1000: () => new Upgrade(1000, 'Grand Moff Tarkin', UpgradeType.Commander, Faction.Empire,
            'Something something something', false, 38, true),
            2000: () => new Upgrade(2000, 'Avenger', UpgradeType.Title, Faction.Empire,
            'Something something something', false, 5, true),
            3000: () => new Upgrade(3000, 'Heavy Ion Emplacements', UpgradeType.IonCannons, Faction.Empire,
            'Blah blah blah', false, 9, false)
        }
    }
}