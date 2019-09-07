import { IDieModification, ModificationType } from '../dieModification';
import { AttackPool, IAttackPool } from '../attackPool';
import { DieType } from '../dieRoll';
import { RerollStrategy } from './rerollStrategy';
import { RerollModification } from './rerollModification';


export class GenericRerollModification extends RerollModification {

    constructor(strategy: RerollStrategy, public name: string, private numberOfDice: number, private dieType: DieType,
        public type: ModificationType = ModificationType.Reroll) {
        super(strategy, type);
    }

    canBeApplied(pool: AttackPool): boolean {
        // In general these effects are assumed to be always able to be used
        // if they are included in the calculation.
        return this.enabled;
    }

    apply(pool: AttackPool): IAttackPool {
        // Determine the subset of dice we can reroll as part of this effect
        let rerollableRolls = this.dieType === DieType.Any 
            ? pool.dieRolls
            : pool.dieRolls.filter(x => x.type === this.dieType);

        // Filter further based on the number of rolls allowed
        if (this.numberOfDice > 0 && rerollableRolls.length > this.numberOfDice) {
            // This assumes that the dice are all of the same type (may need to refine
            // this for effects that allow you to choose 1 of any type)
            rerollableRolls = rerollableRolls.slice(0, this.numberOfDice);
        }

        // Reroll the selected dice
        this.rerollDice(rerollableRolls);
        return pool;
    }
}
