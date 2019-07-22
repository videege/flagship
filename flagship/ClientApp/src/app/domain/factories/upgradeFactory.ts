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
                id: 2000, name: 'Avenger', type: UpgradeType.Title, faction: Faction.Empire,
                unique: true, modification: false, points: 5, upgradeClass: UpgradeClass.Normal,
                text: "Something something something."
            },
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
                id: 5000, name: 'Darth Vader', type: UpgradeType.BoardingTeam, faction: Faction.Empire,
                unique: true, modification: false, points: 3, upgradeClass: UpgradeClass.Normal,
                text: "When you reveal a command, you may discard a squadron dial or token and this card to choose 1 enemy ship at close range. Choose and discard 1 non-commander upgrade card equipped to that ship."
            }
        ];
    }
}