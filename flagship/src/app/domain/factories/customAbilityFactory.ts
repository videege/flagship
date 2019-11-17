import { CustomCommanderAbility } from "../campaign/customCommanderAbility";
import { CustomCommanderAbilityCategory } from '../campaign/customCommanderAbilityCategory';
import { CustomAbilitySelectorData } from 'src/app/fleets/custom-ability-selector/custom-ability-selector.component';

/*
{
    id: 1,
    category: CustomCommanderAbilityCategory.Engineering,
    prerequisiteId: null,
    xpCost: 1,
    tier: 1,
    name: '',
    text: ''
}
*/
export class CustomAbilityFactory {
    static abilities: CustomCommanderAbility[] = [
        {
            id: 1,
            category: CustomCommanderAbilityCategory.Engineering,
            prerequisiteId: null,
            xpCost: 2,
            tier: 1,
            rank: null,
            group: null,
            name: 'Repair Expert',
            text: 'During the Refit and Expand Fleets step of the Management Phase, you may remove 1 additional scar token from a ship or squadron in your fleet.'
        },
        {
            id: 2,
            category: CustomCommanderAbilityCategory.Engineering,
            prerequisiteId: null,
            xpCost: 3,
            tier: 1,
            rank: 1,
            group: 1,
            name: 'Master Engineer I',
            text: 'After fleets are deployed, you may gain 1 engineering token. When you resolve a engineering command, if you spent an engineering token you gain 1 additional engineering point. If you spent an engineering dial, the first Repair Hull effect you resolve costs 2 engineering points.'
        },
        {
            id: 3,
            category: CustomCommanderAbilityCategory.Engineering,
            prerequisiteId: 2,
            xpCost: 3,
            tier: 2,
            rank: 2,
            group: 1,
            name: 'Master Engineer II',
            text: 'After fleets are deployed, each friendly ship may gain 1 engineering token. When a friendly ship resolves an engineering command, if it spent anengineering token it gains 1 additional engineering point. If it spent an engineering dial, the first Repair Hull effect it resolves costs 2 engineering points.'
        },
        {
            id: 4,
            category: CustomCommanderAbilityCategory.Engineering,
            prerequisiteId: 3,
            xpCost: 1,
            tier: 3,
            rank: 3,
            group: 1,
            name: 'Master Engineer III',
            text: 'After fleets are deployed, each friendly ship may gain 1 engineering token. When a friendly ship resolves an engineering command, if it spent an engineering token it gains 1 additional engineering point. If it spent an engineering dial, the first Repair Hull effect it resolves costs 2 engineering points and for each Recover Shields effect it resolves, it may also move 1 shield.'
        },
        // Espionage
        {
            id: 5,
            category: CustomCommanderAbilityCategory.Espionage,
            prerequisiteId: null,
            xpCost: 2,
            tier: 1,
            rank: 1,
            group: 2,
            name: 'Infiltrator I',
            text: 'After deploying fleets, if your flagship\'s size class is small, you may pick your flagship up and redeploy it within your deployment zone.'
        },
        {
            id: 6,
            category: CustomCommanderAbilityCategory.Espionage,
            prerequisiteId: 5,
            xpCost: 3,
            tier: 2,
            rank: 2,
            group: 2,
            name: 'Infiltrator II',
            text: 'After deploying fleets, you may pick 1 friendly ship up with a size class of medium or small and redeploy it within your deployment zone.'
        },
        {
            id: 7,
            category: CustomCommanderAbilityCategory.Espionage,
            prerequisiteId: 6,
            xpCost: 4,
            tier: 3,
            rank: 3,
            group: 2,
            name: 'Infiltrator III',
            text: 'After deploying fleets, your may pick 1 friendly, non-huge ship up and redeploy it within your deployment zone. At the first round, up to 2 friendly ships may perform a speed-1 maneuver.'
        },
        {
            id: 8,
            category: CustomCommanderAbilityCategory.Espionage,
            prerequisiteId: null,
            xpCost: 2,
            tier: 1,
            rank: 1,
            group: 3,
            name: 'Concealment I',
            text: 'While you are defending at distance 1 of an obstacle, during the Spend Defense Tokens step, you may discard a defense token to cancel 1 die.'
        },
        {
            id: 9,
            category: CustomCommanderAbilityCategory.Espionage,
            prerequisiteId: 8,
            xpCost: 3,
            tier: 2,
            rank: 2,
            group: 3,
            name: 'Concealment II',
            text: 'While a friendly ship is defending at distance 1 of an obstacle, during the Spend Defense Tokens step, it may discard a defense token to cancel 1 die.'
        },
        {
            id: 10,
            category: CustomCommanderAbilityCategory.Espionage,
            prerequisiteId: 9,
            xpCost: 3,
            tier: 3,
            rank: 3,
            group: 3,
            name: 'Concealment III',
            text: 'While a friendly ship is defending at distance 1 of an obstacle, during the Spend Defense Tokens step, it may discard up to 2 defense tokens. For each token it discards, cancel 1 die.'
        },
        // Gunnery
        {
            id: 11,
            category: CustomCommanderAbilityCategory.Gunnery,
            prerequisiteId: null,
            xpCost: 3,
            tier: 1,
            rank: 1,
            group: 4,
            name: 'Master Gunner I',
            text: 'After fleets are deployed, you may gain 1 Concentrate Fire token. When you resolve a command by spending a Concentrate Fire token only, you may treat that command as if you spent a command dial.'
        },
        {
            id: 12,
            category: CustomCommanderAbilityCategory.Gunnery,
            prerequisiteId: 11,
            xpCost: 3,
            tier: 2,
            rank: 2,
            group: 4,
            name: 'Master Gunner II',
            text: 'After fleets are deployed, each friendly ship may gain 1 Concentrate Fire token. When a friendly ship resolves a command by spending a Concentrate Fire token only, that ship may treat that command as if it spent a command dial.'
        },
        {
            id: 13,
            category: CustomCommanderAbilityCategory.Gunnery,
            prerequisiteId: 12,
            xpCost: 4,
            tier: 3,
            rank: 3,
            group: 4,
            name: 'Master Gunner III',
            text: 'After fleets are deployed, each friendly ship may gain 1 Concentrate Fire token. When a friendly ship resolves a Concentrate Fire command by spending a Concentrate Fire token only, that ship may treat that command as if it spent a command dial. When a friendly ship resolves the Concentrate Fire command, if it spent a Concentrate Fire dial, the die it adds to the attack pool may be of any color.'
        },
        {
            id: 14,
            category: CustomCommanderAbilityCategory.Gunnery,
            prerequisiteId: null,
            xpCost: 3,
            tier: 1,
            rank: 1,
            group: 5,
            name: 'Ambush Gunner I',
            text: 'While you are attacking at distance 1-2 of an obstacle or friendly ship, your attacks cannot be obstructed.'
        },
        {
            id: 15,
            category: CustomCommanderAbilityCategory.Gunnery,
            prerequisiteId: 14,
            xpCost: 3,
            tier: 2,
            rank: 2,
            group: 5,
            name: 'Ambush Gunner II',
            text: 'While a friendly ship is attacking at distance 1-2 of an obstacle or friendly ship, its attacks cannot be obstructed.'
        },
        {
            id: 16,
            category: CustomCommanderAbilityCategory.Gunnery,
            prerequisiteId: null,
            xpCost: 3,
            tier: 2,
            rank: null,
            group: null,
            name: 'Ion Technician',
            text: 'While a friendly ship is attacking, it may add 1 blue die to its attack pool. If it does, remove 1 die from attack pool.'
        },
        {
            id: 17,
            category: CustomCommanderAbilityCategory.Gunnery,
            prerequisiteId: null,
            xpCost: 3,
            tier: 2,
            rank: null,
            group: null,
            name: 'Ordnance Expert',
            text: 'While a friendly ship is attacking at short range, it may add 1 black die to its attack pool. If it does, remove 1 die from the attack pool.'
        },
        // Logistics
        {
            id: 18,
            category: CustomCommanderAbilityCategory.Logistics,
            prerequisiteId: null,
            xpCost: 2,
            tier: 1,
            rank: null,
            group: null,
            name: 'Ready Defender',
            text: 'You do not gain the "Low Fuel" condition card after you declare you will defend at a location in an area with no friendly base sticker.'
        },
        {
            id: 19,
            category: CustomCommanderAbilityCategory.Logistics,
            prerequisiteId: null,
            xpCost: 2,
            tier: 1,
            rank: null,
            group: null,
            name: 'Independent Raider',
            text: 'You do not gain the "Low Fuel" condition card after you declare an assault at a location in an area with no friendly base sticker that is adjacent to an area with a friendly base sticker.'
        },
        {
            id: 20,
            category: CustomCommanderAbilityCategory.Logistics,
            prerequisiteId: null,
            xpCost: 3,
            tier: 2,
            rank: null,
            group: null,
            name: 'Additional Support',
            text: 'One of your fleet\'s ships with a Fleet Support icon in its upgrade bar gains 1 additional Fleet Support icon in its upgrade bar.'
        },
        {
            id: 21,
            category: CustomCommanderAbilityCategory.Logistics,
            prerequisiteId: null,
            xpCost: 3,
            tier: 2,
            rank: null,
            group: null,
            name: 'Command Staff',
            text: 'You gain 1 additional Officer icon in your upgrade bar.'
        },
        {
            id: 22,
            category: CustomCommanderAbilityCategory.Logistics,
            prerequisiteId: null,
            xpCost: 4,
            tier: 2,
            rank: null,
            group: null,
            name: 'Command Bridge',
            text: 'One medium or large ship in your fleet that does not have a Fleet Command icon in its upgrade bar gains 1 additional Fleet Command icon in its upgrade bar.'
        },
        // Navigation
        {
            id: 23,
            category: CustomCommanderAbilityCategory.Navigation,
            prerequisiteId: null,
            xpCost: 3,
            tier: 1,
            rank: 1,
            group: 6,
            name: 'Master Navigator I',
            text: 'After fleets are deployed, you may gain 1 Navigate token. When you resolve a Navigate command you may increase the last yaw value at your current speed by 1 or change your speed by an additional 1.'
        },
        {
            id: 24,
            category: CustomCommanderAbilityCategory.Navigation,
            prerequisiteId: 23,
            xpCost: 4,
            tier: 2,
            rank: 2,
            group: 6,
            name: 'Master Navigator II',
            text: 'After fleets are deployed, each friendly ship may gain 1 Navigate token. When a friendly ship resolves a Navigate command, it may increase the last yaw value at its current speed by 1 or change its speed by an additional 1.'
        },
        {
            id: 25,
            category: CustomCommanderAbilityCategory.Navigation,
            prerequisiteId: 24,
            xpCost: 4,
            tier: 3,
            rank: 3,
            group: 6,
            name: 'Master Navigator III',
            text: 'After fleets are deployed, each friendly ship may gain 1 Navigate token. When a friendly ship resolves a Navigate command, it may increase 1 additional yaw value by 1 or change its speed by an additional 1.'
        },
        {
            id: 26,
            category: CustomCommanderAbilityCategory.Navigation,
            prerequisiteId: null,
            xpCost: 2,
            tier: 1,
            rank: 1,
            group: 7,
            name: 'Rockhopper I',
            text: 'Once per game, you can ignore the effects of overlapping an obstacle.'
        },
        {
            id: 27,
            category: CustomCommanderAbilityCategory.Navigation,
            prerequisiteId: 26,
            xpCost: 3,
            tier: 2,
            rank: 2,
            group: 7,
            name: 'Rockhopper II',
            text: 'Once per game, 1 friendly ship can ignore the effects of overlapping an obstacle.'
        },
        // Squadrons
        {
            id: 28,
            category: CustomCommanderAbilityCategory.SquadronTactics,
            prerequisiteId: null,
            xpCost: 3,
            tier: 1,
            rank: 1,
            group: 8,
            name: 'Master Coordinator I',
            text: 'After fleets are deployed, you may gain 1 Squadron token. When you resolve a Squadron command, if you spent a Squadron token, you may activate 1 additional squadron.'
        },
        {
            id: 29,
            category: CustomCommanderAbilityCategory.SquadronTactics,
            prerequisiteId: 28,
            xpCost: 3,
            tier: 2,
            rank: 2,
            group: 8,
            name: 'Master Coordinator II',
            text: 'After fleets are deployed, each friendly ship may gain 1 Squadron token. When a friendly ship resolves a Squadron command, if it spent a Squadron token, it may activate 1 additional squadron.'
        },
        {
            id: 30,
            category: CustomCommanderAbilityCategory.SquadronTactics,
            prerequisiteId: 29,
            xpCost: 4,
            tier: 3,
            rank: 3,
            group: 8,
            name: 'Master Coordinator III',
            text: 'After fleets are deployed, each friendly ship may gain 1 Squadron token. When a friendly ship resolves a Squadron command, the squadron it activates may be at close-long range. If that ship spent a Squadron token, it may activate 1 additional squadron.'
        },
        {
            id: 31,
            category: CustomCommanderAbilityCategory.SquadronTactics,
            prerequisiteId: null,
            xpCost: 2,
            tier: 1,
            rank: null,
            group: null,
            name: 'Rapid Deployment',
            text: 'While deploying fleets, your fleet\'s squadrons can be placed at distance 1-3 of a friendly ship.'
        },
        {
            id: 32,
            category: CustomCommanderAbilityCategory.SquadronTactics,
            prerequisiteId: null,
            xpCost: 4,
            tier: 2,
            rank: null,
            group: null,
            name: 'Fighter Group Leader',
            text: 'When a friendly ship resolves a Squadron command, each squadron that ship activates may reroll 1 die while attacking until the end of its activation.'
        }
    ];

    public getAbility(id: number) {
        return CustomAbilityFactory.abilities.find(x => x.id === id);
    }

    public getAbilities() {
        return CustomAbilityFactory.abilities;
    }

    public getNextRank(ability: CustomCommanderAbility) {
        return CustomAbilityFactory.abilities.find(x => x.prerequisiteId === ability.id);
    }
}
