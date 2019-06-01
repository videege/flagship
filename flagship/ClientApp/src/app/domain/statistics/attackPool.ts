import { DieRoll, DieType } from './dieRoll';
import { Armament } from '../armament';

export enum Range {
    Long = 1,
    Medium = 2,
    Close = 3
}

export interface IAttackPool {
    modify(fn: (IAttackPool))
}

export class ProbabilisticAttackPool implements IAttackPool {

}

export class AttackPool implements IAttackPool {

    public dieRolls: DieRoll[];

    constructor(armament: Armament, public range: Range) {
        // Construct the die rolls array using the armament at the given range
        // Red dice are always included
        for (let index = 0; index < armament.redDice; index++) {
            this.dieRolls.push(DieRoll.RedDieRoll());
        }

        if (this.range >= Range.Medium) {
            for (let index = 0; index < armament.blueDice; index++) {
                this.dieRolls.push(DieRoll.BlueDieRoll());
            }
        }

        if (this.range === Range.Close) {
            for (let index = 0; index < armament.blackDice; index++) {
                this.dieRolls.push(DieRoll.BlackDieRoll());
            }
        }
    }

    diceOfType(type: DieType): DieRoll[] {
        if (type === DieType.Any)
            return this.dieRolls;
            
        return this.dieRolls.filter(r => r.type === type);
    }
}