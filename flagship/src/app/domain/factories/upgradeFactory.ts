import { Upgrade, UpgradeData, UpgradeClass, SlotGrantingUpgradeData } from "../upgrade";
import { UpgradeType } from "../upgradeType";
import { Faction } from "../faction";
import { CommanderUpgrade } from '../upgrades/commanderUpgrade';
import { SlotGrantingUpgrade } from '../upgrades/slotGrantingUpgrade';

export class UpgradeFactory {
    upgradeData: UpgradeData[];

    instantiateUpgrade(id: number): Upgrade {
        let data = this.upgradeData.find(ud => ud.id === id);

        if (!data)
            return null;

        if (data.upgradeClass === UpgradeClass.Commander)
            return new CommanderUpgrade(data.id, data.name, data.faction,
                data.text, data.modification, data.points);

        if (data.upgradeClass === UpgradeClass.SlotGranting) {
            let slotData = <SlotGrantingUpgradeData>data;
            return new SlotGrantingUpgrade(slotData.id, slotData.name, slotData.type,
                slotData.faction, slotData.text, slotData.modification, slotData.points,
                slotData.unique, slotData.grantedType);
        }
        if (data.upgradeClass === UpgradeClass.Normal)
            return new Upgrade(data.id, data.name, data.type, data.faction,
                data.text, data.modification, data.points, data.unique);

        return null;
    }

    getUpgradesOfType(type: UpgradeType, faction: Faction): Upgrade[] {
        let data = this.upgradeData.filter(ud => ud.type === type &&
            (ud.faction === faction || ud.faction === Faction.Any));
        return data.map(d => this.instantiateUpgrade(d.id));
    }

