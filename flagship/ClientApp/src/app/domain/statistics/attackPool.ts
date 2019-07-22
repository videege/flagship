import { DieRoll, DieType } from './dieRoll';
import { Armament } from '../armament';
import { IDieModification } from './dieModification';

export enum Range {
    Long = 1,
    Medium = 2,
    Close = 3
}

export interface IAttackPool {
    expectedDamage(): number;
    expectedAccuracies(): number;
    expectedCriticals(): number;

    modify(modification: IDieModification): IAttackPool;
}

export class ConditionalAttackPool implements IAttackPool {
    constructor(public pools: IAttackPool[]) {
        
    }

    modify(modification: IDieModification): IAttackPool {
        //This conditional pool is not concrete, so just pass the 
        //message into each sub-pool and return this.
        let newPools = this.pools.map(x => x.modify(modification));
        this.pools = newPools;
        return this;
    }

    expectedDamage(): number {
        return this.pools.map(x => x.expectedDamage())
            .reduce((sum, current) => sum + current);
    }

    expectedAccuracies(): number {
        return this.pools.map(x => x.expectedAccuracies())
            .reduce((sum, current) => sum + current);
    }

    expectedCriticals(): number {
        return this.pools.map(x => x.expectedCriticals())
            .reduce((sum, current) => sum + current);
    }
}

export class WeightedAttackPool implements IAttackPool {
    
    modify(modification: IDieModification): IAttackPool {
        //This weighted pool is not concrete, so just pass the 
        //message into the sub-pool and return this.
        let newPool = this.pool.modify(modification);
        this.pool = newPool;
        return this;
    }

    expectedDamage(): number {
        return this.pool.expectedDamage() * this.probability;
    }

    expectedAccuracies(): number {
        return this.pool.expectedAccuracies() * this.probability;
    }

    expectedCriticals(): number {
        return this.pool.expectedCriticals() * this.probability;
    }

    constructor(public pool: IAttackPool, public probability: number) {

    }
}

export class AttackPool implements IAttackPool {

    modify(modification: IDieModification): IAttackPool {
        // This pool is concrete, so apply the modifiation
        // and potentially replace this pool
        let pool = modification.apply(this);
        return pool;
    }

    expectedDamage(): number {
        return this.dieRolls.map(x => x.expectedDamage())
            .reduce((sum, current) => sum + current);
    }

    expectedAccuracies(): number {
        return this.dieRolls.map(x => x.expectedAccuracies())
            .reduce((sum, current) => sum + current);
    }

    expectedCriticals(): number {
        return this.dieRolls.map(x => x.expectedCriticals())
            .reduce((sum, current) => sum + current);
    }

    diceOfType(type: DieType): DieRoll[] {
        if (type === DieType.Any)
            return this.dieRolls;
            
        return this.dieRolls.filter(r => r.type === type);
    }

    constructor(public dieRolls: DieRoll[]) {
        if (!dieRolls) {
            this.dieRolls = [];
        }
    }

    clone(): AttackPool {
        let rolls = this.dieRolls.map(x => x.clone());
        return new AttackPool(rolls);
    }

    static FromNumberOfDice(redDice: number, blueDice: number, blackDice: number): AttackPool {
        let rolls = [];
        for (let i = 0; i < redDice; i++) {
            rolls.push(DieRoll.RedDieRoll());
        }
        for (let i = 0; i < blueDice; i++) {
            rolls.push(DieRoll.BlueDieRoll());
        }
        for (let i = 0; i < blackDice; i++) {
            rolls.push(DieRoll.BlackDieRoll());
        }
        return new AttackPool(rolls);
    }


}