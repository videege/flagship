import { Faction } from '../faction';
import { LocationControlType } from './locationControlType';
import { StrategicEffectType } from './strategicEffectType';
import { LocationReward } from './locationReward';



export class Location {
    public name: string;
    public controllingFaction: Faction;
    public controlType: LocationControlType;

    public objectives: number[] = [];
    public strategicEffects: StrategicEffectType[] = [];
    public rewards: LocationReward[] = [];

    public campaignPoints: number;
}