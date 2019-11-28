import { IDieModification, ModificationType, ICalculatedProbabilities } from '../dieModification';
import { DieType, DieRoll } from '../dieRoll';
import { AdditionRestriction } from './additionModification';
import { FiringArc } from '../firingArc';
import { IAttackPool, AttackPool, Range, AttackPoolResultType, WeightedAttackPool, ConditionalAttackPool } from '../attackPool';

export class QuadTurbolaserCannonsModification implements IDieModification {
    public enabled = true;
    public name = "Quad Turbolaser Cannons";
    public orderable = true;
    public firingArcRestriction: FiringArc = null;
    public rangeRestriction: Range = null;
    public type: ModificationType = ModificationType.Addition

    constructor(public order: number) {
      
    }

    public calculatedProbabilities: ICalculatedProbabilities;
    setCalculatedProbabilities(probabilities: ICalculatedProbabilities) {
        this.calculatedProbabilities = probabilities;
    }
    
    probabilityOfEffect(pool: IAttackPool): number {
        return pool.probabilityOfResult(DieType.Red, AttackPoolResultType.Accuracy, 1);
    }

    canBeApplied(pool: AttackPool): boolean {
        return this.enabled;
    }

    apply(pool: AttackPool): IAttackPool {
        let pEffect = this.probabilityOfEffect(pool);
        let pNoEffect = 1 - pEffect;

        let noPool = new WeightedAttackPool(pool.clone(), pNoEffect);
        
        let newPool = pool.clone();
        let newDie = DieRoll.RedDieRoll();
        newDie.pAccuracy = 1;
        newDie.pBlank = newDie.pHit = newDie.pDoubleHit = newDie.pCrit = 0;
        newPool.dieRolls.push(newDie);
        let yesPool = new WeightedAttackPool(newPool, pEffect);

        let conditionalPool = new ConditionalAttackPool([noPool, yesPool]);
        return conditionalPool;
    }
}
