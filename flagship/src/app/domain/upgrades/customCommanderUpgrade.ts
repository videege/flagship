import { Upgrade } from "../game/upgrade";
import { UpgradeType } from "../game/upgradeType";
import { Faction } from "../game/faction";
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
