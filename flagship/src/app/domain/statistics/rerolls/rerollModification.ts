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
        let cumulativeRerollProbability = 0;

        let rerolling = {
            blanks: this.isRerollingResult(RerollStrategy.Blanks),
            accuracies: this.isRerollingResult(RerollStrategy.Accuracies),
            hits: this.isRerollingResult(RerollStrategy.Hits) || 
                (this.isRerollingResult(RerollStrategy.BlackHits) && die.pHitCrit > 0)
        };
        
        if (rerolling.blanks) {
            cumulativeRerollProbability += die.pBlank;
        }
        if (rerolling.accuracies) {
            cumulativeRerollProbability += die.pAccuracy;
        }
        if (rerolling.hits) {
            cumulativeRerollProbability += die.pHit;
        }

        let d = die.clone();
        if (cumulativeRerollProbability === 0)
            return d;

        if (rerolling.blanks) {
            let otherRerolledProbabilities = [];
            if (rerolling.accuracies) otherRerolledProbabilities.push(die.pAccuracy);
            if (rerolling.hits) otherRerolledProbabilities.push(die.pHit);

            d.pBlank = this.calculateRerolledProbability(die.pBlank, die.baseProbability.pBlank,
                otherRerolledProbabilities);
        } else {
            d.pBlank = die.pBlank + (cumulativeRerollProbability * die.baseProbability.pBlank)
        }
        if (rerolling.accuracies) {
            let otherRerolledProbabilities = [];
            if (rerolling.blanks) otherRerolledProbabilities.push(die.pBlank);
            if (rerolling.hits) otherRerolledProbabilities.push(die.pHit);

            d.pAccuracy = this.calculateRerolledProbability(die.pAccuracy, die.baseProbability.pAccuracy,
                otherRerolledProbabilities);
        } else {
            d.pAccuracy = die.pAccuracy + (cumulativeRerollProbability * die.baseProbability.pAccuracy);
        }

        if (rerolling.hits) {
            let otherRerolledProbabilities = [];
            if (rerolling.accuracies) otherRerolledProbabilities.push(die.pAccuracy);
            if (rerolling.blanks) otherRerolledProbabilities.push(die.pBlank);

            d.pHit = this.calculateRerolledProbability(die.pHit, die.baseProbability.pHit,
                otherRerolledProbabilities);
        } else {
            d.pHit = die.pHit + (cumulativeRerollProbability * die.baseProbability.pHit);
        }

        // Other events not accounted for by reroll strategy (i.e., you wouldn't reroll these dice)
        d.pCrit = die.pCrit + (cumulativeRerollProbability * die.baseProbability.pCrit);
        d.pDoubleHit = die.pDoubleHit + (cumulativeRerollProbability * die.baseProbability.pDoubleHit);
        d.pHitCrit = die.pHitCrit + (cumulativeRerollProbability * die.baseProbability.pHitCrit);

        return d;
    }

    calculateRerolledProbability(currentProbability: number, baseProbability: number,
        otherRerolledProbabilities: number[]): number {
        let newProb = currentProbability * baseProbability;
        for (const rerollProbability of otherRerolledProbabilities) {
            newProb += baseProbability * rerollProbability;
        }
        return newProb;
    }
}
