import { Upgrade } from "../game/upgrade";
import { UpgradeType } from "../game/upgradeType";
import { Faction } from "../game/faction";
import { CustomCommander } from '../campaign/customCommander';
import { BehaviorSubject } from 'rxjs';
import { UpgradeSlot } from '../game/upgradeSlot';
import { Ship } from '../game/ship';

export class CustomCommanderUpgrade extends Upgrade {
    constructor(private commander: CustomCommander, faction: Faction) {
        super(-1, commander.name, UpgradeType.CustomCommander, faction, null, false, 0, true, null);
        this.text$ = new BehaviorSubject<string>(this.commander.getText());
        this.commander.subject.subscribe(() => {
            this.text$.next(this.commander.getText());
        })

    }

    public text$: BehaviorSubject<string>;

    onUpgradeEquipped(ship: Ship) {
        super.onUpgradeEquipped(ship);

        if (this.commander.hasCommandStaff()) {
            let slot = new UpgradeSlot(UpgradeType.Officer);
            ship.upgradeSlots.push(slot);
        }
    }

    onUpgradeUnequipped(ship: Ship) {
        super.onUpgradeUnequipped(ship);
        if (this.commander.hasCommandStaff()) {
            let matchingUpgrade = ship.upgradeSlots.find((u: UpgradeSlot) => u.isEnabled && 
                u.type === UpgradeType.Officer);
            if (matchingUpgrade.isFilled()) {
                ship.unequipUpgrade(matchingUpgrade);
            }
            ship.upgradeSlots.splice(ship.upgradeSlots.indexOf(matchingUpgrade, 1));
        }
    }
}
