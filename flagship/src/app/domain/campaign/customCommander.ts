import { CustomAbilityFactory } from '../factories/customAbilityFactory';
import { CustomCommanderAbility } from './customCommanderAbility';

export interface SerializedCustomCommander {
   name: string;
   lifetimeExperience: number;
   currentExperience: number;
   abilities: number[];
}

export class CustomCommander {
    public name: string = null;
    public lifetimeExperience: number = 0;
    public currentExperience: number = 0;
    public abilities: CustomCommanderAbility[] = [];
    private maxTiers = 4;

    public serialize(): SerializedCustomCommander {
        return {
            name: this.name,
            lifetimeExperience: this.lifetimeExperience,
            currentExperience: this.currentExperience,
            abilities: this.abilities.map(x => x.id)
        };
    }

    static hydrate(data: SerializedCustomCommander): CustomCommander {
        let commander = new CustomCommander();
        let factory = new CustomAbilityFactory();
        commander.name = data.name;
        commander.lifetimeExperience = data.lifetimeExperience;
        commander.currentExperience = data.currentExperience;  
        commander.abilities = data.abilities.map(id => factory.getAbility(id));
        return commander;
    }
}