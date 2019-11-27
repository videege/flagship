import { AttackPool, IAttackPool, Range } from './attackPool';

export enum ModificationType {
    Addition,
    Reroll,
    Replacement
}

export interface ICalculatedProbabilities {
    long: number;
    medium: number;
    close: number;
}

export interface IDieModification {
    name: string;
    type: ModificationType;
    rangeRestriction: Range;
    
    apply(pool: AttackPool): IAttackPool;
    canBeApplied(pool: AttackPool): boolean;
    probabilityOfEffect(pool: IAttackPool): number;
    enabled: boolean;
    orderable: boolean;
    order: number;
    calculatedProbabilities: ICalculatedProbabilities;
    setCalculatedProbabilities(probabilities: ICalculatedProbabilities);
}

