import { IDieModification, ModificationType } from '../dieModification';
import { LeadingShotsModification } from '../rerolls/leadingShots';
import { RerollStrategy } from '../rerolls/rerollStrategy';
import { Ship } from '../../game/ship';
import { AdditionModification, AdditionRestriction } from '../additions/additionModification';
import { FiringArc } from '../firingArc';
import { VeteranGunnersModification } from '../rerolls/veteranGunners';
import { GenericRerollModification } from '../rerolls/genericRerollModification';
import { DieType } from '../dieRoll';
import { Range } from '../attackPool';
import { ReplacementModification } from '../replacements/replacementModification';
import { QuadTurbolaserCannonsModification } from '../additions/quadTurbolaserCannons';
import { GenericModification, FaceRestriction } from '../modifications/genericModification';

export enum ModificationClass {
    GenericReroll,
    LeadingShots
}

export interface IEffectData {
    id: number;
    factory(): IDieModification;
}

export class AttackEffectFactory {
    shipEffectData: IEffectData[];
    squadronEffectData: IEffectData[];

    hasShipEffect(upgradeId: number): boolean {
        let idx = this.shipEffectData.findIndex(x => x.id === upgradeId);
        return idx >= 0;
    }

    hasSquadronEffect(squadronId: number): boolean {
        let idx = this.squadronEffectData.findIndex(x => x.id === squadronId);
        return idx >= 0;
    }

    instantiateEffect(id: number, isShipEffect: boolean): IDieModification[] {
        let data = (isShipEffect ? this.shipEffectData : this.squadronEffectData)
            .filter(x => x.id === id);
        if (!data || !data.length)
            return [];

        return data.map(x => x.factory());
    }

    getModificationsForShip(ship: Ship): IDieModification[] {
        let concentrate: IDieModification[] = [this.concentrateFireModification, this.concentrateFireTokenReroll];
        // Find all upgrades attached to this ship 
        let shipMods = ship.upgradeSlots.filter(x => x.isEnabled && x.isFilled()).map(x => x.upgrade.id)
            .filter(x => this.hasShipEffect(x)).map(x => this.instantiateEffect(x, true));
        let squadronMods = ship.fleet.squadrons.map(x => x.id).filter((value, index, self) => {
            return self.indexOf(value) === index;
        }).filter(x => this.hasSquadronEffect(x)).map(x => this.instantiateEffect(x, false));

        let finalMods = concentrate.concat([].concat(...shipMods)).concat([].concat(...squadronMods));
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
        replacement: 5,
        addition: 10,
        existingAddition: 15,
        reroll: 20,
        expensiveReroll: 25,
        modification: 30
    };

    private concentrateFireModification = new AdditionModification('Concentrate Fire Dial', 1,
        true, this.orders.existingAddition, AdditionRestriction.Existing);
    private concentrateFireTokenReroll = new GenericRerollModification(RerollStrategy.Blanks,
        'Concentrate Fire Token', this.orders.reroll, 1, DieType.Any);
    constructor() {
        this.concentrateFireModification.enabled = false;
        this.concentrateFireTokenReroll.enabled = false;
        this.squadronEffectData = [
            {
                id: 7, factory: () => {
                    return new GenericModification('Captain Jonus', this.orders.modification,
                    true, DieType.Any, [],
                    [FaceRestriction.Accuracy], 0, [], [DieType.Red, DieType.Blue, DieType.Black], FaceRestriction.Accuracy)
                }
            },
            {
                id: 116, factory: () => {
                    return new GenericModification('Malee Hurra', this.orders.modification,
                    true, DieType.Any, [],
                    [FaceRestriction.Crit], 1, [DieType.Red, DieType.Blue, DieType.Black], 
                    [DieType.Black, DieType.Red, DieType.Blue], FaceRestriction.Crit)
                }
            },
        ];
        this.shipEffectData = [
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
            // replacement
            {
                id: 1502, factory: () => {
                    return new ReplacementModification('Commander Sato', 2, false, this.orders.replacement)
                }
            },
            // pool additions
            {
                id: 2022, factory: () => {
                    return new AdditionModification('Ravager (Concentrate Token)', 1,
                        true, this.orders.existingAddition, AdditionRestriction.Existing)
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
            {
                id: 12006, factory: () => {
                    return new QuadTurbolaserCannonsModification(this.orders.modification + 1)
                }
            },
            //TODO; devastator (variable # up to 5)
            //todo: Quad turbolaser cannons (P(at least one red accuracy) split into same pool, other pool with an additional red acc)

            // Rerolls
            { id: 3001, factory: () => { return new LeadingShotsModification(RerollStrategy.Blanks, this.orders.expensiveReroll); } },
            { id: 4006, factory: () => { return new VeteranGunnersModification(RerollStrategy.Blanks, this.orders.expensiveReroll); } },
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
            // Modifications
            {
                id: 12002, factory: () => {
                    return new GenericModification('H9 Turbolasers', this.orders.modification,
                    true, DieType.Any, [FaceRestriction.Hit, FaceRestriction.Crit],
                    [FaceRestriction.Accuracy], 0, [], [DieType.Red, DieType.Blue, DieType.Black], FaceRestriction.Accuracy)
                }
            },
            {
                id: 12009, factory: () => {
                    return new GenericModification('Turbolaser Reroute Circuits', this.orders.modification,
                    true, DieType.Red, [],
                    [FaceRestriction.DoubleHit, FaceRestriction.Crit], 0, [], 
                    [DieType.Red, DieType.Blue, DieType.Black], FaceRestriction.DoubleHit)
                }
            },
            {
                id: 1007, factory: () => {
                    return new GenericModification('Admiral Screed', this.orders.modification,
                    true, DieType.Any, [],
                    [FaceRestriction.Crit], 1, [DieType.Red, DieType.Black, DieType.Blue], 
                    [DieType.Black, DieType.Red, DieType.Blue], FaceRestriction.Crit)
                }
            },
            {
                id: 4005, factory: () => {
                    return new GenericModification('Sensor Team', this.orders.modification,
                    true, DieType.Any, [],
                    [FaceRestriction.Accuracy], 1, [DieType.Red, DieType.Black, DieType.Blue], 
                    [DieType.Red, DieType.Blue, DieType.Black], FaceRestriction.Accuracy)
                }
            },
            {
                id: 2517, factory: () => {
                    return new GenericModification('Home One', this.orders.modification,
                    true, DieType.Any, [],
                    [FaceRestriction.Accuracy], 0, [], [DieType.Red, DieType.Blue, DieType.Black], FaceRestriction.Accuracy)
                }
            },
            {
                id: 4007, factory: () => {
                    return new GenericModification('Weapons Battery Techs', this.orders.modification,
                    true, DieType.Any, [FaceRestriction.Accuracy],
                    [FaceRestriction.Crit], 0, [], [DieType.Blue, DieType.Red, DieType.Black], FaceRestriction.Crit)
                }
            },
            {
                id: 8002, factory: () => {
                    return new GenericModification('Intensify Firepower!', this.orders.modification,
                    true, DieType.Any, [],
                    [FaceRestriction.Hit], 0, [], [DieType.Red, DieType.Black, DieType.Blue], FaceRestriction.Hit)
                }
            },
        ];
    }
}
