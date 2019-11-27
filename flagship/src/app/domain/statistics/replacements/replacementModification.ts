import { IDieModification, ModificationType, ICalculatedProbabilities } from '../dieModification';
import { DieType, DieRoll } from '../dieRoll';
import { FiringArc } from '../firingArc';
import { IAttackPool, AttackPool, Range } from '../attackPool';

export class ReplacementModification implements IDieModification {
    public enabled = true;
    public type: ModificationType = ModificationType.Replacement

    private defaultPreference: DieType = DieType.Black;
    constructor(public name: string, public dieCount: number, 
        public orderable: boolean,
        public order: number,
        public firingArcRestriction: FiringArc = null,
        public rangeRestriction: Range = null,
        public preferredType: DieType = null) {
        if (!this.preferredType) {
            this.preferredType = this.defaultPreference;
        }
    }

    public calculatedProbabilities: ICalculatedProbabilities;
    setCalculatedProbabilities(probabilities: ICalculatedProbabilities) {
        this.calculatedProbabilities = probabilities;
    }

    probabilityOfEffect(pool: IAttackPool): number {
        return 1;
    }

    canBeApplied(pool: AttackPool): boolean {
        // In general these effects are assumed to be always able to be used
        // if they are included in the calculation.
        return this.enabled;
    }

    private nullDieFactory: () => DieRoll = () => { return null; }
    private getDieFactoryForDieType(dieType: DieType): () => DieRoll {
        if (dieType == DieType.Red) {
            return () => { return DieRoll.RedDieRoll() }
        }
        else if (dieType == DieType.Blue) {
            return () => { return DieRoll.BlueDieRoll() }
        }
        else if (dieType == DieType.Black) {
            return () => { return DieRoll.BlackDieRoll() }
        }
        return this.nullDieFactory;
    }

    sortedDicePool(rolls: DieRoll[]): DieRoll[] {
        return rolls.sort((a, b) => {
            let am = a.modificationScore();
            let bm = b.modificationScore();
            if (am < bm) return -1;
            if (am > bm) return 1;
            return 0;
        })
    }

    apply(pool: AttackPool): IAttackPool {
        let p = pool.clone();
        let replacedDice = 0;
        let factory = this.getDieFactoryForDieType(this.preferredType);
        let typePools = [
            this.sortedDicePool(pool.diceOfType(DieType.Red)),
            this.sortedDicePool(pool.diceOfType(DieType.Blue)),
            this.sortedDicePool(pool.diceOfType(DieType.Black))
        ];
        for (const typePool of typePools) {
            for (const die of typePool) {
                let newDie = factory();
                p.dieRolls.splice(p.dieRolls.indexOf(
                    p.dieRolls.find(x => x.type === die.type && x.modificationScore() === die.modificationScore())), 1);
                p.dieRolls.push(newDie);
                replacedDice += 1;
                if (replacedDice === this.dieCount) {
                    return p;
                };
            }
        }
        return p;
    }
}