import { Armament } from '../armament';
import { IRerollEffect } from './rerollEffect';
import { AttackPool } from './attackPool';
import { IDieModification } from './dieModification';


export interface IDiceProbabilities {
    averageDamage: number;
    averageAccuracies: number;
    averageCriticals: number;
    averageBlanks: number;
}

export enum RerollStrategy {
    BlanksOnly,
    BlanksAndAccuracies,
    Greedy
}

export class Calculator {
    constructor() {

    }

    applyModifications(pool: AttackPool, modifications: IDieModification[]) {
        for (const modification of modifications) {
            modification.modify(pool);
        }
    }
}