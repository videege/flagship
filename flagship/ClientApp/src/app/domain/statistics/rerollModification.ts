import { IDieModification } from './dieModification';
import { AttackPool } from './attackPool';
import { DieType, DieRoll } from './dieRoll';

export enum RerollStrategy {
    Blanks = 0,
    Accuracies = 1 << 0,
    Hits = 1 << 1
}

export class RerollModification implements IDieModification {

    constructor(public dieType: DieType, public quantity: number,
        public strategy: RerollStrategy) {

    }

    modify(pool: AttackPool): AttackPool {
        // Get the set of dice we are allowed to reroll
        let dice = pool.diceOfType(this.dieType);

        if (this.quantity) {
            // If we can only reroll a certain number of dice,
            // prefer rerolling in order of dice quality (Blk/Blue/Red)
            let rerolledDice = dice.filter(r => r.type === DieType.Black);
            if (rerolledDice.length < this.quantity) {
                rerolledDice.push(...dice.filter(r => r.type === DieType.Blue));
                if (rerolledDice.length < this.quantity) {
                    rerolledDice.push(...dice.filter(r => r.type === DieType.Red));
                }
            }
            dice = rerolledDice.splice(0, this.quantity);
        }

        for (const die of dice) {
            // Modify probability according to the strategy
            this.adjustProbability(die, this.strategy);
            die.validate();
        }
        return pool;
    }

    adjustProbability(die: DieRoll, strategy: RerollStrategy) {
        let probability = 0;
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