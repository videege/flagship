import { Faction } from '../faction';
import { LocationControlType } from './locationControlType';
import { StrategicEffectType } from './strategicEffectType';
import { LocationReward } from './locationReward';

export interface SerializedCampaignLocation {
    name: string;
    controllingFaction: Faction;
    controlType: LocationControlType;
    objectives: number[];
    chosenObjective: number;
    strategicEffects: StrategicEffectType[];
    //rewards
    campaignPoints: number;
    sectors: number[];
}
 
export class CampaignLocation {
    public name: string;
    public sectors: number[];
    public controllingFaction: Faction;
    public controlType: LocationControlType;

    public objectives: number[] = [];
    public chosenObjective: number;
    public strategicEffects: StrategicEffectType[] = [];
    public rewards: LocationReward[] = [];

    public campaignPoints: number;

    public getSectors(): string {
        return this.sectors.join("/");
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

    public serialize(): SerializedCampaignLocation {
        return {
            name: this.name,
            controllingFaction: this.controllingFaction,
            controlType: this.controlType,
            objectives: this.objectives,
            chosenObjective: this.chosenObjective,
            strategicEffects: this.strategicEffects,
            campaignPoints: this.campaignPoints,
            sectors: this.sectors
        };
    }

    static hydrate(data: SerializedCampaignLocation): CampaignLocation {
        let location = new CampaignLocation();
        location.name = data.name;
        location.controllingFaction = data.controllingFaction;
        location.controlType = data.controlType;
        location.objectives = data.objectives;
        location.chosenObjective = data.chosenObjective;
        location.strategicEffects = data.strategicEffects;
        location.campaignPoints = data.campaignPoints;
        location.sectors = data.sectors || [];
        return location;
    }

    static newLocation(name: string, objectives: number[], strategicEffects: StrategicEffectType[],
        campaignPoints: number, sectors: number[]): CampaignLocation {
            let location = new CampaignLocation();
            location.name = name;
            location.controllingFaction = null;
            location.controlType = null;
            location.chosenObjective = null;
            location.objectives = objectives;
            location.strategicEffects = strategicEffects;
            location.campaignPoints = campaignPoints;
            location.sectors = sectors;
            return location;
        }
}