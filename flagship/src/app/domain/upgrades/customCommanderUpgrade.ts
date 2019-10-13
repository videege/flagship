import { Upgrade } from "../upgrade";
import { UpgradeType } from "../upgradeType";
import { Faction } from "../faction";
import { CustomCommander } from '../campaign/customCommander';
import { BehaviorSubject } from 'rxjs';

export class CustomCommanderUpgrade extends Upgrade {
    constructor(private commander: CustomCommander, faction: Faction) {
        super(-1, commander.name, UpgradeType.CustomCommander, faction, null, false, 0, true, null);
        this.text$ = new BehaviorSubject<string>(this.commander.getText());
        this.commander.subject.subscribe(() => {
            this.text$.next(this.commander.getText());
        })

    }

    public text$: BehaviorSubject<string>; 
}
