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
        new Objective(201, ObjectiveType.Navigation, "Dangerous Territory",
            `Obstacles must be placed in the setup area beyond distance 5 of both players' edges. After placing obstacles, place 1 objective 
            token on each obstacle.`,
            `When a ship overlaps an obstacle, the ship's owner may remove the objective token on that obstacle to gain 1 victory token.
            When one of the second player's ships overlaps an asteroid field or debris field, that obstacle has no effect.`,
            null, null,
            15),
        new Objective(202, ObjectiveType.Navigation, "Doomed Station",
            `The second player places the gravity rift in the center of the setup area. Then, starting with the first player, the players 
            alternate placing the remaining obstacles, excluding the station in the setup area beyond distance 1 of all obstacles and 
            beyond distance 5 of both player's edges.`,
            null,
            `Starting with the second player and alternating, each player chooses 1 obstacle that does not have an objective token on it 
            and moves it to (sic) within distance 1-2 of its current location toward the gravity rift (which cannot be chosen). Then that 
            player places an objective token on that obstacle. When an obstacle touches the gravity rift, that obstacle is removed from the play area.
            After all obstacles are moved, each player sums the command values of their ships at distance 1 of the station. The player with the highest 
            total gains 1 victory token. Then remove all objectives tokens from the play area.`,
            ``,
            20),
        new Objective(203, ObjectiveType.Navigation, "Hyperspace Migration",
            `Place obstacles as normal, excluding the station. Then, the second player places 1 objective token in the play area at distance 1 of a 
            3' edge, and then places 1 objective token at distance 1 of the opposite 3' edge.`,
            `At the start of the Ship Phase of the first and third rounds, the second player places 1 purrgil not in the play area at distance 1 
            of 1 objective token (the objective token must be the same during both rounds).
            When a purrgil moves, it must move toward the objective token at the opposite 3' edge. When a purrgil touches that objective token, 
            that purrgil is removed from the play area.`,
            `If a ship has 1 objective token on it, remove the token and that ship's owner gains 1 victory token. If a ship is at distance 1 
            from a purrgil and has no objective tokens on it, place 1 objective token on the ship.`,
            null,
            20),
        new Objective(204, ObjectiveType.Navigation, "Infested Fields",
            `Place obstacles as normal, excluding the station. After placing obstacles, place 1 objective token on each obstacle. Then the 
            second player places 2 exogorth obstacles, each touching a different obstacle.`,
            `When a ship or squadron overlaps an obstacle, that ship or squadron's owner may remove the objective token on the obstacle to gain 1 victory token.
            After the start of each squadrons phase (after exogorths perform attacks), remove each exogorth from the play area. Then the second 
            player moves the obstacle each exogorth was touching to within distance 1-2 of its current location.`,
            `For each exogorth obstacle not in the play area, the second player chooses an obstacle and place 1 exogorth touching that obstacle.`,
            null,
            15),
        new Objective(205, ObjectiveType.Navigation, "Intel Sweep",
            `After placing obstacles the players alternate placing a total of 5 objective tokens in the setup area, starting with the 
            second player. Each token must be placed in the play area beyond distance 5 of both players' edges and beyond distance 3 
            of all other objective tokens. Then each player chooses one of his ships to be an objective ship, starting with the first player.`,
            `When a player's objective ship reveals a command dial, that player may choose 1 objective token at a distance of 1 of that ship and 
            remove it from the play area to gain 1 victory token.`,
            null,
            `If a player has more victory tokens than his opponent, increase his final score by 75.`,
            null),
        new Objective(206, ObjectiveType.Navigation, "Minefields",
            `The second player places all obstacles. He can place them anywhere in the setup area (even in deployment zones) and must place them 
            beyond distance 5 of each other. Then he places 6 objective tokens. Each objective token must be placed at distance 1 of an obstacle 
            and beyond distance 1 of all other objective tokens.`,
            `If a ship ends its movement at distance 1 of an objective token, remove that objective token from the play area and roll 2 blue dice. 
            That ship is dealt 1 facedown damage card for each hit or critical icon rolled. If there is at least one critical icon, deal the 
            first damage card faceup.`,
            null, null,
            null),
        new Objective(207, ObjectiveType.Navigation, "Navigational Hazards",
            `Place obstacles as normal, excluding the station. Then the second player places the station in the setup area beyond distance 
            1 of all obstacles and beyond distance 5 of both players' edges of the play area.`,
            `When a ship overlaps an obstacle and suffers 1 or more damage or is dealt 1 or more damage cards, the opposing fleet's owner gains 1 victory token.`,
            `Starting with the second player and alternating, each player chooses 1 asteroid or debris field that does not have an objective token on it, 
            and moves it to within distance 1-2 of its current location. Then, he places an objective token on that obstacle. An obstacle cannot be moved 
            so that it overlaps a ship, squadron, or other obstacle. At the start of the next round, remove all objective tokens from the play area.`,
            null,
            15),
        new Objective(208, ObjectiveType.Navigation, "Salvage Run",
            `The second player places the station in the center of the play area. Then, starting with the second player, the players alternate placing 
            the remaining obstacles, adding the 2 dust field obstacles, at distance 1-5 of the station. After placing obstacles, the second player places 
            a total of 4 objective tokens in the setup area. Each token must be at distance 1 of the station and beyond distance 1 of all other objective tokens.
            After deploying fleets, each of the second player's ships gain a Navigate token.`,
            `When a player's ship reveals a command dial, that player may chose 1 objective token at distance 1 of that ship and remove it from the 
            play area to gain 1 victory token.`,
            null, null,
            20),
        new Objective(209, ObjectiveType.Navigation, "Sensor Net",
            `After placing obstacles, the players alternate placing a total of 4 objective tokens in the setup area, starting with the first player. 
            Each token must be placed in the setup area beyond distance 5 of both players' edges and beyond distance 3 of all other objective tokens.`,
            `When a ship reveals a command dial, if it is at distance 1 of at least 1 objective token, its owner gains 1 victory token.
            Then its owner chooses 1 of those objective tokens. The opposing player must move that token so it is at distance 1-2 of its current 
            location. If he is the second player, he moves it so it is at distance 1-4 of its current location.`,
            null, null,
            15),
        new Objective(210, ObjectiveType.Navigation, "Solor Corona",
            `The first player must deploy all of his ships and squadrons before the second player. After the second player deploys ships and 
            squadrons, the second player must choose 1 of the 3' edges of the play area to be the Corona.`,
            `While a ship is attacking, before resolving any attack effects, if any portion of the Corona is inside the attacking hull zone's 
            firing arc, the attacker must discard 1 die with a Accuracy icon from the attack pool, if able.`,
            null, null,
            null),
        new Objective(211, ObjectiveType.Navigation, "Superior Positions",
            `The first player must deploy all of his ships and squadrons before the second player.`,
            `After a ship or squadron performs an attack against the rear hull zone of another ship, if the defender 
            suffers at least one damage, the attacker's owner gains 1 victory token.`,
            null, null,
            15),
        new Objective(212, ObjectiveType.Navigation, "Volatile Deposits",
            `Place obstacles as normal, adding 2 dust fields and excluding the station.`,
            `While a ship is attacking a ship, the attacker can choose 1 obstacle at distance 1 of the defender, then resolve the following critical effect:
            Blue Critical: Each ship or squadron at distance 1 of the chosen obstacle suffers damage equal to half of the total number of critical icons 
            in your attack pool, rounded up. If the defender is one of the first player's ships, the attacker can resolve this effect with any critical icon.`,
            `For each asteroid field, each player sums the command values of their ships at distance 1. Then for each astroid field, the player 
            with the highest total gains 1 victory token.`,
            null,
            15),
        // Campaign
        new Objective(301, ObjectiveType.Campaign, "Base Defense: Armed Station",
            `Place obstacles as normal, excluding the station. Then, the second player places the station in the setup area beyond distance 1 of all obstacles and beyond distance 5 of the first player's edge. The station is an armed station; place the Armed Station card near the second player's ship cards.`,
            `The first player's ships and squadrons cannot resolve the armed stations effect to discard damage cards or recover hull points when they overlap it. Once per round, instead of activating a ship, the second player can perform 1 attack with the armed station.`,
            null,
            null,
            null),
        new Objective(302, ObjectiveType.Campaign, "Base Defense: Fighter Wing",
            `Before deploying fleets, the second player may choose up to 40 fleet points of additional non-unique squadrons 
            and add them to his fleet (even if it exceeds the number of fleet points he could normally spend on squadrons). 
            Assign squadron ID tokens of a different color to these squadrons.`,
            null,
            null,
            `The fleet point cost of the additional squadrons is added to the first player's score as normal if they are 
            destroyed. After the winner is determined, the second player removes the additional squadrons from his fleet.`,
            null),
        new Objective(303, ObjectiveType.Campaign, "Base Defense: Ion Cannon",
            `The second player must deploy all of his ships and squadrons before the first player. After deploying fleets, 
            the second player places 3 objective tokens anywhere in the play area.`,
            `At the end of the Command Phase, the second player may select 1 enemy ship at distance 1-3 of an objective
            token and perform an attack against that ship. The attacker is treated as if it is a ship with a battery armament of 4 blue dice,
            but is not friendly to any ship or squadron. The attack is treated as being at medium range, cannot be obstructed, 
            can target any of the defender's hull zones, and has the following critical effect: 
            Blue Critical: The defender must choose and exhaust 1 of his defense tokens.`,
            null,
            null,
            null),
        new Objective(304, ObjectiveType.Campaign, "Double Agent",
            `Place obstacles as normal, excluding the station. After deploying fleets, the second player 
            chooses one of their ships to be objective ship.`,
            `When the objective ship reveals a command dial, it may gain 1 matching command token without 
            spending the command dial. When the objective ship is destroyed, the opposing fleet's owner gains 
            1 victory token. Then the opposing player places the objective token in the play area at distance 
            1 of the destroyed ship. At the start of any round after the second round, if no player has a victory 
            token, the first player may remove the objective token from the objective ship and place the objective 
            token in the play area at distance 1 of that ship. When a ship overlaps the objective token, remove 
            the token from the play area. Then that ship becomes the objective ship and that ship's owner gains 1 
            victory token.`,
            null,
            null,
            10),
        new Objective(305, ObjectiveType.Campaign, "Hired Scum",
            `The second player places all obstacles, excluding the station. Then the second player chooses 3 
            obstacles and places 1 objective token on each. Before deploying fleets, the second player chooses 
            up to 40 points of non-unique, irregular squadrons and adds them to their fleet for this game. 
            These squadrons are scum and are set aside.`,
            `At the start of any round after the first round, the second player can deploy up to 2 of the 
            scum squadrons at distance 1 of an obstacle with an objective token. Then remove that objective 
            token and 1 other objective token, if able. While a scum squadron is defending, the attacker 
            may reroll 1 die for each friendly ship or squadron at distance 1 of the defender.`,
            null,
            null,
            null),
        new Objective(306, ObjectiveType.Campaign, "Holonet Override",
            `The second player places all obstacles. The station must be placed beyond distance 1 of all 
            obstacles and beyond distance 5 of both player's edges.`,
            `The station does not have the ability to discard damage cards or recover hull points. 
            Each ship can resolve the following effect:
            Engineering: If you are at distance 1-2 to the station you may spend engineering points to place 
            (or remove) objective tokens on this card. For each 2 points you spend, you may place (or remove) 1 objective token.
            When one of the second player's ships resolves this effect, that ship's owner gains 1 victory token 
            for each objective token it removes.`,
            null,
            `The first player gains 1 victory token for each objective token on this card.`,
            10),
        new Objective(307, ObjectiveType.Campaign, "Pilot Defection",
            `Before deploying fleets, the first player must choose 3 additional non-unique squadrons of the opposing 
            faction with a total value up to 40 points and add them to the second players fleet for this battle.`,
            `Once per game, at the start of any Squadron Phase, the first player may assign 1 objective token to 
            1 of the chosen squadrons. This squadron is the defector and is added to the first player's fleet for 
            the remainder of the game. When the defector ist destroyed, the second player gains 1 victory token.`,
            null,
            `If the defector is at distance 1 of one of the first player's ships and beyond distance 1 of enemy ships 
            or squadrons, the first player gains 1 victory token.`,
            25),
        new Objective(308, ObjectiveType.Campaign, "Prototype Recovery",
            `Before deploying fleets, the second player must choose 1 additional non-unique squadron 
            with a total value of 8-20 points. This is the prototype, and is set aside. After placing obstacles, 
            the first player places an objective token in the center of the play area.`,
            `When a ship at distance 1 of an objective token resolves a squadron command, instead of activating squardons, 
            that ship's owner may roll 1 blue die. If a critical icon is rolled, the prototype is added to the 
            player's fleet for the remainder of the game. If that ship belongs to the second player, the 
            prototype is added if a hit icon is rolled instead. Then the controlling player deploys the 
            prototype at distance 1 of the objective token and discards the token. While the prototype is attacking, 
            each critical icon adds 1 to the damage total.`,
            null,
            `If the prototype is in the play area, the controlling player gains 1 victory token.`,
            30),
        new Objective(309, ObjectiveType.Campaign, "Recruit Allies",
            `Place obstacles as normal, excluding the station. Before deploying fleets, the first player must 
            choose 30-50 fleet points of non-unique, irregular squadrons or ships with no upgrades equipped. 
            These forces are allies and are set aside. Then the second player places 1 objective token in 
            the play area beyond distance 5 of both players' edges.`,
            `At the end of the third round, each player sums the command value of their ships at distance 1 
            of the objective token. The player with the highest total adds the allies to their fleet for 
            the remainder of the game. Then that player deploys the allies at distance 1 of the objective token. 
            If the command value totals are equal, the second player adds the allies to their fleet.`,
            null,
            `The player controlling the allies adds the fleet value of allies remaining in the play area to their score.`,
            null),
        new Objective(310, ObjectiveType.Campaign, "Steal Supplies",
            `The second player places all obstables, excluding the station. Then the second player places the 
            station beyond distance 5 of both players edges and beyond distance 1 of other obstacles. 
            Then the second player places 6 objective tokens on this card.`,
            `When one of the first player's ships at distance 1 of the station reveals its command dial, 
            it may remove 1 objective token from this card and place it on that ship's card or a friendly 
            irregular squadron at distance 1 of that ship. A ship cannot have more objective tokens than 
            its command value. A squadron can only have 1 objective token on it. When a ship or squadron 
            with at least 1 objective token is destroyed the second player gains 1 victory token.`,
            null,
            `The first player gains 1 victory token for each objective token on their ships or squadrons that 
            are beyond distance 2 of enemy ships. The second player gains 1 victory token for each objective 
            token on this card.`,
            15),
        new Objective(311, ObjectiveType.Campaign, "Volatile Cargo",
            `Place obstacles as normal, excluding the station.`,
            `The second player chooses 3 of their ships or squadrons (at least 1 must be a ship) to be objective ships 
            or squadrons and assigns an objective token to each. The first player gains 1 victory token for each 
            objecive token that cannot be assigned. While an objective ship or squadron is defending, before it 
            suffers damage, it may reduce the total damage by 1. If the defender is destroyed during that attack, each 
            other ship and squadron at distance 1-2 of the defender suffers damage equal to half of the total number of 
            hit icons in the attack pool, rounded up. Then the first player gains 1 victory token.`,
            null,
            `The second player gains 2 victory tokens for each objective ship or squadron at distance 1-3 of the first player's edge.`,
            15),
        // Special
    ]

    constructor() {

    }

    getObjectives(type: ObjectiveType) {
        return this.objectives.filter(o => o.type === type);
    }

    getObjectivesByIds(ids: number[]) {
        return this.objectives.filter(o => ids.includes(o.id));
    }

    getObjectiveNamesForIds(ids: number[]): string[] {
        return this.objectives.filter(o => ids.indexOf(o.id) >= 0).map(o => o.name);
    }

    getObjective(id: number) {
        return this.objectives.find(o => o.id === id);
    }
}
