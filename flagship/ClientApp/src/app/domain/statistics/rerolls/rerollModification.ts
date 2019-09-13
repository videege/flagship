import { DieRoll } from '../dieRoll';
import { RerollStrategy } from './rerollStrategy';
import { IDieModification, ModificationType, ICalculatedProbabilities } from '../dieModification';
import { AttackPool, IAttackPool } from '../attackPool';

export abstract class RerollModification implements IDieModification {
    abstract name: string;
    abstract apply(pool: AttackPool): IAttackPool;
    abstract canBeApplied(pool: AttackPool): boolean;
    abstract probabilityOfEffect(pool: IAttackPool): number;

    public enabled = true;
    public orderable = true;
    constructor(public strategy: RerollStrategy, public order: number, public type: ModificationType = ModificationType.Reroll) {

    }

    private isRerollingResult(result: RerollStrategy) {
        return (this.strategy & result) === result;
    }
    
    rerollDice(dieRolls: DieRoll[]): DieRoll[] {
        let newRolls = [];
        for (const die of dieRolls) {
            // Modify probability according to the strategy
            let d = this.adjustProbability(die);
            d.recordModification();
            d.validate();
            newRolls.push(d);
        }
        return newRolls;
    }

    public calculatedProbabilities: ICalculatedProbabilities;
    setCalculatedProbabilities(probabilities: ICalculatedProbabilities) {
        this.calculatedProbabilities = probabilities;
    }

    adjustProbability(die: DieRoll): DieRoll {
        let probability = 0;

        let rerolling = {
            blanks: this.isRerollingResult(RerollStrategy.Blanks),
            accuracies: this.isRerollingResult(RerollStrategy.Accuracies),
            hits: this.isRerollingResult(RerollStrategy.Hits) || 
                (this.isRerollingResult(RerollStrategy.BlackHits) && die.pHitCrit > 0)
        };
        
        if (rerolling.blanks) {
            probability += die.baseProbability.pBlank;
        }
        if (rerolling.accuracies) {
            probability += die.baseProbability.pAccuracy;
        }
        if (rerolling.hits) {
            probability += die.baseProbability.pHit;
        }

        let d = die.clone();
        if (probability === 0)
            return d;

        if (rerolling.blanks) {
            d.pBlank = die.pBlank * die.baseProbability.pBlank;
        } else {
            d.pBlank = die.pBlank + (probability * die.baseProbability.pBlank)
        }
        if (rerolling.accuracies) {
            d.pAccuracy = die.pAccuracy * die.baseProbability.pAccuracy;
        } else {
            d.pAccuracy = die.pAccuracy + (probability * die.baseProbability.pAccuracy);
        }

        if (rerolling.hits) {
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