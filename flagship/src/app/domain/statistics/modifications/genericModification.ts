import { IDieModification, ModificationType, ICalculatedProbabilities } from '../dieModification';
import { RerollStrategy } from '../rerolls/rerollStrategy';
import { DieType, DieRoll } from '../dieRoll';
import { type } from 'os';
import { AttackPool, Range, AttackPoolResultType, IAttackPool, WeightedAttackPool, ConditionalAttackPool } from '../attackPool';

// intensify firepower - change one die to single hit

export enum FaceRestriction {
    Hit = "Hit",
    Crit = "Critical",
    Accuracy = "Accuracy",
    DoubleHit = "Double Hit"
}

export class GenericModification implements IDieModification {
    public enabled = true;
    public type = ModificationType.Modification;
    public rangeRestriction: Range = null;

    constructor(public name: string, public order: number,
        public orderable: boolean,
        public sourceColorRestriction: DieType,
        public sourceFaceRestrictions: FaceRestriction[],
        public targetFaceRestrictions: FaceRestriction[],
        public diceCost: number,
        public costColorPreferences: DieType[],
        public sourceColorPreference: DieType[],
        public targetFacePreference: FaceRestriction) {
        if (!this.costColorPreferences || !this.costColorPreferences.length) {
            this.costColorPreferences = [DieType.Red, DieType.Blue, DieType.Black];
        }
        if (!this.sourceColorPreference || !this.sourceColorPreference.length) {
            this.sourceColorPreference = [DieType.Black, DieType.Red, DieType.Blue];
        }
        if (this.targetFaceRestrictions.length === 1) {
            this.targetFacePreference = this.targetFaceRestrictions[0];
        }
    }

    public calculatedProbabilities: ICalculatedProbabilities;
    setCalculatedProbabilities(probabilities: ICalculatedProbabilities) {
        this.calculatedProbabilities = probabilities;
    }

    canBeApplied(pool: AttackPool): boolean {
        // In general these effects are assumed to be always able to be used
        // if they are included in the calculation.
        if (this.rangeRestriction && (pool.range & this.rangeRestriction) == 0) {
            return false;
        }
        if (this.sourceColorRestriction !== DieType.Any &&
            pool.diceOfType(this.sourceColorRestriction).length === 0) {
            return false;
        }
        if (pool.poolSize() <= this.diceCost) {
            return false;
        }
        return this.enabled;
    }

    private getLeastModifiedDie(rolls: DieRoll[]): DieRoll {
        // In general, we want to remove the least modified die
        let minModified = Math.min(...rolls.map(x => x.modifications));
        let minModifiedDice = rolls.filter(d => d.modifications === minModified);

        let candidate = minModifiedDice[0];
        let candidateScore = null;
        for (const die of minModifiedDice) {
            let probabilityDifference = die.modificationScore();
            if (candidateScore == null || probabilityDifference < candidateScore) {
                candidate = die;
                candidateScore = probabilityDifference;
            }
        }
        return candidate;
    }

    private getPoolAfterCost(pool: AttackPool): AttackPool {
        if (this.diceCost === 0) return pool;

        for (const preference of this.costColorPreferences) {
            let dice = pool.diceOfType(preference);
            if (!dice.length) continue;
            let leastModified = this.getLeastModifiedDie(dice);
            let afterCostPool = pool.clone();
            let idx = afterCostPool.dieRolls.indexOf(afterCostPool.dieRolls.find(x =>
                x.type === leastModified.type && x.modifications === leastModified.modifications &&
                x.modificationScore() === leastModified.modificationScore()));
            afterCostPool.dieRolls.splice(idx, 1);
            return afterCostPool;
        }
        return pool;
    }

