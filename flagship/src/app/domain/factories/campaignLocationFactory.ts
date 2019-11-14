import { CampaignType } from '../campaign/campaignType';
import { SerializedCampaignLocation, CampaignLocation } from '../campaign/campaignLocation';
import { StrategicEffectType } from '../campaign/strategicEffectType';
import { LocationReward } from '../campaign/locationReward';
import { UpgradeType } from '../upgradeType';

interface StaticLocationData {
    id: number;
    name: string;
    objectives: number[];
    effects: StrategicEffectType[];
    baseAssaultBonus: number;
    sectors: number[];
    rewards: LocationReward[];
}

export class CampaignLocationFactory {
    public createCampaignLocations(campaignType: CampaignType, serializedLocations: SerializedCampaignLocation[]): CampaignLocation[] {
        switch (campaignType) {
            case CampaignType.RITR:
                return this.createRITRCampaignLocations(serializedLocations);
            case CampaignType.CC:
            default:
                throw new Error("Unsupported campaign type.")
        }
    }

    private createRITRCampaignLocations(serializedLocations: SerializedCampaignLocation[]):
        CampaignLocation[] {
        let locations = this.ritrLocations.map(x => {
            let state = serializedLocations.find(s => s.id === x.id) || {
                id: x.id,
                controlType: null,
                controllingFaction: null,
                chosenObjective: null,
                playedCampaignObjectives: []
            };
            return CampaignLocation.newLocation(x.id,
                x.name, x.objectives, x.effects, x.baseAssaultBonus,
                x.sectors, x.rewards, state.controllingFaction,
                state.controlType, state.chosenObjective, state.playedCampaignObjectives);
        })
        return locations;
    }

