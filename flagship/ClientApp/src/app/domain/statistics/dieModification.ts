import { AttackPool, IAttackPool } from './attackPool';

export enum ModificationType {
    Addition,
    Reroll
}

export interface IDieModification {
    name: string;
    type: ModificationType;
    apply(pool: AttackPool): IAttackPool;
    canBeApplied(pool: AttackPool): boolean;
    enabled: boolean;
    orderable: boolean;
    order: number;
}
