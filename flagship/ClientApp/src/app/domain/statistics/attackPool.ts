import { DieRoll, DieType } from './dieRoll';
import { Armament } from '../armament';
import { IDieModification } from './dieModification';

export enum Range {
    Long = 1,
    Medium = 2,
    Close = 3
}

export class PoolStatistics {
    public deviation: number;
    public distribution: number[];

    constructor(public mean: number, variance: number) {
        this.deviation = Math.sqrt(variance);
        this.distribution = [
            //Math.min(0, this.mean - (2 * this.deviation)),
            Math.max(0, this.mean - this.deviation),
            this.mean,
            this.mean + this.deviation,
            //this.mean + (2 * this.deviation)
        ];
    }

    applyProbability(p: number): PoolStatistics {
        this.mean = this.mean * p;
        this.deviation = this.deviation * p;
        this.distribution = this.distribution.map(x => x * p);
        return this;
    }

    sum(other: PoolStatistics): PoolStatistics {
        this.mean = this.mean + other.mean;
        this.deviation = this.deviation + other.deviation;
        for (let i = 0; i < this.distribution.length; i++) {
            this.distribution[i] = this.distribution[i] + other.distribution[i];
        }
        return this;
    }
}

export interface IAttackPool {
    expectedDamage(): PoolStatistics;
    expectedAccuracies(): PoolStatistics;
    expectedCriticals(): PoolStatistics;

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

    expectedDamage(): PoolStatistics {
        return this.pools.map(x => x.expectedDamage())
            .reduce((sum, current) => sum.sum(current));
    }

    expectedAccuracies(): PoolStatistics {
        return this.pools.map(x => x.expectedAccuracies())
            .reduce((sum, current) => sum.sum(current));
    }

    expectedCriticals(): PoolStatistics {
        return this.pools.map(x => x.expectedCriticals())
            .reduce((sum, current) => sum.sum(current));
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

    expectedDamage(): PoolStatistics {
        return this.pool.expectedDamage().applyProbability(this.probability);
    }

    expectedAccuracies(): PoolStatistics {
        return this.pool.expectedAccuracies().applyProbability(this.probability);
    }

    expectedCriticals(): PoolStatistics {
        return this.pool.expectedCriticals().applyProbability(this.probability);
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

    expectedDamage(): PoolStatistics {
        let mean = this.dieRolls.map(x => x.expectedDamage())
            .reduce((sum, current) => sum + current);
        let variance = this.dieRolls.map(x => x.damageVariance())
            .reduce((sum, current) => sum + current);
        return new PoolStatistics(mean, variance);
    }

    expectedAccuracies(): PoolStatistics {
        let mean = this.dieRolls.map(x => x.expectedAccuracies())
            .reduce((sum, current) => sum + current);
        let variance = this.dieRolls.map(x => x.accuracyVariance())
            .reduce((sum, current) => sum + current);
        return new PoolStatistics(mean, variance);
    }

    expectedCriticals(): PoolStatistics {
        let mean = this.dieRolls.map(x => x.expectedCriticals())
            .reduce((sum, current) => sum + current);
        let variance = this.dieRolls.map(x => x.criticalVariance())
            .reduce((sum, current) => sum + current);
        return new PoolStatistics(mean, variance);
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