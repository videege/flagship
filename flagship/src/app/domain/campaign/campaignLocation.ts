import { Faction } from '../faction';
import { LocationControlType } from './locationControlType';
import { StrategicEffectType } from './strategicEffectType';
import { LocationReward } from './locationReward';

export interface SerializedCampaignLocation {
    name: string;
    controllingFaction: Faction;
    controlType: LocationControlType;
    objectives: number[];
    strategicEffects: StrategicEffectType[];
    //rewards
    campaignPoints: number;
}
 
export class CampaignLocation {
    public name: string;
    public controllingFaction: Faction;
    public controlType: LocationControlType;

    public objectives: number[] = [];
    public strategicEffects: StrategicEffectType[] = [];
    public rewards: LocationReward[] = [];

    public campaignPoints: number;

    public serialize(): SerializedCampaignLocation {
        return {
            name: this.name,
            controllingFaction: this.controllingFaction,
            controlType: this.controlType,
            objectives: this.objectives,
            strategicEffects: this.strategicEffects,
            campaignPoints: this.campaignPoints
        };
    }

    static hydrate(data: SerializedCampaignLocation): CampaignLocation {
        let location = new CampaignLocation();
        location.name = data.name;
        location.controllingFaction = data.controllingFaction;
        location.controlType = data.controlType;
        location.objectives = data.objectives;
        location.strategicEffects = data.strategicEffects;
        location.campaignPoints = data.campaignPoints;
        return location;
    }
}