    probabilityOfEffect(pool: IAttackPool): number {
        if (!pool) return 0;

        let resultMapping = (face: FaceRestriction): AttackPoolResultType => {
            switch (face) {
                case FaceRestriction.Hit:
                    return AttackPoolResultType.Hit;
                case FaceRestriction.Accuracy:
                    return AttackPoolResultType.Accuracy;
                case FaceRestriction.Crit:
                    return AttackPoolResultType.Critical;
                default:
                    return null;
            }
        };

        if (!this.sourceFaceRestrictions || !this.sourceFaceRestrictions.length) {
            // In this case, use the probability of at least one blank
            
            let p = pool.probabilityOfResult(DieType.Any, AttackPoolResultType.Blank, 1);
            return p > 0 ? p : 1; // 100% in the case of an entirely blue pool
        }
        
        let p = this.sourceFaceRestrictions.map(sourceFace =>
            pool.probabilityOfResult(this.sourceColorRestriction, resultMapping(sourceFace), 1));
        return p.length === 1 
            ? p[0]
            : p.reduce((a,b) => a + b, 0) / p.length;
    }

    private getDieToBeModified(pool: AttackPool): DieRoll {
        let dice: DieRoll[];
        if (this.sourceColorRestriction !== DieType.Any) {
            dice = pool.diceOfType(this.sourceColorRestriction)
        } else {
            for (const preference of this.sourceColorPreference) {
                dice = pool.diceOfType(preference);
                if (dice.length > 0) break;
            }
        }

        return this.getHighestProbabilityOfSourceRestrictions(dice);
    }

    private getHighestProbabilityOfSourceRestrictions(dice: DieRoll[]) {
        let pAccumulator = (die: DieRoll) => {
            let p = 0;
            if (!this.sourceFaceRestrictions.length) {
                return die.baseProbability.pBlank > 0
                    ? die.pBlank
                    : die.pAccuracy;
            }
            if (this.sourceFaceRestrictions.includes(FaceRestriction.Hit)) {
                p += die.pHit + die.pDoubleHit;
                if (!this.sourceFaceRestrictions.includes(FaceRestriction.Crit)) {
                    p += die.pHitCrit;
                }
            }
            if (this.sourceFaceRestrictions.includes(FaceRestriction.Crit)) {
                p += die.pCrit + die.pHitCrit;
            }
            if (this.sourceFaceRestrictions.includes(FaceRestriction.Accuracy)) {
                p += die.pAccuracy;
            }

            return p;
        };

        return dice.sort((a, b) => {
            let pA = pAccumulator(a);
            let pB = pAccumulator(b);
            if (pA < pB) return 1;
            if (pA > pB) return -1;
            return 0;
        })[0];
    }

    private modifyDie(die: DieRoll) {
        switch (this.targetFacePreference) {
            case FaceRestriction.Hit:
                die.pHit = 1;
                die.pBlank = die.pAccuracy = die.pCrit = die.pDoubleHit = die.pHitCrit = 0;
                return;
            case FaceRestriction.Accuracy:
                if (die.baseProbability.pAccuracy > 0) {
                    die.pAccuracy = 1;
                    die.pBlank = die.pHit = die.pCrit = die.pDoubleHit = die.pHitCrit = 0;
                }
                return;
            case FaceRestriction.Crit:
                if (die.baseProbability.pCrit > 0) {
                    die.pCrit = 1;
                    die.pBlank = die.pHit = die.pAccuracy = die.pDoubleHit = die.pHitCrit = 0;
                } else if (die.baseProbability.pHitCrit > 0) {
                    die.pHitCrit = 1;
                    die.pBlank = die.pHit = die.pCrit = die.pDoubleHit = die.pAccuracy = 0;
                }
                return;
            case FaceRestriction.DoubleHit:
                if (die.baseProbability.pDoubleHit > 0) {
                    die.pDoubleHit = 1;
                    die.pBlank = die.pHit = die.pCrit = die.pAccuracy = die.pHitCrit = 0;
                }
                return;
        }
    }

    apply(pool: AttackPool): IAttackPool {
        // Leading shots is a conditional effect, so this method 
        // returns a conditional probability pool based on the 
        // branching probability of using the effect or not

        let pEffect = this.probabilityOfEffect(pool);
        let pNoEffect = 1 - pEffect;

        let noPool = new WeightedAttackPool(pool.clone(), pNoEffect);

        let newPool = pool.clone();
        let afterCostPool = this.getPoolAfterCost(newPool);
        let sourceDie = this.getDieToBeModified(afterCostPool);
        this.modifyDie(sourceDie);
        let yesPool = new WeightedAttackPool(afterCostPool, pEffect);

        let conditionalPool = new ConditionalAttackPool([noPool, yesPool]);
        return conditionalPool;
    }

}