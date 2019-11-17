import { Faction } from '../game/faction';
import { LocationControlType } from './locationControlType';
import { StrategicEffectType } from './strategicEffectType';
import { LocationReward } from './locationReward';

export interface SerializedCampaignLocation {
    id: number;
    controllingFaction: Faction;
    controlType: LocationControlType;
    chosenObjective: number;
    playedCampaignObjectives: number[];
}
 
export class CampaignLocation {
    public id: number;
    public name: string;
    public sectors: number[];
    public controllingFaction: Faction;
    public controlType: LocationControlType;

    public objectives: number[] = [];
    public playedCampaignObjectives: number[] = [];
    public chosenObjective: number;
    public strategicEffects: StrategicEffectType[] = [];
    public rewards: LocationReward[] = [];

    public baseAssaultBonus: number;

    public getSectors(): string {
        return this.sectors.join("/");
    }

    public hasEffects(): boolean {
        return this.strategicEffects && this.strategicEffects.length > 0;
    }

    public controlLabel(): string {
        if (this.controllingFaction === null) 
            return "Unoccupied";
        
        let faction = this.controllingFaction === Faction.Empire ? "Imperial" : "Rebel";
        let type = this.controlType === LocationControlType.Base ? "Base" : "Presence";
        return `${faction} ${type}`;
    }

    public setBase(faction: Faction, chosenObjective: number) {
        this.controllingFaction = faction;
        this.controlType = LocationControlType.Base;
        this.chosenObjective = chosenObjective;
    }

    public setPresence(faction: Faction) {
        this.controllingFaction = faction;
        this.controlType = LocationControlType.Presence,
        this.chosenObjective = null;
    }

    public setUnoccupied() {
        this.controllingFaction = null;
        this.controlType = null;
        this.chosenObjective = null;
    }

    public isInSameArea(location: CampaignLocation): boolean {
        return this.sectors.filter(x => location.sectors.includes(x)).length > 0;
    }

    public isBorderLocation(): boolean {
        return this.sectors.length > 1;
    }

    public markCampaignObjectiveAsPlayed(objectiveId: number) {
        this.playedCampaignObjectives.push(objectiveId);
    }

    public serialize(): SerializedCampaignLocation {
        return {
            id: this.id,
            controllingFaction: this.controllingFaction,
            controlType: this.controlType,
            chosenObjective: this.chosenObjective,
            playedCampaignObjectives: this.playedCampaignObjectives
        };
    }
    
    static newLocation(id: number, name: string, objectives: number[], strategicEffects: StrategicEffectType[],
        baseAssaultBonus: number, sectors: number[], rewards: LocationReward[], controllingFaction: Faction = null,
        controlType: LocationControlType = null, chosenObjective: number = null,
        playedCampaignObjectives: number[] = []): CampaignLocation {
            let location = new CampaignLocation();
            location.id = id;
            location.name = name;
            location.controllingFaction = controllingFaction;
            location.controlType = controlType;
            location.chosenObjective = chosenObjective;
            location.objectives = objectives;
            location.strategicEffects = strategicEffects;
            location.baseAssaultBonus = baseAssaultBonus;
            location.sectors = sectors;
            location.rewards = rewards;
            location.playedCampaignObjectives = playedCampaignObjectives;
            return location;
        }
}
