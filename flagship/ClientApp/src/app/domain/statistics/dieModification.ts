import { AttackPool } from './attackPool';

export interface IDieModification {
    modify(pool: AttackPool): AttackPool;
}