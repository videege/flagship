
export enum DieType {
    Red = "Red",
    Blue = "Blue",
    Black = "Black",
    Any = "Any"
}

export interface IDieRoll {
    pHit: number;
    pDoubleHit: number;
    pHitCrit: number;
    pCrit: number;
    pAccuracy: number;
    pBlank: number;
    type: DieType;
}

export class DieRoll implements IDieRoll {

    public baseProbability: IDieRoll;

    constructor(public type: DieType, public pHit: number,
        public pDoubleHit: number, public pHitCrit: number,
        public pCrit: number, public pAccuracy: number,
        public pBlank: number) {
        this.baseProbability = {
            type: this.type,
            pHit: this.pHit,
            pDoubleHit: this.pDoubleHit,
            pHitCrit: this.pHitCrit,
            pCrit: this.pCrit,
            pAccuracy: this.pAccuracy,
            pBlank: this.pBlank
        };
    }

    validate() {
        let totalProbability = this.pBlank + this.pAccuracy +
            this.pCrit + this.pDoubleHit + this.pHit + this.pHitCrit;
        
        if (totalProbability !== 1) {
            console.log(`Die validation error! ${this.type} die got P = ${totalProbability}`);
        }
    }

    static RedDieRoll(): DieRoll {
        return new DieRoll(DieType.Red,
            0.25, 0.125, 0, 0.25, 0.125, 0.25);
    }

    static BlueDieRoll(): DieRoll {
        return new DieRoll(DieType.Blue,
            0.5, 0, 0, .25, .25, 0);
    }

    static BlackDieRoll(): DieRoll {
        return new DieRoll(DieType.Black,
            0.5, 0, 0.25, 0, 0, 0.25);
    }
}