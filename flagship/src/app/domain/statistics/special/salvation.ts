import { IAttackPool, AttackPoolResultType, Range, AttackPool } from '../attackPool';
import { IDieModification, ModificationType, ICalculatedProbabilities } from '../dieModification';
import { PoolStatistics } from '../poolStatistics';
import { DieType } from '../dieRoll';
import { FiringArc } from '../firingArc';

export class SalvationAttackPool implements IAttackPool {
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
        const crit = this.innerPool.expectedCriticals();
        return new PoolStatistics(dmg.mean + crit.mean, dmg.variance + crit.variance);
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


export class SalvationModification implements IDieModification {
    public name = 'Salvation';
    public type = ModificationType.Special;
    public rangeRestriction: Range = null;
    public enabled = true;
    public orderable = false;
    public order = 10000;
    public calculatedProbabilities: ICalculatedProbabilities;

    apply(pool: AttackPool): IAttackPool {
        return new SalvationAttackPool(pool);
    }
    canBeApplied(pool: AttackPool): boolean {
        // tslint:disable-next-line:no-bitwise
        if ((pool.firingArc & FiringArc.Front) === 0) {
            return false;
        }
        return this.enabled;
    }
    probabilityOfEffect(pool: IAttackPool): number {
       return 1;
    }

    setCalculatedProbabilities(probabilities: ICalculatedProbabilities) {
        this.calculatedProbabilities = probabilities;
    }
}