    constructor() {
        this.upgradeData = [
            // Commanders
            {
                id: 1000, name: 'Grand Moff Tarkin', type: UpgradeType.Commander, faction: Faction.Empire,
                unique: true, modification: false, points: 38, upgradeClass: UpgradeClass.Commander,
                text: "At the start of each Ship Phase, you may choose 1 command. Each friendly ship gains a command token matching that command."
            },
            {
                id: 1001, name: 'Grand Admiral Thrawn', type: UpgradeType.Commander, faction: Faction.Empire,
                unique: true, modification: false, points: 32, upgradeClass: UpgradeClass.Commander,
                text: "After deploying fleets, place 3 facedown command dials on this card. At the start of each Ship Phase, you may reveal and discard 1 of those dials. If you do, until the end of the round, before each friendly ship activates, it gains 1 additional dial matching that discarded dial."
            },
            {
                id: 1002, name: 'Admiral Konstantine', type: UpgradeType.Commander, faction: Faction.Empire,
                unique: true, modification: false, points: 23, upgradeClass: UpgradeClass.Commander,
                text: "At the start of each Status Phase, for each enemy ship at distance 1-5 of at least 2 friendly medium or large ships, you may increase or decrease that enemy's ship speed by 1 to a minimum of 1."
            },
            {
                id: 1004, name: 'Admiral Motti', type: UpgradeType.Commander, faction: Faction.Empire,
                unique: true, modification: false, points: 24, upgradeClass: UpgradeClass.Commander,
                text: "The hull value of each friendly ship is increased according to its size class: small ship: 1, medium ship: 2, large ship: 3."
            },
            {
                id: 1005, name: 'Admiral Ozzel', type: UpgradeType.Commander, faction: Faction.Empire,
                unique: true, modification: false, points: 20, upgradeClass: UpgradeClass.Commander,
                text: "When a friendly ship resolves a navigate command, it may change its speed by an additional 1."
            },
            {
                id: 1006, name: 'Admiral Piett', type: UpgradeType.Commander, faction: Faction.Empire,
                unique: true, modification: false, points: 22, upgradeClass: UpgradeClass.Commander,
                text: "When a friendly ship spends only a command token to resolve a command, you may exhaust this card. If you do, that ship resolves that command as if it had spent a dial of the same type instead."
            },
            {
                id: 1007, name: 'Admiral Screed', type: UpgradeType.Commander, faction: Faction.Empire,
                unique: true, modification: false, points: 26, upgradeClass: UpgradeClass.Commander,
                text: "Once per activation, when a friendly ship is attacking, it may spend one die to change a die to a face with a critical icon."
            },
            {
                id: 1008, name: 'Admiral Sloane', type: UpgradeType.Commander, faction: Faction.Empire,
                unique: true, modification: false, points: 24, upgradeClass: UpgradeClass.Commander,
                text: "While a friendly squadron without Rogue is attacking, it may spend 1 die with an accuracy icon to choose and spend 1 of the defender's defense tokens. While attacking a ship, it may also reroll 1 die with a critical icon."
            },
            {
                id: 1009, name: 'Darth Vader', type: UpgradeType.Commander, faction: Faction.Empire,
                unique: true, modification: false, points: 36, upgradeClass: UpgradeClass.Commander,
                text: "While a friendly ship is attacking a ship, it may spend 1 defense token to reroll any number of dice in its attack pool."
            },
            {
                id: 1010, name: 'Emperor Palpatine', type: UpgradeType.Commander, faction: Faction.Empire,
                unique: true, modification: false, points: 35, upgradeClass: UpgradeClass.Commander,
                text: "After deploying fleets, place 1 defense token of each type on this card. At the start of each Ship Phase you may discard 1 of those tokens. If you do, until the end of the round, if an enemy ship or squadron spends a matching token during its Spend Defense Token step, discard that token."
            },
            {
                id: 1011, name: 'Moff Jerjerrod', type: UpgradeType.Commander, faction: Faction.Empire,
                unique: true, modification: false, points: 23, upgradeClass: UpgradeClass.Commander,
                text: "During a friendly ship's Determine Course step, it may suffer 1 damage to change the first yaw value of its current speed to \"II\" until the end of its activation."
            },
            {
                id: 1011, name: 'Emperor Palpatine', type: UpgradeType.Commander, faction: Faction.Empire,
                unique: true, modification: false, points: 35, upgradeClass: UpgradeClass.Commander,
                text: "After deploying fleets, place 1 defense token of each type on this card. At the start of each Ship Phase you may discard 1 of those tokens. If you do, until the end of the round, if an enemy ship or squadron spends a matching token during its Spend Defense Token step, discard that token."
            },
            {
                id: 1500, name: 'Admiral Ackbar', type: UpgradeType.Commander, faction: Faction.Rebels,
                unique: true, modification: false, points: 38, upgradeClass: UpgradeClass.Commander,
                text: "Before a friendly ship's Attack Step, it may choose to attack from only its left and right hull zones this round. If it does, it may add 2 red dice to its attack pool while attacking a ship."
            },
            {
                id: 1501, name: 'Admiral Raddus', type: UpgradeType.Commander, faction: Faction.Rebels,
                unique: true, modification: false, points: 26, upgradeClass: UpgradeClass.Commander,
                text: "Before deploying fleets, you may set aside 1 other friendly ship. At the start of any round, you may deploy that ship at distance 1 of a friendly ship. That ship cannot be deployed overlapping squadrons and cannot be the first ship to activate that round."
            },
            {
                id: 1502, name: 'Commander Sato', type: UpgradeType.Commander, faction: Faction.Rebels,
                unique: true, modification: false, points: 32, upgradeClass: UpgradeClass.Commander,
                text: "While a friendly ship is attacking a ship at distance 1 of a friendly squadron, before rolling attack dice, the attacker may replace up to 2 dice in its attack pool with an equal number of dice of any colors or color."
            },
            {
                id: 1503, name: 'Garm Bel Iblis', type: UpgradeType.Commander, faction: Faction.Rebels,
                unique: true, modification: false, points: 25, upgradeClass: UpgradeClass.Commander,
                text: "At the start of the first round and the fifth round, each friendly ship may gain a number of command tokens equal to its command value."
            },
            {
                id: 1504, name: 'General Cracken', type: UpgradeType.Commander, faction: Faction.Rebels,
                unique: true, modification: false, points: 25, upgradeClass: UpgradeClass.Commander,
                text: "While a friendly small or medium ship is defending against a ship, if the defender is at speed 3 or higher, the attack is treated as obstructed."
            },
            {
                id: 1505, name: 'General Dodonna', type: UpgradeType.Commander, faction: Faction.Rebels,
                unique: true, modification: false, points: 20, upgradeClass: UpgradeClass.Commander,
                text: "Before an enemy ship is dealt a faceup damage card, look at the top four cards of the damage deck, place one on top of the deck and discard the others."
            },
            {
                id: 1506, name: 'General Madine', type: UpgradeType.Commander, faction: Faction.Rebels,
                unique: true, modification: false, points: 30, upgradeClass: UpgradeClass.Commander,
                text: "When a friendly ship resolves a navigate command, if it spent a navigate dial it may increase 1 additional yaw value by 1. if it spent a navigate token, it may either change its speed or increase 1 yaw value by 1."
            },
            {
                id: 1507, name: 'General Rieekan', type: UpgradeType.Commander, faction: Faction.Rebels,
                unique: true, modification: false, points: 30, upgradeClass: UpgradeClass.Commander,
                text: "Once per round, when a friendly ship or friendly unique squadron is destroyed, it remains in the play area and is treated as if it was not destroyed until the end of the Status Phase."
            },
            {
                id: 1508, name: 'Kyrsta Agate', type: UpgradeType.Commander, faction: Faction.Rebels,
                unique: true, modification: false, points: 20, upgradeClass: UpgradeClass.Commander,
                text: "After you deploy, gain 1 non-scatter defense token. During your \"Spend Defense Tokens\" step, if your speed is not 0, you may discard 1 defense token to resolve the effect of that defense token. You cannot resolve the effect of each type of dense token more than once per attack."
            },
            {
                id: 1509, name: 'Mon Mothma', type: UpgradeType.Commander, faction: Faction.Rebels,
                unique: true, modification: false, points: 30, upgradeClass: UpgradeClass.Commander,
                text: "When a friendly ship resolves the evade token effect, it can cancel 1 die at medium range or reroll 1 die at close range or distance 1."
            },
            // Titles
            {
                id: 2000, name: 'Avenger', type: UpgradeType.Title, faction: Faction.Empire,
                unique: true, modification: false, points: 5, upgradeClass: UpgradeClass.Normal,
                text: "Something something something."
            },
            // Ion Cannons
            {
                id: 3000, name: 'Heavy Ion Emplacements', type: UpgradeType.IonCannons, faction: Faction.Any,
                unique: false, modification: false, points: 9, upgradeClass: UpgradeClass.Normal,
                text: "Something something something."
            },
            {
                id: 3001, name: 'Leading Shots', type: UpgradeType.IonCannons, faction: Faction.Any,
                unique: false, modification: false, points: 4, upgradeClass: UpgradeClass.Normal, 
                text: 'While attacking, you may spend 1 blue die to reroll any number of dice in your attack pool.'
            },
            // Weapons Team
            {
                id: 4000, name: 'Gunnery Team', type: UpgradeType.WeaponsTeam, faction: Faction.Any,
                unique: false, modification: false, points: 7, upgradeClass: UpgradeClass.Normal,
                text: "You can attack from the same hull zone more than once per activation. That hull zone cannot target the same ship or squadron more than once during that activation."
            },
            {
                id: 4001, name: 'Ordnance Experts', type: UpgradeType.WeaponsTeam, faction: Faction.Any,
                unique: false, modification: false, points: 4, upgradeClass: UpgradeClass.Normal,
                text: "While attacking, you may reroll any number of your black dice."
            },
            // Offensive Retrofit - 5

            // Boarding Team - 6
            {
                id: 6000, name: 'Darth Vader', type: UpgradeType.BoardingTeam, faction: Faction.Empire,
                unique: true, modification: false, points: 3, upgradeClass: UpgradeClass.Normal,
                text: "When you reveal a command, you may discard a squadron dial or token and this card to choose 1 enemy ship at close range. Choose and discard 1 non-commander upgrade card equipped to that ship."
            },
            // Ordnance - 7
            // Fleet Command - 8
            // Fleet Support - 9
            // Officer - 10
            // Support Team - 11
            // Turbolaser - 12
            {
                id: 12000, name: 'Dual Turbolaser Turrets', type: UpgradeType.Turbolaser, faction: Faction.Any,
                unique: false, modification: true, points: 5, upgradeClass: UpgradeClass.Normal,
                text: "While attacking, you may exhaust this card to add 1 red die to your attack pool. If you do, remove 1 die from the attack pool."
            },
            {
                id: 12001, name: 'Enhanced Armament', type: UpgradeType.Turbolaser, faction: Faction.Any,
                unique: false, modification: true, points: 10, upgradeClass: UpgradeClass.Normal,
                text: "The battery armaments for your left and right hull zones are increased by 1 red die."
            },
            {
                id: 12002, name: 'H9 Turbolasers', type: UpgradeType.Turbolaser, faction: Faction.Any,
                unique: false, modification: false, points: 8, upgradeClass: UpgradeClass.Normal,
                text: "While attacking, you may change 1 die face with a hit or critical icon to a face with an accuracy icon."
            },
            {
                id: 12003, name: 'Heavy Turbolaser Turrets', type: UpgradeType.Turbolaser, faction: Faction.Any,
                unique: false, modification: false, points: 6, upgradeClass: UpgradeClass.Normal,
                text: "While attacking, the brace defense effect cannot reduce the damage total by more than 1 unless it is the only defense token spent by the defender during the attack."
            },
            {
                id: 12004, name: 'Linked Turbolaser Turrets', type: UpgradeType.Turbolaser, faction: Faction.Any,
                unique: false, modification: false, points: 7, upgradeClass: UpgradeClass.Normal,
                text: "You may reroll 1 red die in your attack pool.  While attacking the first squadron during your activation, you may add 2 dice of any color to your attack pool. If you do, you cannot declare additional squadron targets for that attack."
            },
            {
                id: 12005, name: 'Quad Battery Turrets', type: UpgradeType.Turbolaser, faction: Faction.Any,
                unique: false, modification: false, points: 5, upgradeClass: UpgradeClass.Normal,
                text: "While attacking a ship with higher speed than yours, you may add 1 blue die to your attack pool."
            },
            {
                id: 12006, name: 'Quad Turbolaser Cannons', type: UpgradeType.Turbolaser, faction: Faction.Any,
                unique: false, modification: false, points: 10, upgradeClass: UpgradeClass.Normal,
                text: "While attacking, if at least 1 red die face has an accuracy icon. add 1 red die set to the accuracy icon to your attack pool."
            },
            {
                id: 12007, name: 'Slaved Turrets', type: UpgradeType.Turbolaser, faction: Faction.Any,
                unique: false, modification: true, points: 6, upgradeClass: UpgradeClass.Normal,
                text: "You cannot attack more than once per round. While attacking a ship, add 1 red die to your attack pool."
            },
            {
                id: 12008, name: 'Spinal Armament', type: UpgradeType.Turbolaser, faction: Faction.Any,
                unique: false, modification: false, points: 9, upgradeClass: UpgradeClass.Normal,
                text: "The battery armaments for your front and rear hull zones are increased by 1 red die."
            },
            {
                id: 12009, name: 'Turbolaser Reroute Circuits', type: UpgradeType.Turbolaser, faction: Faction.Any,
                unique: false, modification: false, points: 7, upgradeClass: UpgradeClass.Normal,
                text: "While attacking, you may spend 1 evade defense token to change 1 red die to a face with a critical or 2 hit icons."
            },
            {
                id: 12010, name: 'XI7 Turbolasers', type: UpgradeType.Turbolaser, faction: Faction.Any,
                unique: false, modification: false, points: 6, upgradeClass: UpgradeClass.Normal,
                text: "While attacking, if the defender spends a token, it cannot suffer more than 1 damage on hull zones other than the defending hull zone."
            },
            {
                id: 12011, name: 'XX-9 Turbolasers', type: UpgradeType.Turbolaser, faction: Faction.Any,
                unique: false, modification: false, points: 5, upgradeClass: UpgradeClass.Normal,
                text: "Critical: The first 2 damage cards dealt to the defender by this attack are dealt faceup."
            },
            // Experimental Retrofit - 13
            // Defensive Retrofit - 14
            
        ];
    }
}