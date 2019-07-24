import { IDieModification } from '../dieModification';
import { LeadingShotsModification } from '../rerolls/leadingShots';
import { RerollStrategy } from '../rerolls/rerollStrategy';
import { Ship } from '../../ship';

export enum ModificationClass {
    GenericReroll,
    LeadingShots
}

export interface IModificationData {
    id: number;
    factory(): IDieModification;
}

export class DieModificationFactory {
    data: IModificationData[];

    hasDieModification(upgradeId: number): boolean {
        let idx = this.data.findIndex(x => x.id === upgradeId);
        return idx >= 0;
    }

    instantiateDieModification(id: number): IDieModification {
        let data = this.data.find(x => x.id === id);
        if (!data)
            return null;

        return data.factory();
    }

    getModificationsForShip(ship: Ship): IDieModification[] {
        // Find all upgrades attached to this ship 
        let mods = ship.upgradeSlots.filter(x => x.isEnabled && x.isFilled()).map(x => x.upgrade.id)
            .filter(x => this.hasDieModification(x)).map(x => this.instantiateDieModification(x));
        return mods;
        //todo: search fleet for upgrades that affect multiple ships (e.g., Darth Vader)
    }

    constructor() {
        this.data = [
            { id: 3001, factory: () => { return new LeadingShotsModification(RerollStrategy.Blanks); } }
        ];
    }
}