    private ritrLocations: StaticLocationData[] = [
        {
            id: 1, name: 'Atollon', objectives: [5, 109], effects: [StrategicEffectType.Destiny],
            baseAssaultBonus: 0, sectors: [2], rewards: [LocationReward.upgradeReward(UpgradeType.Turbolaser, 10)]
        },
        {
            id: 2, name: 'Bespin', objectives: [212, 310], effects: [StrategicEffectType.Resources],
            baseAssaultBonus: 1, sectors: [5], rewards: [LocationReward.upgradeReward(UpgradeType.SupportTeam, 8),
            LocationReward.upgradeReward(UpgradeType.Title, 8)]
        },
        {
            id: 3, name: 'Concord Dawn', objectives: [305, 307], effects: [StrategicEffectType.SkilledSpacers],
            baseAssaultBonus: 1, sectors: [1, 2], rewards: [LocationReward.squadronReward(30)]
        },
        {
            id: 4, name: 'Dagobah', objectives: [211], effects: [StrategicEffectType.Destiny],
            baseAssaultBonus: 0, sectors: [5], rewards: [LocationReward.upgradeReward(UpgradeType.OffensiveRetrofit, 8)]
        },
        {
            id: 5, name: 'Dantooine', objectives: [304, 306], effects: [StrategicEffectType.Spynet], //****** */
            baseAssaultBonus: 1, sectors: [1], rewards: [LocationReward.upgradeReward(UpgradeType.SupportTeam, 10),
            LocationReward.upgradeReward(UpgradeType.Officer, 8)]
        },
        {
            id: 6, name: 'Dathomir', objectives: [305], effects: [StrategicEffectType.Destiny],
            baseAssaultBonus: 1, sectors: [1], rewards: [LocationReward.upgradeReward(UpgradeType.Title, 10)]
        },
        {
            id: 7, name: 'Endor', objectives: [307], effects: [],
            baseAssaultBonus: 2, sectors: [5], rewards: [LocationReward.upgradeReward(UpgradeType.WeaponsTeam, 10),
            LocationReward.upgradeReward(UpgradeType.ExperimentalRetrofit, 8)]
        },
        {
            id: 8, name: 'Felucia', objectives: [310], effects: [StrategicEffectType.Resources],
            baseAssaultBonus: 1, sectors: [1], rewards: [LocationReward.upgradeReward(UpgradeType.Officer, 10)]
        },
        {
            id: 9, name: 'Geonosis', objectives: [308], effects: [],
            baseAssaultBonus: 1, sectors: [4], rewards: [LocationReward.upgradeReward(UpgradeType.IonCannons, 10),
            LocationReward.upgradeReward(UpgradeType.Title, 8)]
        },
        {
            id: 10, name: 'Hoth', objectives: [103, 204], effects: [],
            baseAssaultBonus: 0, sectors: [5], rewards: [LocationReward.upgradeReward(UpgradeType.IonCannons, 10)]
        },
        {
            id: 11, name: 'Kessel', objectives: [9, 112, 311], effects: [StrategicEffectType.Resources],
            baseAssaultBonus: 2, sectors: [3], rewards: [LocationReward.upgradeReward(UpgradeType.Title, 12)]
        },
        {
            id: 12, name: 'Lothal', objectives: [306, 308], effects: [StrategicEffectType.Resources],
            baseAssaultBonus: 1, sectors: [2,3], rewards: [LocationReward.squadronReward(30)]
        },
        {
            id: 13, name: 'Mandalore', objectives: [309], effects: [StrategicEffectType.Ally, StrategicEffectType.RepairYards],
            baseAssaultBonus: 2, sectors: [2], rewards: [LocationReward.upgradeReward(UpgradeType.Officer, 10),
            LocationReward.upgradeReward(UpgradeType.Ordnance, 10)]
        },
        {
            id: 14, name: 'Mon Cala', objectives: [309], effects: [StrategicEffectType.SkilledSpacers, StrategicEffectType.RepairYards],
            baseAssaultBonus: 2, sectors: [2], rewards: [LocationReward.upgradeReward(UpgradeType.OffensiveRetrofit, 10),
            LocationReward.upgradeReward(UpgradeType.Title, 10)]
        },
        {
            id: 15, name: 'Montross', objectives: [8, 206, 307], effects: [StrategicEffectType.SkilledSpacers],
            baseAssaultBonus: 1, sectors: [3], rewards: [LocationReward.upgradeReward(UpgradeType.OffensiveRetrofit, 10),
            LocationReward.squadronReward(30)]
        },
        {
            id: 16, name: 'Mustafar', objectives: [109], effects: [StrategicEffectType.Resources],
            baseAssaultBonus: 1, sectors: [5], rewards: [LocationReward.upgradeReward(UpgradeType.FleetSupport, 8),
            LocationReward.upgradeReward(UpgradeType.Turbolaser, 10)]
        },
        {
            id: 17, name: 'Mygeeto', objectives: [311], effects: [StrategicEffectType.Diplomats, StrategicEffectType.Resources],
            baseAssaultBonus: 1, sectors: [1], rewards: [LocationReward.upgradeReward(UpgradeType.FleetCommand, 8),
            LocationReward.upgradeReward(UpgradeType.IonCannons, 8)]
        },
        {
            id: 18, name: 'Nal Hutta', objectives: [6, 309], effects: [StrategicEffectType.Ally, StrategicEffectType.Spynet],
            baseAssaultBonus: 1, sectors: [3], rewards: [LocationReward.squadronReward(24)]
        },
        {
            id: 19, name: 'Nar Shaddaa', objectives: [305], effects: [StrategicEffectType.RepairYards],
            baseAssaultBonus: 1, sectors: [3, 4], rewards: [LocationReward.upgradeReward(UpgradeType.Officer, 8)]
        },
        {
            id: 20, name: 'Ord Mantell', objectives: [1], effects: [StrategicEffectType.RepairYards],
            baseAssaultBonus: 1, sectors: [1, 5], rewards: [LocationReward.upgradeReward(UpgradeType.OffensiveRetrofit, 10),
            LocationReward.upgradeReward(UpgradeType.DefensiveRetrofit, 10)]
        },
        {
            id: 21, name: 'Raxus Prime', objectives: [201, 311], effects: [],
            baseAssaultBonus: 0, sectors: [2], rewards: [LocationReward.upgradeReward(UpgradeType.IonCannons, 10),
            LocationReward.upgradeReward(UpgradeType.ExperimentalRetrofit, 8)]
        },
        {
            id: 22, name: 'Ring of Kafrene', objectives: [104, 304], effects: [StrategicEffectType.Spynet],
            baseAssaultBonus: 1, sectors: [4, 5], rewards: [LocationReward.upgradeReward(UpgradeType.Officer, 8),
            LocationReward.upgradeReward(UpgradeType.Ordnance, 10)]
        },
        {
            id: 23, name: 'Rodia', objectives: [211], effects: [StrategicEffectType.Diplomats, StrategicEffectType.SkilledSpacers],
            baseAssaultBonus: 2, sectors: [3], rewards: [LocationReward.upgradeReward(UpgradeType.Turbolaser, 10)]
        },
        {
            id: 24, name: 'Ryloth', objectives: [11, 306], effects: [StrategicEffectType.Diplomats, StrategicEffectType.SkilledSpacers],
            baseAssaultBonus: 2, sectors: [4], rewards: [LocationReward.upgradeReward(UpgradeType.WeaponsTeam, 10)]
        },
        {
            id: 25, name: 'Saleucami', objectives: [1, 109], effects: [],
            baseAssaultBonus: 1, sectors: [3], rewards: [LocationReward.upgradeReward(UpgradeType.IonCannons, 10)]
        },
        {
            id: 26, name: 'Smuggler\'s Run', objectives: [103, 305], effects: [StrategicEffectType.Spynet],
            baseAssaultBonus: 1, sectors: [4], rewards: [LocationReward.squadronReward(24)]
        },
        {
            id: 27, name: 'Sullust', objectives: [102, 310], effects: [StrategicEffectType.SkilledSpacers, StrategicEffectType.Resources],
            baseAssaultBonus: 2, sectors: [4], rewards: [LocationReward.upgradeReward(UpgradeType.DefensiveRetrofit, 10),
            LocationReward.upgradeReward(UpgradeType.Officer, 10)]
        },
        {
            id: 28, name: 'Tatooine', objectives: [6], effects: [StrategicEffectType.Destiny],
            baseAssaultBonus: 0, sectors: [4], rewards: [LocationReward.upgradeReward(UpgradeType.OffensiveRetrofit, 10, 4)]
        },
        {
            id: 29, name: 'Utapau', objectives: [7], effects: [],
            baseAssaultBonus: 1, sectors: [4], rewards: [LocationReward.upgradeReward(UpgradeType.Turbolaser, 10)]
        },
        {
            id: 30, name: 'Yavin', objectives: [8], effects: [],
            baseAssaultBonus: 0, sectors: [2], rewards: [LocationReward.upgradeReward(UpgradeType.SupportTeam, 10),
            LocationReward.upgradeReward(UpgradeType.Ordnance, 14, 6)]
        }
    ]
}
