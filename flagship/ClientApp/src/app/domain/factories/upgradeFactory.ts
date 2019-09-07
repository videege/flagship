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