import { Armament } from '../armament';
import { AttackPool, IAttackPool } from './attackPool';
import { IDieModification } from './dieModification';
import { FiringArc } from './firingArc';

export class Calculator {
    public closeRangePool: IAttackPool;
    public mediumRangePool: IAttackPool;
    public longRangePool: IAttackPool;

    constructor(private armament: Armament, private modifications: IDieModification[], 
        private firingArc: FiringArc) {
        this.closeRangePool = AttackPool.FromNumberOfDice(armament.redDice, armament.blueDice, armament.blackDice, firingArc);
        this.mediumRangePool = AttackPool.FromNumberOfDice(armament.redDice, armament.blueDice, 0, firingArc);
        this.longRangePool = AttackPool.FromNumberOfDice(armament.redDice, 0, 0, firingArc);
    }

    applyModifications() {
        for (const modification of this.modifications) {
            this.closeRangePool = this.closeRangePool.modify(modification);
            this.mediumRangePool = this.mediumRangePool.modify(modification);
            this.longRangePool = this.longRangePool.modify(modification);
        }
    }
}