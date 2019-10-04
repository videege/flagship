import { CampaignType } from '../campaign/campaignType';
import { Team } from '../campaign/team';
import { Campaign } from '../campaign/campaign';
import { CampaignState } from '../campaign/campaignState';
import { Phase } from '../campaign/phase';
import { Faction } from '../faction';
import { CampaignLocation } from '../campaign/campaignLocation';
import { StrategicEffectType } from '../campaign/strategicEffectType';

export class CampaignFactory {

    public createCampaignLocations(campaign: Campaign): Campaign {
        switch (campaign.type) {
            case CampaignType.RITR:
                return this.createRITRCampaignLocations(campaign);
            case CampaignType.CC:
            default:
                throw new Error("Unsupported campaign type.")
        }
    }

    public createCampaign(name: string, type: CampaignType, ownerUid: string) {
        let campaign = new Campaign();
        campaign.id = null;
        campaign.inviteToken = null;
        campaign.name = name;
        campaign.type = type;
        campaign.ownerUid = ownerUid;
        campaign.playerUids = [ownerUid];
        campaign.empire = new Team();
        campaign.empire.faction = Faction.Empire;
        campaign.empire.name = 'Galactic Empire';
        campaign.rebels = new Team();
        campaign.rebels.faction = Faction.Rebels;
        campaign.rebels.name = 'Rebel Alliance';
        let now = new Date();
        campaign.startDate = now;
        campaign.statusDate = now;
        let initialState = new CampaignState();
        initialState.act = 0;
        initialState.turn = 0;
        initialState.phase = Phase.CampaignSetup;
        initialState.events = [];
        campaign.history = [initialState];
        campaign = this.createCampaignLocations(campaign);
        return campaign;
    }

    private createRITRCampaignLocations(campaign: Campaign): Campaign {
        campaign.locations = [
            CampaignLocation.newLocation('Tatooine', [], [StrategicEffectType.Ally], 2, [1]),
            CampaignLocation.newLocation('Geonosis', [], [StrategicEffectType.Diplomat], 1, [1]),
            CampaignLocation.newLocation('Coruscant', [], [StrategicEffectType.RepairYards, StrategicEffectType.Ally], 2, [1, 2]),
            CampaignLocation.newLocation('Mustafar', [], [], 1, [2])
        ]
        return campaign;
    }
}