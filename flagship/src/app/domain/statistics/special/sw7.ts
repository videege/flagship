import { IAttackPool, AttackPoolResultType, Range, AttackPool } from '../attackPool';
import { IDieModification, ModificationType, ICalculatedProbabilities } from '../dieModification';
import { PoolStatistics } from '../poolStatistics';
import { DieType } from '../dieRoll';

export class SW7AttackPool implements IAttackPool {
    public range: Range;

    constructor(public innerPool: IAttackPool) {

    }

    poolSize(): number {
        return this.innerPool.poolSize();
    }

    modify(modification: IDieModification): IAttackPool {
        this.innerPool = this.innerPool.modify(modification);
        return this;
    }

    expectedDamage(): PoolStatistics {
        const dmg = this.innerPool.expectedDamage();
        const acc = this.innerPool.expectedAccuracies();
        return new PoolStatistics(dmg.mean + acc.mean, dmg.variance + acc.variance);
    }

    expectedAccuracies(): PoolStatistics {
        return this.innerPool.expectedAccuracies();
    }

    expectedCriticals(): PoolStatistics {
        return this.innerPool.expectedCriticals();
    }

    probabilityOfResult(dieType: DieType, result: AttackPoolResultType, minSuccesses: number): number {
        return this.innerPool.probabilityOfResult(dieType, result, minSuccesses);
    }
}

export class SW7Modification implements IDieModification {
    public name = 'SW-7 Ion Batteries';
    public type = ModificationType.Special;
    public rangeRestriction: Range = null;
    public enabled = true;
    public orderable = false;
    public order = 10000;
    public calculatedProbabilities: ICalculatedProbabilities;

    apply(pool: AttackPool): IAttackPool {
        return new SW7AttackPool(pool);
    }
    canBeApplied(pool: AttackPool): boolean {
        return this.enabled;
    }
    probabilityOfEffect(pool: IAttackPool): number {
       return 1;
    }

    setCalculatedProbabilities(probabilities: ICalculatedProbabilities) {
        this.calculatedProbabilities = probabilities;
    }
}