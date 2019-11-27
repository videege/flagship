import { IDieModification, ModificationType } from '../dieModification';
import { LeadingShotsModification } from '../rerolls/leadingShots';
import { RerollStrategy } from '../rerolls/rerollStrategy';
import { Ship } from '../../game/ship';
import { AdditionModification, AdditionRestriction } from '../additions/additionModification';
import { FiringArc } from '../firingArc';
import { RerollModification } from '../rerolls/rerollModification';
import { GenericRerollModification } from '../rerolls/genericRerollModification';
import { DieType } from '../dieRoll';
import { Range } from '../attackPool';

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

    instantiateDieModifications(id: number): IDieModification[] {
        let data = this.data.filter(x => x.id === id);
        if (!data || !data.length)
            return [];

        return data.map(x => x.factory());
    }

    getModificationsForShip(ship: Ship): IDieModification[] {
        let concentrate: IDieModification[] = [this.concentrateFireModification, this.concentrateFireTokenReroll];
        // Find all upgrades attached to this ship 
        let shipMods = ship.upgradeSlots.filter(x => x.isEnabled && x.isFilled()).map(x => x.upgrade.id)
            .filter(x => this.hasDieModification(x)).map(x => this.instantiateDieModifications(x));
        
        let finalMods = concentrate.concat([].concat(...shipMods));
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
    private concentrateFireTokenReroll = new GenericRerollModification(RerollStrategy.Blanks,
        'Concentrate Fire Token', this.orders.reroll, 1, DieType.Any);
    constructor() {
        this.concentrateFireModification.enabled = false;
        this.concentrateFireTokenReroll.enabled = false;
        this.data = [
            // armament additions
            {
                id: 12001, factory: () => {
                    return new AdditionModification('Enhanced Armament', 1,
                        false, this.orders.armamentAddition, AdditionRestriction.Red, FiringArc.Left | FiringArc.Right)
                }
            },
            {
                id: 12005, factory: () => {
                    return new AdditionModification('Quad Battery Turrets', 1,
                        true, this.orders.addition, AdditionRestriction.Blue)
                }
            },
            {
                id: 12007, factory: () => {
                    return new AdditionModification('Slaved Turrets', 1,
                        true, this.orders.addition, AdditionRestriction.Red)
                }
            },
            {
                id: 12008, factory: () => {
                    return new AdditionModification('Spinal Armament', 1,
                        false, this.orders.armamentAddition, AdditionRestriction.Red, FiringArc.Front | FiringArc.Rear)
                }
            },
            // pool additions
            {
                id: 2022, factory: () => {
                    return new AdditionModification('Ravager (Concentrate Token)', 1,
                        true, this.orders.addition, AdditionRestriction.Existing)
                }
            },
            {
                id: 1012, factory: () => {
                    return new AdditionModification('General Romodi', 1,
                        true, this.orders.addition, AdditionRestriction.Red)
                }
            },
            {
                id: 1500, factory: () => {
                    return new AdditionModification('Admiral Ackbar', 2,
                        true, this.orders.addition, AdditionRestriction.Red, FiringArc.Left | FiringArc.Right)
                }
            },
            {
                id: 2516, factory: () => {
                    return new AdditionModification('Defiance', 1,
                        true, this.orders.addition, AdditionRestriction.Any)
                }
            },
            {
                id: 7003, factory: () => {
                    return new AdditionModification('External Racks', 2,
                        true, this.orders.addition, AdditionRestriction.Black, null,
                        Range.Close)
                }
            },
            //TODO; devastator (variable # up to 5)
            //todo: Quad turbolaser cannons (P(at least one red accuracy) split into same pool, other pool with an additional red acc)

            // Rerolls
            { id: 3001, factory: () => { return new LeadingShotsModification(RerollStrategy.Blanks, this.orders.expensiveReroll); } },
            {
                id: 1009, factory: () => {
                    return new GenericRerollModification(RerollStrategy.Blanks,
                        'Darth Vader (Commander)', this.orders.reroll, 0, DieType.Any);
                }
            },
            {
                id: 2510, factory: () => {
                    return new GenericRerollModification(RerollStrategy.Blanks,
                        'Task Force Organa', this.orders.reroll, 2, DieType.Any);
                }
            },
            {
                id: 4001, factory: () => {
                    return new GenericRerollModification(RerollStrategy.Blanks,
                        'Ordnance Experts', this.orders.reroll, 0, DieType.Black);
                }
            },
            //todo: veteran gunners custom class (total reroll if p(x) < avg?)
            //todo: caitken and shollan (variable reroll of one color)
            //todo: dual turbolaser turrets (red die replacement fresh roll)
            {
                id: 10212, factory: () => {
                    return new GenericRerollModification(RerollStrategy.Blanks,
                        'Director Krennic (Dial)', this.orders.reroll, 0, DieType.Red,
                        Range.Long);
                }
            },
            {
                id: 10212, factory: () => {
                    return new GenericRerollModification(RerollStrategy.Blanks,
                        'Director Krennic (Token)', this.orders.reroll, 2, DieType.Red,
                        Range.Long);
                }
            },
            {
                id: 12004, factory: () => {
                    return new GenericRerollModification(RerollStrategy.Blanks,
                        'Linked Turbolaser Turrets', this.orders.reroll, 1, DieType.Red);
                }
            },
        ];
    }
}
