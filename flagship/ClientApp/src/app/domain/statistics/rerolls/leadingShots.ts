import { IDieModification, ModificationType } from '../dieModification';
import { AttackPool, IAttackPool, WeightedAttackPool, ConditionalAttackPool, AttackPoolResultType } from '../attackPool';
import { DieType, DieRoll } from '../dieRoll';
import { RerollModification } from './rerollModification';
import { RerollStrategy } from "./rerollStrategy";

export class LeadingShotsModification extends RerollModification {
    name: string = "Leading Shots";   

    constructor(strategy: RerollStrategy, public order: number, public type: ModificationType = ModificationType.Reroll) {
        super(strategy, order, type);
    }
    
    probabilityOfEffect(pool: AttackPool): number {
        // probability of leading shots is P(more than two blank any die)
        // could get more sophisticated but this is probably a good baseline
        return pool.probabilityOfResult(DieType.Any, AttackPoolResultType.Blank, 2);
    }

    canBeApplied(pool: AttackPool): boolean {
        return this.enabled && pool.diceOfType(DieType.Blue).length > 0;
    }

    getBlueDieToBeRemoved(pool: AttackPool): DieRoll {
        // In general, we want to remove the least modified blue die
        // that has the set of probabilities closest to the base blue probabilities
        let blues = pool.diceOfType(DieType.Blue);
        let minModified = Math.min(...blues.map(x => x.modifications));
        let minModifiedBlues = blues.filter(d => d.modifications === minModified);

        let candidate = minModifiedBlues[0];
        let candidateScore = null;
        for (const die of minModifiedBlues) {
            let probabilityDifference = Math.abs(die.pAccuracy - die.baseProbability.pAccuracy) +
                Math.abs(die.pHit - die.baseProbability.pHit) + 
                Math.abs(die.pCrit - die.baseProbability.pCrit);
            if (candidateScore == null || probabilityDifference < candidateScore) {
                candidate = die;
                candidateScore = probabilityDifference;
            }
        }
        return candidate;
    }

    apply(pool: AttackPool): IAttackPool {
        // Leading shots is a conditional effect, so this method 
        // returns a conditional probability pool based on the 
        // branching probability of using the effect or not

        let pEffect = this.probabilityOfEffect(pool);
        let pNoEffect = 1 - pEffect;

        let noPool = new WeightedAttackPool(pool.clone(), pNoEffect);
        
        let newPool = pool.clone();
        let dieToBeRemoved = this.getBlueDieToBeRemoved(newPool);
        newPool.dieRolls.splice(newPool.dieRolls.indexOf(dieToBeRemoved), 1);
        // Now that the blue die is removed, reroll the remaining dice
        newPool.dieRolls = this.rerollDice(newPool.dieRolls);
        let yesPool = new WeightedAttackPool(newPool, pEffect);

        let conditionalPool = new ConditionalAttackPool([noPool, yesPool]);
        return conditionalPool;
    }


}