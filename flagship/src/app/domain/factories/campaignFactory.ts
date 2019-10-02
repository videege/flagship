import { CampaignType } from '../campaign/campaignType';
import { Team } from '../campaign/team';
import { Campaign } from '../campaign/campaign';
import { CampaignState } from '../campaign/campaignState';
import { Phase } from '../campaign/phase';
import { Faction } from '../faction';

export class CampaignFactory {

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

        return campaign;
    }
}