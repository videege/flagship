import { IDieModification, ModificationType } from '../dieModification';
import { AttackPool, IAttackPool, Range } from '../attackPool';
import { DieType, DieRoll } from '../dieRoll';
import { RerollStrategy } from './rerollStrategy';
import { RerollModification } from './rerollModification';


export class GenericRerollModification extends RerollModification {

    constructor(strategy: RerollStrategy, public name: string, public order: number,
        private numberOfDice: number, private dieType: DieType,
        rangeRestriction: Range = null,
        type: ModificationType = ModificationType.Reroll) {
        super(strategy, order, rangeRestriction, type);
    }

    canBeApplied(pool: AttackPool): boolean {
        // In general these effects are assumed to be always able to be used
        // if they are included in the calculation.

        if (this.rangeRestriction && (pool.range & this.rangeRestriction) == 0) {
            return false;
        }
        return this.enabled;
    }


    probabilityOfEffect(pool: IAttackPool): number {
        return 1; // reroll assumed to be without cost so 100%
    } 

    apply(pool: AttackPool): IAttackPool {
        // Determine the subset of dice we can reroll as part of this effect
        let rerollableRolls = this.dieType === DieType.Any 
            ? pool.dieRolls
            : pool.dieRolls.filter(x => x.type === this.dieType);
        let nonRerolledDice = this.dieType === DieType.Any 
        ? []
        : pool.dieRolls.filter(x => x.type !== this.dieType);

        // Filter further based on the number of rolls allowed
        if (this.numberOfDice > 0 && rerollableRolls.length > this.numberOfDice) {
            // This assumes that the dice are all of the same type (may need to refine
            // this for effects that allow you to choose 1 of any type)
            let subset = rerollableRolls.slice(0, this.numberOfDice);
            nonRerolledDice = nonRerolledDice.concat(rerollableRolls.slice(this.numberOfDice));
            rerollableRolls = subset;
        }
        // Reroll the selected dice
        let rerolledDice = this.rerollDice(rerollableRolls);
        return new AttackPool(nonRerolledDice.concat(rerolledDice), pool.firingArc, pool.range);
    }
}
