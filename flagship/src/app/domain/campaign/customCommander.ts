import { CustomAbilityFactory } from '../factories/customAbilityFactory';
import { CustomCommanderAbility } from './customCommanderAbility';
import { Subject } from 'rxjs';

export interface SerializedCustomCommander {
    name: string;
    lifetimeExperience: number;
    currentExperience: number;
    abilities: number[];
}

export class CustomCommander {
    public subject: Subject<number>;
    public name: string = null;
    public lifetimeExperience: number = 0;
    public currentExperience: number = 0;
    public abilities: CustomCommanderAbility[] = [];

    constructor() {
        this.subject = new Subject<number>();
    }

    addExperience(xp: number) {
        this.currentExperience += xp;
        this.lifetimeExperience += xp;
    }

    getText(): string {
        if (!this.abilities.length) return '';

        return this.abilities.map(x => x.name).join(', ');
    }

    totalTiers(): number {
        if (!this.abilities.length) return 0;

        return this.abilities.map(x => x.tier).reduce((sum, val) => sum + val);
    }

    setAbilities(abilities: CustomCommanderAbility[], newExperience: number) {
       this.abilities = abilities;
       this.currentExperience = newExperience;
       this.subject.next(-1);
    }

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