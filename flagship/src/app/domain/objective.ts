
export enum ObjectiveType {
    Assault = "Assault", //red
    Defense = "Defense", //yellow
    Navigation = "Navigation", //blue
    Special = "Special" //green
}

export class Objective {

    constructor(public id: number, public type: ObjectiveType, public name: string,
        public setup: string, public specialRule: string, public roundEnd: string, 
        public gameEnd: string, public points: number) {

        }
}