import { Upgrade, UpgradeData, UpgradeClass, SlotGrantingUpgradeData } from "../upgrade";
import { UpgradeType } from "../upgradeType";
import { Faction } from "../faction";
import { CommanderUpgrade } from '../upgrades/commanderUpgrade';
import { SlotGrantingUpgrade } from '../upgrades/slotGrantingUpgrade';
import { Size } from '../size';
import { CustomCommander } from '../campaign/customCommander';
import { CustomCommanderUpgrade } from '../upgrades/CustomCommanderUpgrade';

export class UpgradeFactory {

    upgradeData: (UpgradeData | SlotGrantingUpgradeData)[];

    instantiateUpgrade(id: number): Upgrade {
        let data = this.upgradeData.find(ud => ud.id === id);

        if (!data)
            return null;

        if (data.upgradeClass === UpgradeClass.Commander)
            return new CommanderUpgrade(data.id, data.name, data.faction,
                data.text, data.modification, data.points, data.sizeRestriction);

        if (data.upgradeClass === UpgradeClass.SlotGranting) {
            let slotData = <SlotGrantingUpgradeData>data;
            return new SlotGrantingUpgrade(slotData.id, slotData.name, slotData.type,
                slotData.faction, slotData.text, slotData.modification, slotData.points,
                slotData.unique, slotData.grantedType, data.sizeRestriction);
        }
        if (data.upgradeClass === UpgradeClass.Normal)
            return new Upgrade(data.id, data.name, data.type, data.faction,
                data.text, data.modification, data.points, data.unique,
                data.sizeRestriction);

        return null;
    }

    getUpgradesOfType(type: UpgradeType, faction: Faction): Upgrade[] {
        let data = this.upgradeData.filter(ud => ud.type === type &&
            (ud.faction === faction || ud.faction === Faction.Any));
        return data.map(d => this.instantiateUpgrade(d.id));
    }

