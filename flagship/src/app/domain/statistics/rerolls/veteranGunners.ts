import { IDieModification, ModificationType } from '../dieModification';
import { AttackPool, IAttackPool, WeightedAttackPool, ConditionalAttackPool, AttackPoolResultType, Range } from '../attackPool';
import { DieType, DieRoll } from '../dieRoll';
import { RerollModification } from './rerollModification';
import { RerollStrategy } from "./rerollStrategy";

export class VeteranGunnersModification extends RerollModification {
    
    name: string = "Veteran Gunners";   

    constructor(strategy: RerollStrategy, public order: number) {
        super(strategy, order, null, ModificationType.Reroll);
    }
    
    probabilityOfEffect(pool: IAttackPool): number {
        // probability of veteran gunners is p(> 50% blanks) in the pool
        if (!pool) return 0;
        return pool.probabilityOfResult(DieType.Any, AttackPoolResultType.Blank, Math.ceil(pool.poolSize() / 2));
    }

    apply(pool: AttackPool): IAttackPool {
        let pEffect = this.probabilityOfEffect(pool);
        let pNoEffect = 1 - pEffect;

        let noPool = new WeightedAttackPool(pool.clone(), pNoEffect);
        
        // Create a freshly rerolled pool of all dice
        let newPool = AttackPool.FromNumberOfDice(pool.diceOfType(DieType.Red).length,
            pool.diceOfType(DieType.Blue).length, pool.diceOfType(DieType.Black).length,
            pool.firingArc, pool.range);
        let yesPool = new WeightedAttackPool(newPool, pEffect);

        let conditionalPool = new ConditionalAttackPool([noPool, yesPool]);
        return conditionalPool;
    }

    canBeApplied(pool: AttackPool): boolean {
        return this.enabled;
    }
}