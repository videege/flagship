

export class NavigationChart {

    constructor(public speedOne: number,
     public speedTwo: [number, number],
     public speedThree: [number, number, number],
     public speedFour: [number, number, number, number]) {

    }

    getSpeeds(): number[][] {
        return [[this.speedOne], this.speedTwo, this.speedThree, this.speedFour].filter(x => x != null);
    }

    topSpeed(): number {
        let speeds = [this.speedFour, this.speedThree, this.speedTwo, this.speedOne];
        for (let index = 0; index < speeds.length; index++) {
            if (!speeds[index]) {
                return 4 - index;
            }
        }
        return 0;
    }
}