import { IDieModification } from '../dieModification';
import { AttackPool, IAttackPool, WeightedAttackPool, ConditionalAttackPool } from '../attackPool';
import { DieType, DieRoll } from '../dieRoll';
import { RerollModification } from './rerollModification';
import { RerollStrategy } from "./rerollStrategy";

export class LeadingShotsModification extends RerollModification implements IDieModification {
    name: string = "Leading Shots";   

    constructor(strategy: RerollStrategy) {
        super(strategy);
    }
    
    probabilityOfEffect(pool: AttackPool): number {
        // Based on the reroll strategy, determine the 
        // probability of using this effect.
        return 0.6;
    }

    canBeApplied(pool: AttackPool): boolean {
        return pool.diceOfType(DieType.Black).length > 0;
    }

    apply(pool: AttackPool): IAttackPool {
        // Leading shots is a conditional effect, so this method 
        // returns a conditional probability pool based on the 
        // branching probability of using the effect or not
        if (!this.canBeApplied(pool))
            return pool;

        let pEffect = this.probabilityOfEffect(pool);
        let pNoEffect = 1 - pEffect;

        let noPool = new WeightedAttackPool(pool.clone(), pNoEffect);
        
        let newPool = pool.clone();
        newPool.dieRolls.splice(newPool.dieRolls.findIndex(x => x.type === DieType.Blue), 1);
        // Now that the blue die is removed, reroll the remaining dice
        this.rerollDice(newPool.dieRolls);
        let yesPool = new WeightedAttackPool(newPool, pEffect);

        let conditionalPool = new ConditionalAttackPool([noPool, yesPool]);
        return conditionalPool;
    }


}