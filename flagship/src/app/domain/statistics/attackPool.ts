import { DieRoll, DieType } from './dieRoll';
import { Armament } from '../game/armament';
import { IDieModification } from './dieModification';
import { PoolStatistics } from './poolStatistics';
import { FiringArc } from './firingArc';
import { PoissonBinomialCalculator } from './poissonBinomialCalculator';

export enum Range {
    Long = 1 << 0,
    Medium = 1 << 1,
    Close = 1 << 2
}

export enum AttackPoolResultType {
    Critical,
    Accuracy,
    Blank,
    NonBlank,
    Hit
}

export interface IAttackPool {
    expectedDamage(): PoolStatistics;
    expectedAccuracies(): PoolStatistics;
    expectedCriticals(): PoolStatistics;
    range: Range;

    probabilityOfResult(dieType: DieType, result: AttackPoolResultType, minSuccesses: number): number;
    modify(modification: IDieModification): IAttackPool;
    poolSize(): number;
}

export class ConditionalAttackPool implements IAttackPool {
    public range: Range;
    constructor(public pools: IAttackPool[]) {
        this.range = this.pools[0].range;
    }

    poolSize(): number {
        return Math.max(...this.pools.map(d => d.poolSize()));
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

    probabilityOfResult(dieType: DieType, result: AttackPoolResultType, minSuccesses: number): number {
        return this.pools.map(x => x.probabilityOfResult(dieType, result, minSuccesses))
            .reduce((sum, current) => sum + current);
    }
}

export class WeightedAttackPool implements IAttackPool {
    public range: Range;

    poolSize(): number {
        return this.pool.poolSize();
    }

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

    probabilityOfResult(dieType: DieType, result: AttackPoolResultType, minSuccesses: number): number {
        return this.pool.probabilityOfResult(dieType, result, minSuccesses) * this.probability;
    }

    constructor(public pool: IAttackPool, public probability: number) {
        this.range = pool.range;
    }
}

export class AttackPool implements IAttackPool {
    poolSize(): number {
        return this.dieRolls.length;
    }
    
    modify(modification: IDieModification): IAttackPool {
        // This pool is concrete, so apply the modifiation
        // and potentially replace this pool
        if (!modification.canBeApplied(this))
            return this;

        let pool = modification.apply(this);
        return pool;
    }

    expectedDamage(): PoolStatistics {
        let mean = this.dieRolls.length 
            ? this.dieRolls.map(x => x.expectedDamage())
                .reduce((sum, current) => sum + current)
            : 0;
        let variance = this.dieRolls.length 
            ? this.dieRolls.map(x => x.damageVariance())
                .reduce((sum, current) => sum + current)
            : 0;
        return new PoolStatistics(mean, variance);
    }

    expectedAccuracies(): PoolStatistics {
        let mean = this.dieRolls.length 
            ? this.dieRolls.map(x => x.expectedAccuracies())
                .reduce((sum, current) => sum + current)
            : 0;
        let variance = this.dieRolls.length 
            ? this.dieRolls.map(x => x.accuracyVariance())
                .reduce((sum, current) => sum + current)
            : 0;
        return new PoolStatistics(mean, variance);
    }

    expectedCriticals(): PoolStatistics {
        let mean = this.dieRolls.length 
            ? this.dieRolls.map(x => x.expectedCriticals())
                .reduce((sum, current) => sum + current)
            : 0;
        let variance = this.dieRolls.length 
            ? this.dieRolls.map(x => x.criticalVariance())
                .reduce((sum, current) => sum + current)
            : 0;
        return new PoolStatistics(mean, variance);
    }

    // the probability of obtaining at least K results
    probabilityOfResult(dieType: DieType, result: AttackPoolResultType, minSuccesses: number): number {
        let dice = this.diceOfType(dieType);

        let probabilities: number[];
        if (result == AttackPoolResultType.Accuracy) {
            probabilities = dice.map(d => d.pAccuracy);
        } else if (result == AttackPoolResultType.Critical) {
            probabilities = dice.map(d => d.pHitCrit + d.pCrit);
        } else if (result == AttackPoolResultType.Blank) {
            probabilities = dice.map(d => d.pBlank);
        } else if (result == AttackPoolResultType.NonBlank) {
            probabilities = dice.map(d => 1 - d.pBlank);
        } else if (result == AttackPoolResultType.Hit) {
            probabilities = dice.map(d => d.pHit);
        } else {
            return 0;
        }

        let resultCalc = new PoissonBinomialCalculator();
        return resultCalc.probabilityOfAtLeastNSuccesses(probabilities, minSuccesses);
    }

    diceOfType(type: DieType): DieRoll[] {
        if (type === DieType.Any)
            return this.dieRolls;

        return this.dieRolls.filter(r => r.type === type);
    }

    constructor(public dieRolls: DieRoll[], public firingArc: FiringArc, public range: Range) {
        if (!dieRolls) {
            this.dieRolls = [];
        }
    }

    clone(): AttackPool {
        let rolls = this.dieRolls.map(x => x.clone());
        return new AttackPool(rolls, this.firingArc, this.range);
    }

    static FromNumberOfDice(redDice: number, blueDice: number, blackDice: number,
        firingArc: FiringArc, range: Range): AttackPool {
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
        return new AttackPool(rolls, firingArc, range);
    }


}
