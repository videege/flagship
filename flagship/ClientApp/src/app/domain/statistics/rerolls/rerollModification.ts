import { DieRoll } from '../dieRoll';
import { RerollStrategy } from './rerollStrategy';

export abstract class RerollModification {

    public enabled = true;
    constructor(public strategy: RerollStrategy) {

    }
    
    rerollDice(dieRolls: DieRoll[]): DieRoll[] {
        let newRolls = [];
        for (const die of dieRolls) {
            // Modify probability according to the strategy
            let d = this.adjustProbability(die);
            d.validate();
            newRolls.push(d);
        }
        return newRolls;
    }

    adjustProbability(die: DieRoll): DieRoll {
        let probability = 0;
        let strategy = this.strategy;
        if (strategy & RerollStrategy.Blanks) {
            probability += die.baseProbability.pBlank;
        }
        if (strategy & RerollStrategy.Accuracies) {
            probability += die.baseProbability.pAccuracy;
        }
        if (strategy & RerollStrategy.Hits) {
            probability += die.baseProbability.pHit;
        }

        let d = die.clone();
        if (probability === 0)
            return d;

        if (strategy & RerollStrategy.Blanks) {
            d.pBlank = die.pBlank * die.baseProbability.pBlank;
        } else {
            d.pBlank = die.pBlank + (probability * die.baseProbability.pBlank)
        }
        if (strategy & RerollStrategy.Accuracies) {
            d.pAccuracy = die.pAccuracy * die.baseProbability.pAccuracy;
        } else {
            d.pAccuracy = die.pAccuracy + (probability * die.baseProbability.pAccuracy);
        }

        if (strategy & RerollStrategy.Hits) {
            d.pHit = die.pHit * die.baseProbability.pHit
        } else {
            d.pHit = die.pHit + (probability * die.baseProbability.pHit);
        }

        // Other events not accounted for by reroll strategy (i.e., you wouldn't reroll these dice)
        d.pCrit = die.pCrit + (probability * die.baseProbability.pCrit);
        d.pDoubleHit = die.pDoubleHit + (probability * die.baseProbability.pDoubleHit);
        d.pHitCrit = die.pHitCrit + (probability * die.baseProbability.pHitCrit);

        return d;
    }
}