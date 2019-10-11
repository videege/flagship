import { CustomCommanderAbilityCategory } from "./CustomCommanderAbilityCategory";
export interface CustomCommanderAbility {
    id: number;
    prerequisiteId: number;
    category: CustomCommanderAbilityCategory;
    tier: number;
    xpCost: number;
    name: string;
    text: string;
}