    getCustomCommanderUpgrade(customCommander: CustomCommander, faction: Faction) : CustomCommanderUpgrade {
        return new CustomCommanderUpgrade(customCommander, faction);
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
                text: "While attacking, you may exhaust this card. If you do, the defender cannot spend exhausted defense tokens."
            },
            {
                id: 2001, name: 'Chimaera', type: UpgradeType.Title, faction: Faction.Empire,
                unique: true, modification: false, points: 4, upgradeClass: UpgradeClass.Normal,
                text: "You gain 1 Fleet Command icon in your upgrade bar. You cannot equip this card if you have a Fleet Command icon in your upgrade bar. At the start of the Command Phase, you may discard 1 Fleet Command upgrade card you have equipped and replace it with another Fleet Command upgrade card."
            },
            {
                id: 2002, name: 'Devastator', type: UpgradeType.Title, faction: Faction.Empire,
                unique: true, modification: false, points: 10, upgradeClass: UpgradeClass.Normal,
                text: "Once per round, while attacking from your front hull zone, you may add 1 blue dice to your attack pool for each of your discarded defense tokens."
            },
            {
                id: 2003, name: 'Relentless', type: UpgradeType.Title, faction: Faction.Empire,
                unique: true, modification: false, points: 3, upgradeClass: UpgradeClass.Normal,
                text: "The total number of command dials that must be assigned to your ship during the Command Phase is reduced by 1."
            },
            {
                id: 2004, name: 'Centicore', type: UpgradeType.Title, faction: Faction.Empire,
                unique: true, modification: false, points: 3, upgradeClass: UpgradeClass.Normal,
                text: "When another friendly ship resolves a Squadron command, up to 2 of the squadrons it activates can be at close-medium range of you."
            },
            {
                id: 2005, name: 'Hand of Justice', type: UpgradeType.Title, faction: Faction.Empire,
                unique: true, modification: false, points: 4, upgradeClass: UpgradeClass.Normal,
                text: "Before you reveal a command, you may exhaust this card to choose another friendly ship at distance 1-5 and ready 1 of its defense tokens."
            },
            {
                id: 2006, name: 'Demolisher', type: UpgradeType.Title, faction: Faction.Empire,
                unique: true, modification: false, points: 10, upgradeClass: UpgradeClass.Normal,
                text: "During your activation, you can perform 1 of your attacks after you execute your first maneuver."
            },
            {
                id: 2007, name: 'Insidious', type: UpgradeType.Title, faction: Faction.Empire,
                unique: true, modification: false, points: 3, upgradeClass: UpgradeClass.Normal,
                text: "The black dice in your battery armament can be used at medium range. This effect applies only when attacking the rear hull zone of a ship."
            },
            {
                id: 2008, name: 'Vector', type: UpgradeType.Title, faction: Faction.Empire,
                unique: true, modification: false, points: 2, upgradeClass: UpgradeClass.Normal,
                text: "Squadron: The speed of each squadron without Heavy you activate is increased by 1, to a maximum of 5, until the end of its activation."
            },
            {
                id: 2009, name: 'Suppressor', type: UpgradeType.Title, faction: Faction.Empire,
                unique: true, modification: false, points: 4, upgradeClass: UpgradeClass.Normal,
                text: "After an enemy ship ends its activation, if it is at distance 1-3, you may choose and exhaust 1 of his defense tokens."
            },
            {
                id: 2010, name: 'Seventh Fleet Star Destroyer', type: UpgradeType.Title, faction: Faction.Empire,
                unique: false, modification: false, points: 5, upgradeClass: UpgradeClass.Normal,
                text: "\"Star Destroyer\" only. While defending against an attack that targets your front hull zone, before you suffer damage, you may choose and exhaust a copy of this card on another friendly ship at distance 1-4 to reduce the total damage by 1."
            },
            {
                id: 2011, name: 'Sovereign', type: UpgradeType.Title, faction: Faction.Empire,
                unique: true, modification: false, points: 4, upgradeClass: UpgradeClass.Normal,
                text: "At the start of the Ship Phase, you may exhaust this card to discard 1 command token from up to 3 friendly ships at distance 1-5. If you do, each of those ships may gain 1 command token of any type."
            },
            {
                id: 2012, name: 'Interdictor', type: UpgradeType.Title, faction: Faction.Empire,
                unique: true, modification: false, points: 3, upgradeClass: UpgradeClass.Normal,
                text: "When a ship activates, you may exhaust this card to ready 1 other upgrade card equipped to this ship."
            },
            {
                id: 2013, name: 'Pursuant', type: UpgradeType.Title, faction: Faction.Empire,
                unique: true, modification: false, points: 2, upgradeClass: UpgradeClass.Normal,
                text: "When you reveal a command other than a Squadron command, you may discard this card to resolve a Squadron command. Treat this command as if you spent a Squadron dial."
            },
            {
                id: 2014, name: 'Squall', type: UpgradeType.Title, faction: Faction.Empire,
                unique: true, modification: false, points: 3, upgradeClass: UpgradeClass.Normal,
                text: "When you activate, you may choose up to 3 unengaged friendly squadrons at close-medium range. Those squadrons may move up to distance 2. If they do, they cannot end their movement engaged."
            },
            {
                id: 2015, name: 'Stronghold', type: UpgradeType.Title, faction: Faction.Empire,
                unique: true, modification: false, points: 5, upgradeClass: UpgradeClass.Normal,
                text: "While a friendly squadron with Swarm at distance 1-2 is defending, the attack is treated as obstructed."
            },
            {
                id: 2016, name: 'Corvus', type: UpgradeType.Title, faction: Faction.Empire,
                unique: true, modification: false, points: 2, upgradeClass: UpgradeClass.Normal,
                text: "After deploying fleets, you may redeploy this ship within your deployment zone."
            },
            {
                id: 2017, name: 'Impetuous', type: UpgradeType.Title, faction: Faction.Empire,
                unique: true, modification: false, points: 4, upgradeClass: UpgradeClass.Normal,
                text: "At the start of your Attack Step, choose 1 of your hull zones. You may perform an attack against 1 enemy squadron from that hull zone, even if you have already attacked from that zone this round."
            },
            {
                id: 2018, name: 'Instigator', type: UpgradeType.Title, faction: Faction.Empire,
                unique: true, modification: false, points: 4, upgradeClass: UpgradeClass.Normal,
                text: "Enemy squadrons at distance 1 are treated as if they are engaged by 2 additional squadrons, even if they are not currently engaged."
            },
            {
                id: 2019, name: 'Annihilator', type: UpgradeType.Title, faction: Faction.Empire,
                unique: true, modification: false, points: 8, upgradeClass: UpgradeClass.Normal,
                text: "While attacking a squadron, you may reroll 1 attack die."
            },
            {
                id: 2020, name: 'Eclipse', type: UpgradeType.Title, faction: Faction.Empire,
                unique: true, modification: false, points: 3, upgradeClass: UpgradeClass.Normal,
                text: "When an enemy ship overlaps you, the enemy ship suffers a faceup damage card instead of a facedown damage card."
            },
            {
                id: 2021, name: 'Executor', type: UpgradeType.Title, faction: Faction.Empire,
                unique: true, modification: false, points: 2, upgradeClass: UpgradeClass.Normal,
                text: "You can be assigned any number of command tokens of any type, instead of a number of command tokens equal to your command value."
            },
            {
                id: 2022, name: 'Ravager', type: UpgradeType.Title, faction: Faction.Empire,
                unique: true, modification: false, points: 4, upgradeClass: UpgradeClass.Normal,
                text: "Concentrate Fire: Your Concentrate Fire tokens can either reroll 1 attack die or add 1 die to the attack pool. If you add a die, that die must be of a color already in the attack pool."
            },
            {
                id: 2500, name: 'Gallant Haven', type: UpgradeType.Title, faction: Faction.Rebels,
                unique: true, modification: false, points: 8, upgradeClass: UpgradeClass.Normal,
                text: "Before a friendly squadron at distance 1 suffers damage from an attack, reduce the total damage by one."
            },
            {
                id: 2501, name: 'Paragon', type: UpgradeType.Title, faction: Faction.Rebels,
                unique: true, modification: false, points: 5, upgradeClass: UpgradeClass.Normal,
                text: "While attacking a ship you have already attacked this round, add 1 black die to your attack pool."
            },
            {
                id: 2502, name: 'Dodonna\'s Pride', type: UpgradeType.Title, faction: Faction.Rebels,
                unique: true, modification: false, points: 6, upgradeClass: UpgradeClass.Normal,
                text: "Blue Critical: Cancel all attack dice to deal one faceup damage card to the defender."
            },
            {
                id: 2503, name: 'Jaina\'s Light', type: UpgradeType.Title, faction: Faction.Rebels,
                unique: true, modification: false, points: 2, upgradeClass: UpgradeClass.Normal,
                text: "You can ignore the effects of overlapping obstacles. Your attacks cannot be obstructed."
            },
            {
                id: 2504, name: 'Liberator', type: UpgradeType.Title, faction: Faction.Rebels,
                unique: true, modification: false, points: 2, upgradeClass: UpgradeClass.SlotGranting,
                grantedType: UpgradeType.FleetCommand,
                text: "You gain 1 additional Fleet Command icon in your upgrade bar. You cannot equip this card if you have a Fleet Command icon in your upgrade bar. You cannot spend a command token to resolve a Fleet Command card's effect."
            },
            {
                id: 2505, name: 'Tantive IV', type: UpgradeType.Title, faction: Faction.Rebels,
                unique: true, modification: false, points: 3, upgradeClass: UpgradeClass.Normal,
                text: "Before you gain a command token, 1 friendly ship at distance 1-5 may gain that token instead."
            },
            {
                id: 2506, name: 'Bright Hope', type: UpgradeType.Title, faction: Faction.Rebels,
                unique: true, modification: false, points: 2, upgradeClass: UpgradeClass.Normal,
                text: "While defending against an attack that does not target your rear hull zone, before you suffer damage reduce that total damage by 1."
            },
            {
                id: 2507, name: 'Quantum Storm', type: UpgradeType.Title, faction: Faction.Rebels,
                unique: true, modification: false, points: 1, upgradeClass: UpgradeClass.Normal,
                text: "Navigate: After you execute a maneuver, you may exhaust this card to execute a 1-speed maneuver with a yaw of \"-\"."
            },
            {
                id: 2508, name: 'Garel\'s Honor', type: UpgradeType.Title, faction: Faction.Rebels,
                unique: true, modification: false, points: 4, upgradeClass: UpgradeClass.Normal,
                text: "When you overlap an enemy ship, the enemy ship suffers a faceup damage card instead of a facedown damage card."
            },
            {
                id: 2509, name: 'Task Force Antilles', type: UpgradeType.Title, faction: Faction.Rebels,
                unique: false, modification: false, points: 3, upgradeClass: UpgradeClass.Normal,
                text: "When you suffer damage from an attack, you may choose and exhaust a copy of this card on another friendly ship at distance 1-3. If you do, that ship suffers 1 of your damage instead. While this card is exhausted, you cannot spend engineering points."
            },
            {
                id: 2510, name: 'Task Force Organa', type: UpgradeType.Title, faction: Faction.Rebels,
                unique: false, modification: false, points: 1, upgradeClass: UpgradeClass.Normal,
                text: "While attacking, you may choose and exhaust a copy of this card on another friendly ship at distance 1-3 to reroll up to 2 attack dice. While this card is exhausted, you cannot attack ships."
            },
            {
                id: 2511, name: 'Admonition', type: UpgradeType.Title, faction: Faction.Rebels,
                unique: true, modification: false, points: 8, upgradeClass: UpgradeClass.Normal,
                text: "While defending, during the Spend Defense Tokens Step, you may discard a defense token to cancel 1 attack die."
            },
            {
                id: 2512, name: 'Foresight', type: UpgradeType.Title, faction: Faction.Rebels,
                unique: true, modification: false, points: 8, upgradeClass: UpgradeClass.Normal,
                text: "When you resolve the Evade defense effect, you can affect 1 additional die. When you resolve the Redirect defense effect, you can choose 1 additional adjacent hull zone to suffer damage."
            },
            {
                id: 2513, name: 'Aspiration', type: UpgradeType.Title, faction: Faction.Rebels,
                unique: true, modification: false, points: 3, upgradeClass: UpgradeClass.Normal,
                text: "When you deploy this ship, you may move shields to up to 2 of your hull zones from your other hull zones. If you do, the number of shields in a zone cannot exceed a maximum of \"6\". You cannot recover shields while any zone is greater than its maximum shield value."
            },
            {
                id: 2514, name: 'Profundity', type: UpgradeType.Title, faction: Faction.Rebels,
                unique: true, modification: false, points: 7, upgradeClass: UpgradeClass.Normal,
                text: "Before deploying fleets, you may set aside 1 small ship with a command value of 1. At the start of any round, you may deploy the set-aside ship at distance 1. You may un-equip up to 1 commander and 1 officer upgrade cards and equip them to it (if able)."
            },
            {
                id: 2515, name: 'Mon Calamari Exodus Fleet', type: UpgradeType.Title, faction: Faction.Rebels,
                unique: false, modification: false, points: 5, upgradeClass: UpgradeClass.Normal,
                text: "\"MC\" only. Engineering: You may choose and exhaust another copy of this card on a friendly ship at distance 1-4. If you do, gain 2 additional engineering points."
            },
            {
                id: 2516, name: 'Defiance', type: UpgradeType.Title, faction: Faction.Rebels,
                unique: true, modification: false, points: 5, upgradeClass: UpgradeClass.Normal,
                text: "While attacking a ship that has already activated this round, add 1 die of any color to your attack pool."
            },
            {
                id: 2517, name: 'Home One', type: UpgradeType.Title, faction: Faction.Rebels,
                unique: true, modification: false, points: 7, upgradeClass: UpgradeClass.Normal,
                text: "While another friendly ship at distance 1-5 is attacking, it may change 1 die to a face with an accuracy icon."
            },
            {
                id: 2518, name: 'Independence', type: UpgradeType.Title, faction: Faction.Rebels,
                unique: true, modification: false, points: 8, upgradeClass: UpgradeClass.Normal,
                text: "Squadron: Each squadron you activate may increase its speed to 4 until the end of its activation. Squadrons that change speed in this way cannot attack this activation."
            },
            {
                id: 2519, name: 'Endeavor', type: UpgradeType.Title, faction: Faction.Rebels,
                unique: true, modification: false, points: 4, upgradeClass: UpgradeClass.Normal,
                text: "At the start of the first round, gain 1 contain defense token."
            },
            {
                id: 2520, name: 'Liberty', type: UpgradeType.Title, faction: Faction.Rebels,
                unique: true, modification: false, points: 3, upgradeClass: UpgradeClass.Normal,
                text: "Squadron: if you spent a squadron token, you may activate 1 additional squadron."
            },
            {
                id: 2521, name: 'Mon Karren', type: UpgradeType.Title, faction: Faction.Rebels,
                unique: true, modification: false, points: 8, upgradeClass: UpgradeClass.Normal,
                text: "While attacking a ship, the defender cannot spend more than 1 defense token."
            },
            {
                id: 2522, name: 'Redemption', type: UpgradeType.Title, faction: Faction.Rebels,
                unique: true, modification: false, points: 8, upgradeClass: UpgradeClass.Normal,
                text: "When a friendly ship at distance 1-5 resoves an engineering command, it gains one additional engineering point."
            },
            {
                id: 2523, name: 'Salvation', type: UpgradeType.Title, faction: Faction.Rebels,
                unique: true, modification: false, points: 7, upgradeClass: UpgradeClass.Normal,
                text: "While attacking a ship from your front hull zone, your critical icons count as two damage instead of one."
            },
            {
                id: 2524, name: 'Vanguard', type: UpgradeType.Title, faction: Faction.Rebels,
                unique: true, modification: false, points: 4, upgradeClass: UpgradeClass.SlotGranting,
                grantedType: UpgradeType.WeaponsTeam,
                text: "You gain one additional Weapons Team icon in your upgrade bar. At the start of the first round, you may replace 1 of your defense tokens with an evade defense token."
            },
            {
                id: 2525, name: 'Yavaris', type: UpgradeType.Title, faction: Faction.Rebels,
                unique: true, modification: false, points: 5, upgradeClass: UpgradeClass.Normal,
                text: "Squadron: Each squadron you activate can attack twice if it does not move."
            },
            {
                id: 2526, name: 'Phoenix Home', type: UpgradeType.Title, faction: Faction.Rebels,
                unique: true, modification: false, points: 3, upgradeClass: UpgradeClass.SlotGranting,
                grantedType: UpgradeType.Officer,
                text: "You gain 1 additional Officer icon in your upgrade bar. You can be assigned up to 4 command tokens instead of a number of command tokens equal to your command value."
            },
            // Ion Cannons
            {
                id: 3000, name: 'Heavy Ion Emplacements', type: UpgradeType.IonCannons, faction: Faction.Any,
                unique: false, modification: false, points: 9, upgradeClass: UpgradeClass.Normal,
                text: "Blue Critical: You may exhaust this card. If you do, the defending hull zone and each adjacent hull zone loses 1 shield."
            },
            {
                id: 3001, name: 'Leading Shots', type: UpgradeType.IonCannons, faction: Faction.Any,
                unique: false, modification: false, points: 4, upgradeClass: UpgradeClass.Normal,
                text: 'While attacking, you may spend 1 blue die to reroll any number of dice in your attack pool.'
            },
            {
                id: 3002, name: 'High-Capacity Ion Turbines', type: UpgradeType.IonCannons, faction: Faction.Any,
                unique: false, modification: true, points: 8, upgradeClass: UpgradeClass.Normal,
                text: 'The battery armaments for your left and right hull zones are increased by 1 blue die.'
            },
            {
                id: 3003, name: 'Ion Cannon Batteries', type: UpgradeType.IonCannons, faction: Faction.Any,
                unique: false, modification: false, points: 5, upgradeClass: UpgradeClass.Normal,
                text: 'Blue Critical: Choose and discard 1 command token from the defender. If the defender does not have any command tokens, the defending hull zone loses one shield instead.'
            },
            {
                id: 3004, name: 'MS-1 Ion Cannons', type: UpgradeType.IonCannons, faction: Faction.Any,
                unique: false, modification: false, points: 2, upgradeClass: UpgradeClass.Normal,
                text: 'Blue Critical: Choose and exhaust 1 of the defender\'s upgrade cards.'
            },
            {
                id: 3005, name: 'High-Capacity Ion Turbines', type: UpgradeType.IonCannons, faction: Faction.Any,
                unique: false, modification: true, points: 8, upgradeClass: UpgradeClass.Normal,
                text: 'The battery armaments for your left and right hull zones are increased by 1 blue die.'
            },
            {
                id: 3006, name: 'NK-7 Ion Cannons', type: UpgradeType.IonCannons, faction: Faction.Any,
                unique: false, modification: false, points: 10, upgradeClass: UpgradeClass.Normal,
                text: 'Blue Critical: You may exhaust this card to force the defender to choose and discard one of his defense tokens.'
            },
            {
                id: 3007, name: 'Overload Pulse', type: UpgradeType.IonCannons, faction: Faction.Any,
                unique: false, modification: false, points: 8, upgradeClass: UpgradeClass.Normal,
                text: 'Blue Critical: Exhaust all of the defenders defense tokens.'
            },
            {
                id: 3008, name: 'SW-7 Ion Batteries', type: UpgradeType.IonCannons, faction: Faction.Any,
                unique: false, modification: false, points: 5, upgradeClass: UpgradeClass.Normal,
                text: 'While attacking a ship, each of your unspent blue accuracy icons add 1 damage to the damage total.'
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
            {
                id: 4002, name: 'Fire-Control Team', type: UpgradeType.WeaponsTeam, faction: Faction.Any,
                unique: false, modification: false, points: 2, upgradeClass: UpgradeClass.Normal,
                text: "During the Resolve Damage Step, you may exhaust this card to resolve 1 additional critical effect. You cannot resolve the same critical effect twice."
            },
            {
                id: 4003, name: 'Flight Controllers', type: UpgradeType.WeaponsTeam, faction: Faction.Any,
                unique: false, modification: false, points: 6, upgradeClass: UpgradeClass.Normal,
                text: "Squadron: The anti-squadron armament of each squadron that you activate is increased by one blue die until the end of its activation."
            },
            {
                id: 4004, name: 'Ruthless Strategists', type: UpgradeType.WeaponsTeam, faction: Faction.Any,
                unique: false, modification: false, points: 4, upgradeClass: UpgradeClass.Normal,
                text: "After attacking a squadron, you may deal 1 damage to a friendly squadron engaged with the defender. If you do, the defender suffers 1 damage."
            },
            {
                id: 4005, name: 'Sensor Team', type: UpgradeType.WeaponsTeam, faction: Faction.Any,
                unique: false, modification: false, points: 5, upgradeClass: UpgradeClass.Normal,
                text: "While attacking, you may exhaust this card and spend one die to change one of your dice to a face with an accuracy icon."
            },
            {
                id: 4006, name: 'Veteran Gunners', type: UpgradeType.WeaponsTeam, faction: Faction.Any,
                unique: false, modification: false, points: 5, upgradeClass: UpgradeClass.Normal,
                text: "While attacking, you may exhaust this card to reroll all dice in your attack pool.."
            },
            {
                id: 4007, name: 'Weapons Battery Techs', type: UpgradeType.WeaponsTeam, faction: Faction.Any,
                unique: false, modification: false, points: 5, upgradeClass: UpgradeClass.Normal,
                text: "While attacking a ship, you may change 1 die face with an accuracy icon to a face with a critical icon."
            },
            {
                id: 4008, name: 'Caitken and Shollan', type: UpgradeType.WeaponsTeam, faction: Faction.Rebels,
                unique: true, modification: false, points: 6, upgradeClass: UpgradeClass.Normal,
                text: "While attacking, you may exhaust this card to reroll any number of dice of 1 color."
            },
            // Offensive Retrofit - 5
            {
                id: 5000, name: 'Advanced Transponder Net', type: UpgradeType.OffensiveRetrofit, faction: Faction.Any,
                unique: false, modification: true, points: 5, upgradeClass: UpgradeClass.Normal,
                text: "Friendly Heavy squadrons at distance 1-2 prevent engaged squadrons from attacking ships."
            },
            {
                id: 5001, name: 'Boosted Comms', type: UpgradeType.OffensiveRetrofit, faction: Faction.Any,
                unique: false, modification: false, points: 4, upgradeClass: UpgradeClass.Normal,
                text: "Squadron: You can activate friendly squadrons at close-long range (instead of close-medium)."
            },
            {
                id: 5002, name: 'Disposable Capacitors', type: UpgradeType.OffensiveRetrofit, faction: Faction.Any,
                unique: false, modification: false, points: 3, upgradeClass: UpgradeClass.Normal,
                text: "Small or medium ship only. When you activate, you may discard this card. If you do, the blue dice in your battery armament can be used while attacking ships at close-long range until the end of the round.",
                sizeRestriction: [Size.SmallFlotilla, Size.Small, Size.Medium]
            },
            {
                id: 5003, name: 'Expanded Hangar Bay', type: UpgradeType.OffensiveRetrofit, faction: Faction.Any,
                unique: false, modification: false, points: 5, upgradeClass: UpgradeClass.Normal,
                text: "Your squadron value is increased by 1."
            },
            {
                id: 5004, name: 'Hardened Bulkheads', type: UpgradeType.OffensiveRetrofit, faction: Faction.Any,
                unique: false, modification: false, points: 5, upgradeClass: UpgradeClass.Normal,
                text: "Large ship only. When you overlap a ship of a smaller size class (or are overlapped by a ship of a smaller class), deal 1 fewer facedown damage card to your ship.",
                sizeRestriction: [Size.Large]
            },
            {
                id: 5005, name: 'Phylon Q7 Tractor Beams', type: UpgradeType.OffensiveRetrofit, faction: Faction.Any,
                unique: false, modification: true, points: 6, upgradeClass: UpgradeClass.Normal,
                text: "When you activate, you may exhaust this card to choose 1 enemy ship of your size class or smaller at distance 1-5. That ship must spend a Navigate token or reduce its speed by 1 to a minimum of 1."
            },
            {
                id: 5006, name: 'Point-Defense Rerout', type: UpgradeType.OffensiveRetrofit, faction: Faction.Any,
                unique: false, modification: false, points: 5, upgradeClass: UpgradeClass.Normal,
                text: "While attacking a squadron at close range, you may reroll your critical icons."
            },
            {
                id: 5007, name: 'Proximity Mines', type: UpgradeType.OffensiveRetrofit, faction: Faction.Any,
                unique: false, modification: false, points: 4, upgradeClass: UpgradeClass.Normal,
                text: "Before deploying fleets, you may discard this card to place a number of proximity mine tokens equal to half your engineering value rounded down. You may place these tokens anywhere in the play area beyond distance 5 of enemy ships (and distance 1 of each other)."
            },
            {
                id: 5008, name: 'Quad Laser Turrets', type: UpgradeType.OffensiveRetrofit, faction: Faction.Any,
                unique: false, modification: false, points: 5, upgradeClass: UpgradeClass.Normal,
                text: "While defending at distance 1, if the attacker is a squadron, you have Counter 1."
            },
            {
                id: 5009, name: 'Rapid Launch Bays', type: UpgradeType.OffensiveRetrofit, faction: Faction.Any,
                unique: false, modification: false, points: 6, upgradeClass: UpgradeClass.Normal,
                text: "Before deploying fleets, you may set aside a number of squadrons up to your squadron value next to your ship card. Squadron: For each squadron you would activate with this command, you may instead place 1 of your set-aside squadrons within distance 1. It cannot move this activation."
            },
            {
                id: 5010, name: 'Reserve Hangar Deck', type: UpgradeType.OffensiveRetrofit, faction: Faction.Any,
                unique: false, modification: false, points: 3, upgradeClass: UpgradeClass.Normal,
                text: "After a non-unique squadron with SWARM at distance 1-5 is destroyed, you may discard this card. If you do, you may set that squadron's hull points to \"2\" and place that squadron at distance 1 with its activation slider toggled to the activated side and not engaged."
            },
            // Boarding Team - 6
            {
                id: 6000, name: 'Darth Vader', type: UpgradeType.BoardingTeam, faction: Faction.Empire,
                unique: true, modification: false, points: 3, upgradeClass: UpgradeClass.Normal,
                text: "When you reveal a command, you may discard a squadron dial or token and this card to choose 1 enemy ship at close range. Choose and discard 1 non-commander upgrade card equipped to that ship."
            },
            {
                id: 6001, name: 'Cham Syndulla', type: UpgradeType.BoardingTeam, faction: Faction.Rebels,
                unique: true, modification: false, points: 5, upgradeClass: UpgradeClass.Normal,
                text: "When you reveal a command, you may discard a squadron dial or token and this card to choose 1 enemy ship at close range. If you do you may choose a new command for each command dial assigned to that ship."
            },
            {
                id: 6002, name: 'Jyn Erso', type: UpgradeType.BoardingTeam, faction: Faction.Rebels,
                unique: true, modification: false, points: 4, upgradeClass: UpgradeClass.Normal,
                text: "When you reveal a command, you may discard a squadron dial or token and this card to choose 1 enemy ship at close range. If that ship has no raid tokens, it gains 2 raid tokens of your choice. If that ship has an objective token, you may also gain 1 victory token."
            },
            {
                id: 6003, name: 'Boarding Engineers', type: UpgradeType.BoardingTeam, faction: Faction.Any,
                unique: false, modification: false, points: 2, upgradeClass: UpgradeClass.Normal,
                text: "When you reveal a command, you may discard a squadron dial or token and this card to choose 1 enemy ship at close range. Look at its facedown damage cards and flip a number of them faceup up to your engineering value (one at a time)."
            },
            {
                id: 6004, name: 'Boarding Troopers', type: UpgradeType.BoardingTeam, faction: Faction.Any,
                unique: false, modification: false, points: 3, upgradeClass: UpgradeClass.Normal,
                text: "When you reveal a command, you may discard a squadron dial or token and this card to choose 1 enemy ship at close range. Choose and spend a number of its defense tokens up to your squadron value."
            },
            // Ordnance - 7
            {
                id: 7000, name: 'Assault Concussion Missiles', type: UpgradeType.Ordnance, faction: Faction.Any,
                unique: false, modification: false, points: 7, upgradeClass: UpgradeClass.Normal,
                text: "Black Critical: Each hull zone adjacent to the defending hull zone suffers 1 damage."
            },
            {
                id: 7001, name: 'Assault Proton Torpedoes', type: UpgradeType.Ordnance, faction: Faction.Any,
                unique: false, modification: false, points: 5, upgradeClass: UpgradeClass.Normal,
                text: "Black Critical: Deal 1 faceup damage card to the defender."
            },
            {
                id: 7002, name: 'Expanded Launchers', type: UpgradeType.Ordnance, faction: Faction.Any,
                unique: false, modification: true, points: 13, upgradeClass: UpgradeClass.Normal,
                text: "The battery armament for your front hull zone is increased by 2 black dice."
            },
            {
                id: 7003, name: 'External Racks', type: UpgradeType.Ordnance, faction: Faction.Any,
                unique: false, modification: false, points: 3, upgradeClass: UpgradeClass.Normal,
                text: "When attacking at close range, you may discard this card to add 2 black dice to your attack pool."
            },
            {
                id: 7004, name: 'Flechette Torpedoes', type: UpgradeType.Ordnance, faction: Faction.Any,
                unique: false, modification: false, points: 3, upgradeClass: UpgradeClass.Normal,
                text: "While attacking a squadron, you may spend 1 black die with a critical icon to toggle its activation slider to the activated side."
            },
            {
                id: 7005, name: 'Ordnance Pods', type: UpgradeType.Ordnance, faction: Faction.Any,
                unique: false, modification: false, points: 3, upgradeClass: UpgradeClass.Normal,
                text: "Medium or large ship only. At the end of your Attack Step, you may exhaust this card and choose 1 of your hull zones. Then perform an attack from that hull zone with an anti-squadron armament of 1 black die, even if you have already attacked from that zone this round.",
                sizeRestriction: [Size.Medium, Size.Large]
            },
            {
                id: 7006, name: 'Rapid Reload', type: UpgradeType.Ordnance, faction: Faction.Any,
                unique: false, modification: true, points: 8, upgradeClass: UpgradeClass.Normal,
                text: "The battery armaments for your left and right hull zones are increased by 1 black die."
            },
            {
                id: 7007, name: 'Wide-Area Barrage', type: UpgradeType.Ordnance, faction: Faction.Any,
                unique: false, modification: false, points: 2, upgradeClass: UpgradeClass.Normal,
                text: "Black Critical: If the defender is a ship, choose 1 other ship or squadron at close range of the defender. That ship or squadron suffers damage equal to half of the total number of black hit icons in your attack pool, rounded up."
            },
            // Fleet Command - 8
            {
                id: 8000, name: 'All Fighters, Follow Me!', type: UpgradeType.FleetCommand, faction: Faction.Any,
                unique: true, modification: false, points: 5, upgradeClass: UpgradeClass.Normal,
                text: "At the start of the Ship Phase, you may discard this card or spend a squadron token. If you do, until the end of the round, the speed of each squadron that a friendly ship activates is increased by 1, to a maximum of 5, until the end of that squadron's activation."
            },
            {
                id: 8001, name: 'Entrapment Formation', type: UpgradeType.FleetCommand, faction: Faction.Any,
                unique: true, modification: false, points: 5, upgradeClass: UpgradeClass.Normal,
                text: "At the start of the Ship Phase, you may discard this card or spend a navigate token. If you do, until the end of the round, each friendly ship may change its speed by 1 during its Determine Course step."
            },
            {
                id: 8002, name: 'Intensify Firepower!', type: UpgradeType.FleetCommand, faction: Faction.Any,
                unique: true, modification: false, points: 6, upgradeClass: UpgradeClass.Normal,
                text: "At the start of the Ship Phase, you may discard this card or spend a concentrate fire token. If you do, until the end of the round, while each friendly ship is attacking a ship, it may change 1 die to a face with 1 hit icon and no other icons."
            },
            {
                id: 8003, name: 'Shields to Maximum!', type: UpgradeType.FleetCommand, faction: Faction.Any,
                unique: true, modification: false, points: 6, upgradeClass: UpgradeClass.Normal,
                text: "At the start of the Ship Phase, you may discard this card or spend an engineering token. If you do, until the end of the round, before a friendly ship reveals a command, it may recover 1 shield."
            },
            {
                id: 8004, name: 'Take Evasive Action!', type: UpgradeType.FleetCommand, faction: Faction.Any,
                unique: true, modification: false, points: 6, upgradeClass: UpgradeClass.Normal,
                text: "At the start of the Ship Phase, you may discard this card or spend a navigation token. If you do, until the end of the round, each friendly ship may increase the last yaw value of its current speed by 1 during its Determine Course step."
            },
            // Fleet Support - 9
            {
                id: 9000, name: 'Bomber Command Center', type: UpgradeType.FleetSupport, faction: Faction.Any,
                unique: false, modification: false, points: 8, upgradeClass: UpgradeClass.Normal,
                text: "While a friendly squadron with Bomber at distance 1-5 is attacking a ship, it may reroll 1 die."
            },
            {
                id: 9001, name: 'Comms Net', type: UpgradeType.FleetSupport, faction: Faction.Any,
                unique: false, modification: false, points: 2, upgradeClass: UpgradeClass.Normal,
                text: "After the Reveal Command Dial Step, you may remove 1 command token from this ship to assign a matching token to another friendly ship at distance 1-5."
            },
            {
                id: 9002, name: 'Jamming Field', type: UpgradeType.FleetSupport, faction: Faction.Any,
                unique: false, modification: false, points: 2, upgradeClass: UpgradeClass.Normal,
                text: "While a squadron at distance 1-2 is attacking or defending against a squadron, the attack is treated as obstructed."
            },
            {
                id: 9003, name: 'Repair Crews', type: UpgradeType.FleetSupport, faction: Faction.Any,
                unique: false, modification: false, points: 4, upgradeClass: UpgradeClass.Normal,
                text: "Engineering: Instead of spending engineering points, you may discard 1 damage card from a friendly ship at distance 1-2."
            },
            {
                id: 9004, name: 'Slicer Tools', type: UpgradeType.FleetSupport, faction: Faction.Any,
                unique: false, modification: false, points: 7, upgradeClass: UpgradeClass.Normal,
                text: "While a friendly squadron with Bomber at distance 1-5 is attacking a ship, it may reroll 1 die."
            },
            // Officer - 10
            {
                id: 10000, name: 'Chart Officer', type: UpgradeType.Officer, faction: Faction.Any,
                unique: false, modification: false, points: 2, upgradeClass: UpgradeClass.Normal,
                text: "After you execute a maneuver, if you overlapped an obstacle, you may discard this card instead of resolving the effects of overlapping that obstacle."
            },
            {
                id: 10001, name: 'Damage Control Officer', type: UpgradeType.Officer, faction: Faction.Any,
                unique: false, modification: false, points: 5, upgradeClass: UpgradeClass.Normal,
                text: "When you resolve the contain defense effect, you can prevent the attacker from resolving any critical effects."
            },
            {
                id: 10002, name: 'Defense Liaison', type: UpgradeType.Officer, faction: Faction.Any,
                unique: false, modification: false, points: 3, upgradeClass: UpgradeClass.Normal,
                text: "Before you reveal a command, you may spend one command token to change that command to a navigate or engineering command."
            },
            {
                id: 10003, name: 'Engineering Captain', type: UpgradeType.Officer, faction: Faction.Any,
                unique: false, modification: false, points: 6, upgradeClass: UpgradeClass.Normal,
                text: "Before you reveal a command, you may change it to an engineering command."
            },
            {
                id: 10004, name: 'Expert Shield Tech', type: UpgradeType.Officer, faction: Faction.Any,
                unique: false, modification: false, points: 5, upgradeClass: UpgradeClass.Normal,
                text: "While defending, during the Spend Defense Tokens step, when you spend a redirect defense token you may reduce the total damage from the attack by 1 instead of resolving that token's effect."
            },
            {
                id: 10005, name: 'Flight Commander', type: UpgradeType.Officer, faction: Faction.Any,
                unique: false, modification: false, points: 3, upgradeClass: UpgradeClass.Normal,
                text: "During your activation, you can resolve your squadron command after you execute a maneuver."
            },
            {
                id: 10006, name: 'Hondo Ohnaka', type: UpgradeType.Officer, faction: Faction.Any,
                unique: true, modification: false, points: 2, upgradeClass: UpgradeClass.Normal,
                text: "At the start of the ship phase, you may discard this card to choose 2 different command tokens and place them on 2 different ships. Then your opponent chooses 2 different command tokens you did not choose and places them on 2 different ships."
            },
            {
                id: 10007, name: 'Intel Officer', type: UpgradeType.Officer, faction: Faction.Any,
                unique: false, modification: false, points: 7, upgradeClass: UpgradeClass.Normal,
                text: "While attacking, after you roll your attack pool, you may exhaust this card to choose 1 defense token. If that token is spent during this attack, discard that token."
            },
            {
                id: 10008, name: 'Navigation Officer', type: UpgradeType.Officer, faction: Faction.Any,
                unique: false, modification: false, points: 6, upgradeClass: UpgradeClass.Normal,
                text: "Before you reveal a command, you may change it to a navigate command."
            },
            {
                id: 10009, name: 'Skilled First Officer', type: UpgradeType.Officer, faction: Faction.Any,
                unique: false, modification: false, points: 1, upgradeClass: UpgradeClass.Normal,
                text: "Before you reveal a command, you may discard this card to discard your top command dial."
            },
            {
                id: 10010, name: 'Stategic Advisor', type: UpgradeType.Officer, faction: Faction.Any,
                unique: true, modification: false, points: 4, upgradeClass: UpgradeClass.Normal,
                text: "Large ship only. When it is your turn to activate, you may exhaust this card to pass your turn (your opponent activates a ship instead).",
                sizeRestriction: [Size.Large]
            },
            {
                id: 10011, name: 'Support Officer', type: UpgradeType.Officer, faction: Faction.Any,
                unique: false, modification: false, points: 4, upgradeClass: UpgradeClass.Normal,
                text: "At the start of the Command Phase, you may discard this card to discard all of your command dials."
            },
            {
                id: 10012, name: 'Tactical Expert', type: UpgradeType.Officer, faction: Faction.Any,
                unique: false, modification: false, points: 6, upgradeClass: UpgradeClass.Normal,
                text: "Before you reveal a command, you may change it to a concentrate fire command."
            },
            {
                id: 10013, name: 'Veteran Captain', type: UpgradeType.Officer, faction: Faction.Any,
                unique: false, modification: false, points: 3, upgradeClass: UpgradeClass.Normal,
                text: "When you reveal a command you may discard this card to gain one command token of your choice."
            },
            {
                id: 10014, name: 'Weapons Liaison', type: UpgradeType.Officer, faction: Faction.Any,
                unique: false, modification: false, points: 3, upgradeClass: UpgradeClass.Normal,
                text: "Before you reveal a command, you may spend one command token to change that command to a concentrate fire or squadron command."
            },
            {
                id: 10015, name: 'Wing Commander', type: UpgradeType.Officer, faction: Faction.Any,
                unique: false, modification: false, points: 6, upgradeClass: UpgradeClass.Normal,
                text: "Before you reveal a command, you may change it to a squadron command."
            },
            // Imperial Officers
            {
                id: 10200, name: 'Admiral Chiraneau', type: UpgradeType.Officer, faction: Faction.Empire,
                unique: true, modification: false, points: 10, upgradeClass: UpgradeClass.Normal,
                text: "Squadron: Squadrons that you activate can move even if they are engaged. When an engaged squadron moves in this way, treat it as having a printed speed of \"2\"."
            },
            {
                id: 10201, name: 'Admiral Montferrat', type: UpgradeType.Officer, faction: Faction.Empire,
                unique: true, modification: false, points: 5, upgradeClass: UpgradeClass.Normal,
                text: "While defending against a ship, if your speed is 3 or higher, the attack is treated as obstructed. After you execute a maneuver, if you overlapped a ship, discard this card."
            },
            {
                id: 10202, name: 'Admiral Titus', type: UpgradeType.Officer, faction: Faction.Empire,
                unique: true, modification: false, points: 2, upgradeClass: UpgradeClass.Normal,
                text: "At the start of the first round, you may change 1 enemy ship's speed by 1."
            },
            {
                id: 10203, name: 'Agent Kallus', type: UpgradeType.Officer, faction: Faction.Empire,
                unique: true, modification: false, points: 3, upgradeClass: UpgradeClass.Normal,
                text: "While attacking a unique squadron, add 1 die of any color to your attack pool."
            },
            {
                id: 10204, name: 'Captain Brunson', type: UpgradeType.Officer, faction: Faction.Empire,
                unique: true, modification: false, points: 5, upgradeClass: UpgradeClass.Normal,
                text: "While defending at distance 1-2 of an obstacle, during the Spend Defense Tokens step, you may exhaust this card to choose and cancel 1 attack die."
            },
            {
                id: 10205, name: 'Captain Needa', type: UpgradeType.Officer, faction: Faction.Empire,
                unique: true, modification: false, points: 2, upgradeClass: UpgradeClass.Normal,
                text: "At the start of the first round, you may replace 1 of your defense tokens with an evade defense token."
            },
            {
                id: 10206, name: 'Commandant Aresko', type: UpgradeType.Officer, faction: Faction.Empire,
                unique: true, modification: false, points: 2, upgradeClass: UpgradeClass.Normal,
                text: "When another friendly ship at distance 1-3 reveals a command, you may exhaust this card to gain 1 command token of the same type."
            },
            {
                id: 10207, name: 'Commander Beck', type: UpgradeType.Officer, faction: Faction.Empire,
                unique: true, modification: false, points: 3, upgradeClass: UpgradeClass.Normal,
                text: "During your activation, you may resolve a command as if you had spent a command token. If you do, gain 1 raid token of the matching type. You may resolve this effect twice per activation."
            },
            {
                id: 10208, name: 'Commander Gherant', type: UpgradeType.Officer, faction: Faction.Empire,
                unique: true, modification: false, points: 2, upgradeClass: UpgradeClass.Normal,
                text: "While defending, the attacker cannot resolve critical effects. Discard this card after you perform an attack against a ship."
            },
            {
                id: 10209, name: 'Commander Vanto', type: UpgradeType.Officer, faction: Faction.Empire,
                unique: true, modification: false, points: 7, upgradeClass: UpgradeClass.Normal,
                text: "After you resolve the first command during your activation, you may exhaust this card to gain 1 command token of any type."
            },
            {
                id: 10210, name: 'Commander Woldar', type: UpgradeType.Officer, faction: Faction.Empire,
                unique: true, modification: false, points: 4, upgradeClass: UpgradeClass.Normal,
                text: "While a friendly, non-swarm squadron at distance 1-3 is attacking a squadron, it may reroll 1 die of any color."
            },
            {
                id: 10211, name: 'Director ISard', type: UpgradeType.Officer, faction: Faction.Empire,
                unique: true, modification: false, points: 3, upgradeClass: UpgradeClass.Normal,
                text: "When you reveal a command, you may look at all command dials assigned to one enemy ship."
            },
            {
                id: 10212, name: 'Director Krennic', type: UpgradeType.Officer, faction: Faction.Empire,
                unique: true, modification: false, points: 8, upgradeClass: UpgradeClass.Normal,
                text: "Concentrate Fire: While attacking at medium-long range, if you spent a concentrate fire dial, you may also reroll any number of red dice in your attack pool. If you spent a concentrate fire token, you may also reroll up to 2 red dice in your attack pool."
            },
            {
                id: 10213, name: 'Governor Price', type: UpgradeType.Officer, faction: Faction.Empire,
                unique: true, modification: false, points: 7, upgradeClass: UpgradeClass.Normal,
                text: "Medium or large ship only. After deploying fleets, you may place 1 round token on this card. If you do, during the round matching that round token, you must activate at the end of the Ship Phase (after all other ships have activated).",
                sizeRestriction: [Size.Medium, Size.Large]
            },
            {
                id: 10214, name: 'Iden Versio', type: UpgradeType.Officer, faction: Faction.Empire,
                unique: true, modification: false, points: 6, upgradeClass: UpgradeClass.Normal,
                text: "When you resolve the evade defense effect, you can cancel 1 die at close range or distance 1. Squadron: You may discard this card to choose 1 enemy ship at close range. That ship gains 1 raid token of your choice."
            },
            {
                id: 10215, name: 'Instructor Goran', type: UpgradeType.Officer, faction: Faction.Empire,
                unique: true, modification: false, points: 7, upgradeClass: UpgradeClass.Normal,
                text: "While a friendly non-heavy squadron is at distance 1-2, it has Counter 1 or increases its Counter value by 1."
            },
            {
                id: 10216, name: 'Lira Wessex', type: UpgradeType.Officer, faction: Faction.Empire,
                unique: true, modification: false, points: 2, upgradeClass: UpgradeClass.Normal,
                text: "When you are dealt a faceup damage card, you may spend 1 engineering token to flip that card facedown (without resolving its effect)."
            },
            {
                id: 10217, name: 'Minister Tua', type: UpgradeType.Officer, faction: Faction.Empire,
                unique: true, modification: false, points: 2, upgradeClass: UpgradeClass.SlotGranting,
                grantedType: UpgradeType.DefensiveRetrofit,
                text: "You gain 1 additional Defensive Retrofit icon in your upgrade bar. You cannot equip this card to a medium or large ship with a Defensive Retrofit in its upgrade bar."
            },
            {
                id: 10218, name: 'Taskmaster Grint', type: UpgradeType.Officer, faction: Faction.Empire,
                unique: true, modification: false, points: 5, upgradeClass: UpgradeClass.Normal,
                text: "After deploying fleets, chhose and place 1 command token on this card. When you reveal a command matching that token, you may gain 1 matching command token without spending the command dial."
            },
            {
                id: 10219, name: 'The Grand Inquisitor', type: UpgradeType.Officer, faction: Faction.Empire,
                unique: true, modification: false, points: 4, upgradeClass: UpgradeClass.Normal,
                text: "When an enemy ship at distance 1-5 changes its speed, you may exhaust this card to increase or decrease your speed by 1."
            },
            {
                id: 10220, name: 'Wulff Yularen', type: UpgradeType.Officer, faction: Faction.Empire,
                unique: true, modification: false, points: 7, upgradeClass: UpgradeClass.Normal,
                text: "When you spend a command token, you may exhaust this card to gain one command token of the same type."
            },
            // Rebel Officers
            {
                id: 10500, name: 'Adar Tallon', type: UpgradeType.Officer, faction: Faction.Rebels,
                unique: true, modification: false, points: 10, upgradeClass: UpgradeClass.Normal,
                text: "After you resolve a squadron command, exhaust this card to toggle the activation slider of one squadron activated with that command."
            },
            {
                id: 10501, name: 'Ahsoka Tano', type: UpgradeType.Officer, faction: Faction.Rebels,
                unique: true, modification: false, points: 2, upgradeClass: UpgradeClass.Normal,
                text: "During the activation of a friendly ship at distance 1-5, you may exhaust this card to discard 1 command token from that ship. If you do, that ship may gain 1 command token of any type."
            },
            {
                id: 10502, name: 'Bail Organa', type: UpgradeType.Officer, faction: Faction.Rebels,
                unique: true, modification: false, points: 7, upgradeClass: UpgradeClass.Normal,
                text: "Medium or large ship only. After deploying fleets, you may place 1 round token on this card. At the start of the Ship Phase of the round matching that round token, if you are the second player you must activate, if you are the first player, you may gain up to 2 command tokens of your choice.",
                sizeRestriction: [Size.Medium, Size.Large]
            },
            {
                id: 10503, name: 'Captain Rex', type: UpgradeType.Officer, faction: Faction.Rebels,
                unique: true, modification: false, points: 5, upgradeClass: UpgradeClass.Normal,
                text: "Squadron: You may choose 1 enemy ship at close range. That ship gains 1 raid token of your choice. While you are at distance 1-3 of an enemy ship, that ship can discard only 1 raid token of any type when it discards a command dial."
            },
            {
                id: 10504, name: 'Ezra Bridger', type: UpgradeType.Officer, faction: Faction.Rebels,
                unique: true, modification: false, points: 3, upgradeClass: UpgradeClass.Normal,
                text: "When you reveal a command, you may discard this card to move 1 obstacle at distance 1-2 so that it is within distance 1-2 of its current location."
            },
            {
                id: 10505, name: 'General Draven', type: UpgradeType.Officer, faction: Faction.Rebels,
                unique: true, modification: false, points: 3, upgradeClass: UpgradeClass.Normal,
                text: "While attacking a squadron with Counter or Intel, add 1 die of any color to your attack pool."
            },
            {
                id: 10506, name: 'Lando Calrissian', type: UpgradeType.Officer, faction: Faction.Rebels,
                unique: true, modification: false, points: 4, upgradeClass: UpgradeClass.Normal,
                text: "While defending, during the Spend Defense Tokens Step, you may discard this card to force the attacker 1 or more dice of your choice."
            },
            {
                id: 10507, name: 'Leia Organa', type: UpgradeType.Officer, faction: Faction.Rebels,
                unique: true, modification: false, points: 3, upgradeClass: UpgradeClass.Normal,
                text: "When you reveal a command, you may choose another friendly ship at distance 1-5 and change that ship's top command to your revealed command."
            },
            {
                id: 10508, name: 'Major Derlin', type: UpgradeType.Officer, faction: Faction.Rebels,
                unique: true, modification: false, points: 7, upgradeClass: UpgradeClass.Normal,
                text: "Before you suffer damage from an attack, you may exhaust this card to reduce the total damage by 1."
            },
            {
                id: 10509, name: 'Raymus Antilles', type: UpgradeType.Officer, faction: Faction.Rebels,
                unique: true, modification: false, points: 7, upgradeClass: UpgradeClass.Normal,
                text: "When you reveal a command, you may gain one matching command token without spending the command dial."
            },
            {
                id: 10510, name: 'Sabine Wren', type: UpgradeType.Officer, faction: Faction.Rebels,
                unique: true, modification: false, points: 4, upgradeClass: UpgradeClass.Normal,
                text: "At the start of the Ship Phase, you may discard this card to place 1 proximity mine token in the play area at distance 1-2 of an obstacle and beyond distance 3 of enemy ships."
            },
            {
                id: 10511, name: 'Toryn Farr', type: UpgradeType.Officer, faction: Faction.Rebels,
                unique: true, modification: false, points: 7, upgradeClass: UpgradeClass.Normal,
                text: "While another friendly ship or squadron at distance 1-3 is attacking, it may reroll 1 blue die."
            },
            {
                id: 10512, name: 'Walex Blissex', type: UpgradeType.Officer, faction: Faction.Rebels,
                unique: true, modification: false, points: 5, upgradeClass: UpgradeClass.Normal,
                text: "When you activate, you may discard this card to recover 1 of your discarded defense tokens."
            },
            // Support Team - 11
            {
                id: 11000, name: 'Auxiliary Shields Team', type: UpgradeType.SupportTeam, faction: Faction.Any,
                unique: false, modification: false, points: 3, upgradeClass: UpgradeClass.Normal,
                text: ": You may treat the maximum shield values of your right and left hull zones as increased by 1 when you recover or move shields to those zones. If you do, the number of shields in those zones cannot exceed a maximum of \"4\"."
            },
            {
                id: 11001, name: 'Engine Techs', type: UpgradeType.SupportTeam, faction: Faction.Any,
                unique: false, modification: false, points: 8, upgradeClass: UpgradeClass.Normal,
                text: "Navigate: After you execute a maneuver, you may exhaust this card to execute a 1-speed maneuver."
            },
            {
                id: 11002, name: 'Engineering Team', type: UpgradeType.SupportTeam, faction: Faction.Any,
                unique: false, modification: false, points: 5, upgradeClass: UpgradeClass.Normal,
                text: "Engineering: Gain one additional engineering point."
            },
            {
                id: 11003, name: 'Fighter Coordination Team', type: UpgradeType.SupportTeam, faction: Faction.Any,
                unique: false, modification: false, points: 3, upgradeClass: UpgradeClass.Normal,
                text: "After you execute a maneuver, you may select a number of unengaged friendly squadrons up to your squadron value at close-medium range. Those squadrons may move up to distance 1."
            },
            {
                id: 11004, name: 'Medical Team', type: UpgradeType.SupportTeam, faction: Faction.Any,
                unique: false, modification: false, points: 1, upgradeClass: UpgradeClass.Normal,
                text: "Before you are dealt a faceup damage card with the Crew trait, you may discard this card to discard that damage card."
            },
            {
                id: 11005, name: 'Nav Team', type: UpgradeType.SupportTeam, faction: Faction.Any,
                unique: false, modification: false, points: 4, upgradeClass: UpgradeClass.Normal,
                text: "Navigate: Your navigate tokens can either change your speed or increase 1 yaw value by 1."
            },
            {
                id: 11006, name: 'Projection Experts', type: UpgradeType.SupportTeam, faction: Faction.Any,
                unique: false, modification: false, points: 6, upgradeClass: UpgradeClass.Normal,
                text: "Engineering: You may spend up to 2 engineering points to move that many shields from your ship to a friendly ship at distance 1-5."
            },
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
            {
                id: 13000, name: 'G-8 Experimental Projector', type: UpgradeType.ExperimentalRetrofit, faction: Faction.Any,
                unique: true, modification: false, points: 8, upgradeClass: UpgradeClass.Normal,
                text: "Before an enemy ship at distance 1-5 resolves the Determine Course step, you may exhaust this card to temporarily reduce its speed by 1 to a minimum of speed 0 until the end of the maneuver."
            },
            {
                id: 13001, name: 'G7-X Grav Well Projector', type: UpgradeType.ExperimentalRetrofit, faction: Faction.Any,
                unique: false, modification: false, points: 2, upgradeClass: UpgradeClass.Normal,
                text: "Before deploying fleets, place 1 grav well token anywhere in the play area. When a ship deploys at distance 1-3 of a grav well token, its speed dial must be set to 0."
            },
            {
                id: 13002, name: 'Grav Shift Reroute', type: UpgradeType.ExperimentalRetrofit, faction: Faction.Any,
                unique: true, modification: false, points: 2, upgradeClass: UpgradeClass.Normal,
                text: "Before deploying fleets, place 1 grav shift token anywhere in the play area. After deploying fleets, you may move each obstacle at distance 1-3 of that token to within distance 2 of that obstacle's current location. Obstacles cannot overlap tokens, obstacles, or ships."
            },
            {
                id: 13003, name: 'Targeting Scrambler', type: UpgradeType.ExperimentalRetrofit, faction: Faction.Any,
                unique: false, modification: false, points: 5, upgradeClass: UpgradeClass.Normal,
                text: "While a friendly ship at distance 1-3 is defending at close range, during the Spend Defense Tokens step, you may exhaust this card to force the attacker to reroll up to 4 dice of your choice."
            },
            // Defensive Retrofit - 14
            {
                id: 14000, name: 'Advanced Projectors', type: UpgradeType.DefensiveRetrofit, faction: Faction.Any,
                unique: false, modification: false, points: 6, upgradeClass: UpgradeClass.Normal,
                text: "When you resolve the redirect token effect, you can choose more than one hull zone to suffer damage, which may include a nonadjacent hull zone."
            },
            {
                id: 14001, name: 'Cluster Bombs', type: UpgradeType.DefensiveRetrofit, faction: Faction.Any,
                unique: false, modification: false, points: 5, upgradeClass: UpgradeClass.Normal,
                text: "After a squadron performs an attack against you, even if you are destroyed, you may discard this card to roll 4 blue dice. That squadron suffers 1 damage for each hit or critical icon rolled."
            },
            {
                id: 14002, name: 'Early Warning System', type: UpgradeType.DefensiveRetrofit, faction: Faction.Any,
                unique: false, modification: false, points: 7, upgradeClass: UpgradeClass.Normal,
                text: "At the start of each Ship Phase, you may choose 1 of your hull zones and mark it with a chaff token. Until the end of the round, while a ship or squadron is attacking that hull, the attack is obstructed. After the Status Phase, remove all chaff tokens."
            },
            {
                id: 14003, name: 'Electronic Countermeasures', type: UpgradeType.DefensiveRetrofit, faction: Faction.Any,
                unique: false, modification: false, points: 7, upgradeClass: UpgradeClass.Normal,
                text: "While defending, you may exhaust this card to spend 1 defense token that your opponent targeted with an accuracy result.	"
            },
            {
                id: 14004, name: 'Redundant Shields', type: UpgradeType.DefensiveRetrofit, faction: Faction.Any,
                unique: false, modification: true, points: 8, upgradeClass: UpgradeClass.Normal,
                text: "At the start of each Status Phase, you may recover 1 shield."
            },
            {
                id: 14005, name: 'Reinforced Blast Doors', type: UpgradeType.DefensiveRetrofit, faction: Faction.Any,
                unique: false, modification: false, points: 5, upgradeClass: UpgradeClass.Normal,
                text: "At the start of the Ship Phase, you may discard this card to discard up to 3 of your facedown damage cards."
            },
        ];
    }
}