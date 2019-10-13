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