import { ObjectiveType, Objective } from '../objective';

export class ObjectiveFactory {

    private objectives: Objective[] = [
        new Objective(1, ObjectiveType.Assault, "Advanced Gunnery",
            "After deploying fleets, each player chooses 1 of his ships to be an objective ship, starting with the first player.",
            `The first player's objective ship may perform each of its attacks from the same hull zone. 
            It cannot target the same hull zone or squadron more than once each round with that hull zone.
            The second player's objective ship may perform each of its attacks from the same hull zone, and 
            it may do so against the same target.`,
            null, `The fleet point cost of a destroyed objective ship is doubled. Do not double the cost of its upgrade cards.`, null),
        new Objective(101, ObjectiveType.Defense, "Capture the VIP",
            "After placing obstacles, the second player places 1 objective token at distance 1 of any obstacle and beyond distance 5 of all edges of the setup area.",
            `When a ship at distance 1 of the objective token reveals a command dial, the ship's owner may remove that objective token from the play area and place it on that ship's card. 
            When a ship with the objective token on its ship card is destroyed, the opposing player places the objective token in the play area touching the destroyed ship's base.`,
            null, `If a player's ship has the objective token, that player gains 1 victory token.`, 50)
    ]

    constructor() {

    }

    getObjectives(type: ObjectiveType) {
        return this.objectives.filter(o => o.type === type);
    }

    getObjective(id: number) {
        return this.objectives.find(o => o.id === id);
    }
}