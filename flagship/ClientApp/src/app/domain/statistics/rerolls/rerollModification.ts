import { DieRoll } from '../dieRoll';
import { RerollStrategy } from './rerollStrategy';

export abstract class RerollModification {

    constructor(public strategy: RerollStrategy) {

    }
    
    rerollDice(dieRolls: DieRoll[]): void {
        for (const die of dieRolls) {
            // Modify probability according to the strategy
            this.adjustProbability(die);
            die.validate();
        }
    }

    adjustProbability(die: DieRoll) {
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

        if (probability === 0)
            return;

        if (strategy & RerollStrategy.Blanks) {
            die.pBlank = die.pBlank * die.baseProbability.pBlank;
        } else {
            die.pBlank = die.pBlank + (probability * die.baseProbability.pBlank)
        }
        if (strategy & RerollStrategy.Accuracies) {
            die.pAccuracy = die.pAccuracy * die.baseProbability.pAccuracy;
        } else {
            die.pAccuracy = die.pAccuracy + (probability * die.baseProbability.pAccuracy);
        }

        if (strategy & RerollStrategy.Hits) {
            die.pHit = die.pHit * die.baseProbability.pHit
        } else {
            die.pHit = die.pHit + (probability * die.baseProbability.pHit);
        }

        // Other events not accounted for by reroll strategy (i.e., you wouldn't reroll these dice)
        die.pCrit = die.pCrit + (probability * die.baseProbability.pCrit);
        die.pDoubleHit = die.pDoubleHit + (probability * die.baseProbability.pDoubleHit);
        die.pHitCrit = die.pHitCrit + (probability * die.baseProbability.pHitCrit);
    }
}