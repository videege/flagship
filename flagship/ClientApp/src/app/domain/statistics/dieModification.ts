import { AttackPool, IAttackPool } from './attackPool';

export interface IDieModification {
    name: string;
    apply(pool: AttackPool): IAttackPool;
    canBeApplied(pool: AttackPool): boolean;
}
