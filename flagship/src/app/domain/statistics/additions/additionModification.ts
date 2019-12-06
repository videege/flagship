import { IDieModification, ModificationType, ICalculatedProbabilities } from '../dieModification';
import { AttachSession } from 'protractor/built/driverProviders';
import { AttackPool, IAttackPool, Range } from '../attackPool';
import { DieType, DieRoll } from '../dieRoll';
import { FiringArc } from '../firingArc';

// effects
// ackbar 2 red die
// kallus 1 of any
// draven 1 of any
// ex racks 2 black
// devastator 1 blue for each discarded defense token
// ravager 1 of existing
// paragon 1 black
// defiance 1 of any
// dual turbolaser add 1 red, remove a die
// ltt add 2 of any
// qbt add 1 blue
// qtc add 1 red set to accuracy if there is one red set to accuracy
// slaved turrets add 1 red

export enum AdditionRestriction {
    Red,
    Blue,
    Black,
    Any,
    Existing
}

export class AdditionModification implements IDieModification {
    public enabled = true;

    private defaultPreferences: DieType[] = [DieType.Black, DieType.Blue, DieType.Red];
    constructor(public name: string, public dieCount: number, 
        public orderable: boolean,
        public order: number,
        public restriction: AdditionRestriction,
        public firingArcRestriction: FiringArc = null,
        public rangeRestriction: Range = null,
        public preferredTypes: DieType[] = null,
        public type: ModificationType = ModificationType.Addition,
        public isVariableAmount: boolean = false,
        public currentDieCount: number = null) {
        if (!this.preferredTypes || !this.preferredTypes.length) {
            this.preferredTypes = this.defaultPreferences;
        }
    }

    public calculatedProbabilities: ICalculatedProbabilities;
    setCalculatedProbabilities(probabilities: ICalculatedProbabilities) {
        this.calculatedProbabilities = probabilities;
    }
    
    probabilityOfEffect(pool: IAttackPool): number {
        return 1;
    }

    canBeApplied(pool: AttackPool): boolean {
        // In general these effects are assumed to be always able to be used
        // if they are included in the calculation.
        if (this.firingArcRestriction && (pool.firingArc & this.firingArcRestriction) == 0) {
            return false;
        }
        if (this.rangeRestriction && (pool.range & this.rangeRestriction) == 0) {
            return false;
        }
        return this.enabled;
    }

    private nullDieFactory: () => DieRoll = () => { return null; }
    private getDieFactoryForDieType(dieType: DieType): () => DieRoll {
        if (dieType == DieType.Red) {
            return () => { return DieRoll.RedDieRoll() }
        }
        else if (dieType == DieType.Blue) {
            return () => { return DieRoll.BlueDieRoll() }
        }
        else if (dieType == DieType.Black) {
            return () => { return DieRoll.BlackDieRoll() }
        }
        return this.nullDieFactory;
    }

    private getDieFactory(p: AttackPool): () => DieRoll {
        if (this.restriction == AdditionRestriction.Red) {
            return () => { return DieRoll.RedDieRoll() }
        }
        else if (this.restriction == AdditionRestriction.Blue) {
            return () => { return DieRoll.BlueDieRoll() }
        }
        else if (this.restriction == AdditionRestriction.Black) {
            return () => { return DieRoll.BlackDieRoll() }
        }
        else if (this.restriction == AdditionRestriction.Any) {
            let preferredDie = this.preferredTypes.length ? this.preferredTypes[0] : this.defaultPreferences[0];
            return this.getDieFactoryForDieType(preferredDie);
        }
        else if (this.restriction == AdditionRestriction.Existing) {
            for (const preferredDie of this.preferredTypes) {
                if (p.diceOfType(preferredDie).length > 0) {
                    return this.getDieFactoryForDieType(preferredDie);
                }
            }
        }
        return this.nullDieFactory;
    }

    apply(pool: AttackPool): IAttackPool {
        let p = pool.clone();
        let factory = this.getDieFactory(p);
        let numDice = this.isVariableAmount ? this.currentDieCount : this.dieCount;
        for (let i = 0; i < numDice; i++) {
            let roll = factory();
            if (roll) {
                p.dieRolls.push(roll);
            }
        }
        return p;
    }
}
