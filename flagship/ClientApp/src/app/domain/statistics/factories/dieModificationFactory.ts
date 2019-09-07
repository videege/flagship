import { IDieModification } from '../dieModification';
import { LeadingShotsModification } from '../rerolls/leadingShots';
import { RerollStrategy } from '../rerolls/rerollStrategy';
import { Ship } from '../../ship';
import { AdditionModification, AdditionRestriction } from '../additions/additionModification';
import { FiringArc } from '../firingArc';

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
        let concentrate: IDieModification[] = [ this.concentrateFireModification ];
        // Find all upgrades attached to this ship 
        let mods = ship.upgradeSlots.filter(x => x.isEnabled && x.isFilled()).map(x => x.upgrade.id)
            .filter(x => this.hasDieModification(x)).map(x => this.instantiateDieModification(x));
        return concentrate.concat(mods);
        //todo: search fleet for upgrades that affect multiple ships (e.g., Darth Vader)
    }

    private concentrateFireModification = new AdditionModification('Concentrate Fire Dial', 1, AdditionRestriction.Existing);
    constructor() {
        this.data = [
            // Die Additions
            { id: 12001, factory: () => { return new AdditionModification('Enhanced Armament', 1, AdditionRestriction.Red,
                FiringArc.Left | FiringArc.Right )}},
            { id: 12005, factory: () => { return new AdditionModification('Quad Battery Turrets', 1, AdditionRestriction.Blue)}},
            { id: 12007, factory: () => { return new AdditionModification('Slaved Turrets', 1, AdditionRestriction.Red)}},
            { id: 12008, factory: () => { return new AdditionModification('Spinal Armament', 1, AdditionRestriction.Red,
                FiringArc.Front | FiringArc.Rear )}},
            // Rerolls
            { id: 3001, factory: () => { return new LeadingShotsModification(RerollStrategy.Blanks); } }
        ];
    }
}