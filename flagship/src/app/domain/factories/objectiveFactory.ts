import { ObjectiveType, Objective } from '../objective';

export class ObjectiveFactory {

    private objectives: Objective[] = [
        // Assault 
        new Objective(1, ObjectiveType.Assault, "Advanced Gunnery",
            "After deploying fleets, each player chooses 1 of his ships to be an objective ship, starting with the first player.",
            `The first player's objective ship may perform each of its attacks from the same hull zone. 
            It cannot target the same hull zone or squadron more than once each round with that hull zone.
            The second player's objective ship may perform each of its attacks from the same hull zone, and 
            it may do so against the same target.`,
            null, `The fleet point cost of a destroyed objective ship is doubled. Do not double the cost of its upgrade cards.`, null),
        new Objective(2, ObjectiveType.Assault, "Blockade Run",
            `The 3' edges of the play area become the player edges. Each player's deployment zone is within 2 range ruler lengths of his edge. 
            The second player places all obstacles. Obstacles must be placed beyond 2 range ruler lengths of both player edges, 
            and beyond distance 1 of other obstacles.`,
            `The second player assigns 1 objective token to each of his ships. When a ship with an objective token is destroyed, 
            the first player gains 1 victory token.`,
            null, `The second player gains 1 victory token for each ship with an objective token within the first player's deployment zone.`, 20),
        new Objective(3, ObjectiveType.Assault, "Close-Range Intel Scan",
            `Place obstacles, adding the 2 dust fields, as normal.`,
            `While one of the second player's ships is attacking a ship, the attacker may spend 1 die with an Accuracy icon. If it does, the attacker's owner gains 1 victory token.
            While one of the first player's ships is attacking a ship, the attacker may spend 2 dice with Accuracy icons. If it does, the attacker's owner gains 1 victory token.`,
            null, null, 10),
        new Objective(4, ObjectiveType.Assault, "Ion Storm",
            `The second player places all obstacles, excluding the station beyond distance 5 of player edges.`,
            `When a ship without an objective token ends its movement beyond distance 1 of any obstacles, assign 1 objective token to that ship. 
            If that ship belongs to the second player, it must be beyond distance 1-2 of any obstacles. When a ship resolves an engineering command, 
            it may discard its objective token.

            Each ship has the following critical effect:
            
            Critical: If the defender has an objective token, the attacking ship's owner gains 1 victory token. Then choose and discard 1 command token from the defender. If the defender does not have any command tokens, the defending hull zone loses 1 shield instead.`,
            null, null, 15),
        new Objective(5, ObjectiveType.Assault, "Marked For Destruction",
            `Place obstacles as normal, adding the 2 dust fields ans excluding the station and asteroid fields. 
            Then the second player places the 2 purrgil in the setup area. Each purrgil must be placed beyond distance 1 of all obstacles and beyond 5 
            of both player's edges.`,
            `Each ship has the following critical effect:
            Critical: If this attack is at close-medium range, remove all objective tokens from enemy ships. Then assign an objective token to the attacker.
            After a player moves a purrgil, if that purrgil is at distance 1 of a ship with an objective token, that player may choose and discard 1 objective token. 
            Then that ship suffers 1 facedown damage and the opposing fleet's owner gains 1 victory token.`,
            null, null, 15),
        new Objective(6, ObjectiveType.Assault, "Most Wanted",
            `After deploying fleets, the second player chooses 1 of his ships and 1 of the first player's ships to be the objective ships.`,
            `While attacking an objective ship, the attacker may add 1 die of any color that is already in its attack pool to its attack pool.`,
            null,
            `The fleet point cost of a destroyed objective ship is doubled. Do not double the cost of its upgrade cards.`,
            null),
        new Objective(7, ObjectiveType.Assault, "Opening Salvo",
            `After deploying fleets, assign 1 objective token to each ship.`,
            `The first time a ship performs an attack against another ship, discard the attacker's objective token. If the attacker belongs to the 
            first player, he adds 2 red dice to the attack pool. If the attacker belongs to the second player, he adds 2 dice, each of any color, 
            to the attack pool.`,
            null,
            `Each player increases his final score by half the fleet point cost of each enemy ship in the play area that has at least 1 damage card, rounded up.`,
            null),
        new Objective(8, ObjectiveType.Assault, "Precision Strike",
            `After deploying fleets, each of the second player's ship gains a concentrate fire token.`,
            `When a squadron with Bomber or a ship is attacking, it may spend one die with a hit icon to flip one random facedown damage card on 
            the defender faceup. After a squadron with Bomber or a ship performs an attack, its owner gains one victory token for each damage card 
            that was dealt faceup or flipped faceup during that attack.`,
            null,
            null,
            15),
        new Objective(9, ObjectiveType.Assault, "Rift Assault",
            `Place obstacles as normal, excluding the station and adding the gravity rift.`,
            `While a ship is attacking, if the defender is beyond distance 1 of any obstacles and the defender does not have an objective token, 
            the attacker can spend 1 die to assign an objective token to the defender. Then, the attacker's owner gains 1 victory token. While a 
            ship with an objective token is defending, during the Resolve Attack Effects step, the attacker can discard that objective token to 
            change 1 die to a face with an accuracy icon or 1 hit icon and no other icons. If the attacker belongs to the second player, it can 
            change 1 die to a face with any icon.`,
            `Each ship at distance 1-2 of the gravity rift that is at speed-1 or lower suffers 1 facedown damage card.`,
            ``,
            10),
        new Objective(10, ObjectiveType.Assault, "Station Assault",
            `Place obstacles as normal, excluding the station. Then the second player places 2 stations in the setup area. Each station must be 
            placed beyond distance 1 of all obstacles and beyond distance 3 of both players' edges. Both stations are Unarmed Stations; place 
            both Unarmed Station cards near the second player's ship cards.`,
            `The first player's ships and squadrons cannot resolve an unarmed station's effect to discard damage cards or recover hull points when they overlap it.	`,
            null,
            `The second player gains 1 victory token for each unarmed station that is not destroyed. The first player gains 1 victory token for 
            each unarmed station that is destroyed.`,
            40),
        new Objective(11, ObjectiveType.Assault, "Surprise Attack",
            `The second player places the station at distance 1-5 of the first player's player edge. Then, place the remaining obstacles as normal. 
            While deploying fleets, the first player must deploy their flagship before deploying any other ships, and must deploy their flagship 
            overlapping the station, but it can be beyond their deployment zone. The first player cannot deploy any ship at a speed greater than 
            half of that ship's maximum speed (rounded up). After deploying fleets, the second player places 3 facedown command dials in a stack on this card.`,
            `At the start of the Ship Phase during the first, second, and third rounds, the second player reveals the top command dial on this card,
            and each of the first player's ships gains a raid token matching that dial.`,
            null,
            null,
            null),
        new Objective(12, ObjectiveType.Assault, "Targeting Beacons",
            `After placing obstacles, the players alternate placing a total of 4 objective tokens in the setup area, starting with the second player.`,
            `While one of the second player's ships is attacking a ship that is at distance 1-2 of an objective token, the attacker may reroll up to 
            2 attack dice in the attack pool.`,
            null,
            null,
            null),
        // Defense
        new Objective(101, ObjectiveType.Defense, "Capture the VIP",
            "After placing obstacles, the second player places 1 objective token at distance 1 of any obstacle and beyond distance 5 of all edges of the setup area.",
            `When a ship at distance 1 of the objective token reveals a command dial, the ship's owner may remove that objective token from the play area and place it on that ship's card. 
            When a ship with the objective token on its ship card is destroyed, the opposing player places the objective token in the play area touching the destroyed ship's base.`,
            null, `If a player's ship has the objective token, that player gains 1 victory token.`, 50),
        new Objective(102, ObjectiveType.Defense, "Abandoned Mining Facility",
            `The second player places the station in the center of the setup area. Then, starting with the second player, the players alternate placing
             the remaining obstacles, adding the 2 purrgil and 2 dust field obstacles and excluding the asteroid fields, at distance 2-5 of the station. 
             After deploying fleets, each of the second player's ships gains an engineering token.`,
            `Each ship can resolve the following effect: Engineering: You may spend engineering points to gain victory tokens from 1 obstacle. 
            If you are at distance 1 of a station, gain 1 token for each 3 points you spend. If you are at distance 1 of a dust field, gain 1 token 
            for each 2 points you spend. Then, if that obstacle is a dust field and you gained more than 1 victory token, remove that obstacle from the play area.`,
            null,
            null,
            10),
        new Objective(103, ObjectiveType.Defense, "Asteroid Tactics",
            `The second player places all obstacles, excluding the station.`,
            `When 1 of the first players ships or unique squadrons overlaps an asteroid field, it may recover 1 of its non-Scatter defense 
            tokens. That token must be exhausted. When 1 of the second player's ships or unique squadrons overlaps an asteroid field that 
            obstacle has no effect and that ship or squadron may recover 1 of its non-Scatter defense tokens or may ready 1 of its defense tokens.
            After an exogorth performs anti-squadron attacks (even if it does not attack), remove it from the play area.`,
            `The second player places the 2 exogorth obstacles each touching a different obstacle.`,
            null,
            null),
        new Objective(104, ObjectiveType.Defense, "Contested Outpost",
            `Place obstacles as normal excluding the station. Then the second player places the station in the setup area beyond distance 
            one of all obstacles and beyond distance five of both players edges.`,
            `The station does not obstruct attacks and does not have the ability to discard damage cards or recover hull points.`,
            `Each player sums the command values or his ships at distance one of the station. The player with the highest total gains one victory token.`,
            null,
            20),
        new Objective(105, ObjectiveType.Defense, "Fighter Ambush",
            `Before deploying fleets, the second player sets aside all of his squadrons.
            After deploying fleets, the second player deploys all of his squadrons. Each of his squadrons can be placed as normal
            or at distance 1 of an obstacle, but all his squadrons must be beyond distance 5 of the first player's edge.`,
            `After a squadrons performs an attack against a ship, if the defender was dealt at least 1 damage card, the squadron's owner gains 1 victory token.`,
            null,
            null,
            15),
        new Objective(106, ObjectiveType.Defense, "Fire Lanes",
            `After placing obstacles, the second player places three objective tokens in the setup area beyond distance 4 of both players edges. 
            Then the first player may move each objective token to within distance 1-2 of its current location.`,
            null,
            `Each player gains one victory token for each objective token he controls. To determine control of each token, players measure attack 
            range and line of sight from each of their ships hull zones as if performing attacks with battery armaments targetting that objective token. 
            The player with the highest total number of dice in his combined attack pools controls that token. If a players ship or squadron overlaps an 
            objective token, his opponent controls that token; if both players ships or squadrons overlap the same token, neither player controls it.`,
            null,
            15),
        new Objective(107, ObjectiveType.Defense, "Fleet Ambush",
            `The portion of the setup area that is beyond distance 5 of any edge of the setup area is the Ambush Zone. Players mark 
            the corners of the ambush zone with objective tokens. Players take turns deploying fleets as normal, but must deploy all ships 
            before deploying any squadrons. The first player must deploy ships within the ambush zone on his odd-numbered deployment turns, 
            starting with his first turn. He cannot deploy ships or squadrons overlapping obstacles in the ambush zone. After setup is complete, 
            he removes all objective tokens from the play area.`,
            null, null, null,
            null),
        new Objective(108, ObjectiveType.Defense, "Fleet in Being",
            `After deploying fleets, the first player assigns each of their ships 1 objective token. Then the second player assigns each of their
            ships a number of objective tokens equal to that ship's command value.`,
            `When a ship with an objective token is declared as the target of an attack, it may discard 1 objective token to ready 1 of its exhausted defense tokens.`,
            `If a ship is at distance 1-5 of 1 of the 3' edges of the play area, or at distance 1-3 of a player edge, remove 1 objective token from that ship.`,
            `Each player gains 1 victory token for each enemy ship in the play area that does not have an objective token.`,
            15),
        new Objective(109, ObjectiveType.Defense, "Hyperspace Assault",
            `Before deploying fleets, the second player sets aside one of his small or medium ships and upto three of his squadrons; he does not
            deploy them during setup. Then he places three objective tokens in the play area beyond distance three of both players edges.`,
            `At the start of any round after the first round, the second player can deploy the ship and squadrons that he set aside at distance 1 
            of one objective token. Then remove all objective tokens. The ship can be deployed overlapping squadrons. The first player places those 
            squadrons, as though the ship had overlapped them while executing a maneuver. If the second player does not deploy, he may move objective 
            token to within distance one of its current position.`,
            null, null,
            null),
        new Objective(110, ObjectiveType.Defense, "Jamming Barrier",
            `Place obstacles as normal, excluding the station and replacing the 2 debris fields with the 2 dust fields. After deploying fleets, 
            the second player places 2 objective tokens in the setup area at distance 1-5 of each other.`,
            `While attacking, if line of sight is traced across the line between the 2 objective tokens, the attacker must choose and remove 
            half of the dice from the attack pool, rounded down, before rolling.`,
            null, null,
            null),
        new Objective(111, ObjectiveType.Defense, "Planetary Ion Cannon",
            `After placing obstacles, the second player places 3 objective tokens in the play area beyond distance 5 of both players' edges.`,
            `At the end of the Command Phase, the second player may choose 1 enemy ship at distance 1-3 of an objective token and remove that 
            token from the play area to perform an attack against that ship. The attacker is treated as if it is a ship with a battery armament of 
            4 blue dice, but is not friendly to any ship or squadron. The attack is treated as being at medium range, cannot be obstructed, can 
            target any of the defender's hull zones, and has the following critical effect:
            Blue Critical: The defender must choose and exhaust 1 of his defense tokens.`,
            null, null,
            null),
        new Objective(112, ObjectiveType.Defense, "Rift Ambush",
            `The second player places all obstacles, excluding the station and adding the gravity rift and 2 dust fields. The gravity rift must 
            be placed beyond distance 5 of both players' edges. After deploying fleets, the second player may choose 1 enemy ship. That ship must 
            execute a speed-1 maneuver with a yaw of "-". Then, the second player may increase or decrease that ship's speed by 1, to a minimum of speed 0.`,
            `Once per activation, after a ship executes a maneuver, if it is at distance 1-2 of the gravity rift, it must execute a speed-1 maneuver
            with a yaw of "-".  If that ship belongs to the second player, it may use its speed-1 yaw value. The gravity rift does not have the
            ability to temporarily reduce that ship's speed during this maneuver.`,
            null, null,
            null),
        // Navigation
        new Objective(200, ObjectiveType.Navigation, "",
            ``,
            ``,
            ``,
            ``,
            null),
        new Objective(200, ObjectiveType.Navigation, "",
            ``,
            ``,
            ``,
            ``,
            null),
        new Objective(200, ObjectiveType.Navigation, "",
            ``,
            ``,
            ``,
            ``,
            null),
        new Objective(200, ObjectiveType.Navigation, "",
            ``,
            ``,
            ``,
            ``,
            null),
        new Objective(200, ObjectiveType.Navigation, "",
            ``,
            ``,
            ``,
            ``,
            null),
        new Objective(200, ObjectiveType.Navigation, "",
            ``,
            ``,
            ``,
            ``,
            null),
        new Objective(200, ObjectiveType.Navigation, "",
            ``,
            ``,
            ``,
            ``,
            null),
        new Objective(200, ObjectiveType.Navigation, "",
            ``,
            ``,
            ``,
            ``,
            null),
        new Objective(200, ObjectiveType.Navigation, "",
            ``,
            ``,
            ``,
            ``,
            null),
        new Objective(200, ObjectiveType.Navigation, "",
            ``,
            ``,
            ``,
            ``,
            null),
        new Objective(200, ObjectiveType.Navigation, "",
            ``,
            ``,
            ``,
            ``,
            null),
        new Objective(200, ObjectiveType.Navigation, "",
            ``,
            ``,
            ``,
            ``,
            null),
        // Campaign
        // Special
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