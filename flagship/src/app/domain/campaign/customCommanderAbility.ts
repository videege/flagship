import { CustomCommanderAbilityCategory } from "./customCommanderAbilityCategory";

export interface CustomCommanderAbility {
    id: number;
    prerequisiteId: number;
    rank: number;
    group: number;
    category: CustomCommanderAbilityCategory;
    tier: number;
    xpCost: number; 
    name: string;
    text: string;
}
