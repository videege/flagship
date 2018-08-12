import { Faction } from "./faction";
import { UpgradeType } from "./upgradeType";
import { Ship } from "./ship";
import { Upgrade } from "./upgrade";

export class UpgradeSlot {
    public upgrade: Upgrade;
    public isEnabled: boolean;

    isFilled(): boolean {
      return this.isEnabled && this.upgrade != null;
    }

    constructor(public type: UpgradeType) {
      this.isEnabled = true;
      this.upgrade = null;
    }

    equipUpgrade(upgrade: Upgrade, ship: Ship): void {
      this.upgrade = upgrade;
      this.upgrade.onEquip(ship);
    }
}
