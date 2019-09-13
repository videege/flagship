import { AttackPool, IAttackPool } from './attackPool';

export enum ModificationType {
    Addition,
    Reroll
}

export interface ICalculatedProbabilities {
    long: number;
    medium: number;
    close: number;
}

export interface IDieModification {
    name: string;
    type: ModificationType;
    apply(pool: AttackPool): IAttackPool;
    canBeApplied(pool: AttackPool): boolean;
    probabilityOfEffect(pool: IAttackPool): number;
    enabled: boolean;
    orderable: boolean;
    order: number;
    calculatedProbabilities: ICalculatedProbabilities;
    setCalculatedProbabilities(probabilities: ICalculatedProbabilities);
}

