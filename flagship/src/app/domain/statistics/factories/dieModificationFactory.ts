import { IDieModification } from '../dieModification';
import { LeadingShotsModification } from '../rerolls/leadingShots';
import { RerollStrategy } from '../rerolls/rerollStrategy';
import { Ship } from '../../game/ship';
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
        let concentrate: IDieModification[] = [this.concentrateFireModification];
        // Find all upgrades attached to this ship 
        let shipMods = ship.upgradeSlots.filter(x => x.isEnabled && x.isFilled()).map(x => x.upgrade.id)
            .filter(x => this.hasDieModification(x)).map(x => this.instantiateDieModification(x));
        let finalMods = concentrate.concat(shipMods);
        //todo: search fleet for upgrades that affect multiple ships (e.g., Darth Vader)
        finalMods = finalMods.sort((a, b) => {
            if (a.order > b.order) return 1;
            if (a.order < b.order) return -1;
            return 0;
        })
        return finalMods;
    }

    private orders = {
        armamentAddition: 0,
        addition: 10,
        existingAddition: 15,
        reroll: 20,
        expensiveReroll: 25
    };

    private concentrateFireModification = new AdditionModification('Concentrate Fire Dial', 1,
        true, this.orders.existingAddition, AdditionRestriction.Existing);
    constructor() {
        this.concentrateFireModification.enabled = false;
        this.data = [
            // Die Additions
            { id: 12001, factory: () => { return new AdditionModification('Enhanced Armament', 1,
                        false, this.orders.armamentAddition, AdditionRestriction.Red, FiringArc.Left | FiringArc.Right) } },
            { id: 12005, factory: () => { return new AdditionModification('Quad Battery Turrets', 1,
                        true, this.orders.addition, AdditionRestriction.Blue) } },
            { id: 12007, factory: () => { return new AdditionModification('Slaved Turrets', 1,
                true, this.orders.addition, AdditionRestriction.Red) } },
            { id: 12008, factory: () => { return new AdditionModification('Spinal Armament', 1, 
                false, this.orders.armamentAddition, AdditionRestriction.Red, FiringArc.Front | FiringArc.Rear) } },
            // Rerolls
            { id: 3001, factory: () => { return new LeadingShotsModification(RerollStrategy.Blanks, this.orders.expensiveReroll); } }
        ];
    }
}
