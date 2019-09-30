import { CampaignType } from './campaignType';
import { CampaignState, SerializedCampaignState } from './campaignState';
import { Team, SerializedTeam } from './team';
import { SerializedCampaignLocation } from './campaignLocation';
import { CampaignLocation } from './campaignLocation';

export interface SerializedCampaign {
    id: string;
    ownerUid: string;
    playerUids: string[];
    type: CampaignType;
    name: string;
    startDate: Date;
    statusDate: Date;
    history: SerializedCampaignState[];
    empire: SerializedTeam;
    rebels: SerializedTeam;
    locations: SerializedCampaignLocation[];
}

export class Campaign {
    public id: string;
    public ownerUid: string;
    public playerUids: string[] = [];
    public type: CampaignType;
    public name: string;
    public startDate: Date;
    public statusDate: Date;
    public history: CampaignState[];

    public empire: Team;
    public rebels: Team;

    public locations: CampaignLocation[] = [];

    public serialize(): SerializedCampaign {
        return {
            id: this.id,
            name: this.name,
            ownerUid: this.ownerUid,
            playerUids: this.playerUids,
            type: this.type,
            startDate: this.startDate,
            statusDate: this.statusDate,
            history: this.history.map(x => x.serialize()),
            empire: this.empire.serialize(),
            rebels: this.rebels.serialize(),
            locations: this.locations.map(x => x.serialize())
        }
    }

    static hydrate(data: SerializedCampaign): Campaign {
        let campaign = new Campaign();
        campaign.id = data.id;
        campaign.name = data.name;
        campaign.ownerUid = data.ownerUid;
        campaign.playerUids = data.playerUids;
        campaign.type = data.type;
        campaign.startDate = data.startDate;
        campaign.statusDate = data.statusDate;
        campaign.history = data.history.map(x => CampaignState.hydrate(x));
        campaign.empire = Team.hydrate(data.empire);
        campaign.rebels = Team.hydrate(data.rebels);
        campaign.locations = data.locations.map(x => CampaignLocation.hydrate(x));
        return campaign;
    }

    public numberOfPlayers(): number {
        return this.empire.numberOfPlayers() + this.rebels.numberOfPlayers();
    }

    public typeName() {
        switch (this.type) {
            case CampaignType.CC:
                return "Corellian Conflict";
            case CampaignType.RITR:
                return "Rebellion in the Rim";
            default:
                return "Unknown";
        }
    }

    private areTeamsBalanced(): boolean {
        return this.empire.numberOfPlayers() === this.rebels.numberOfPlayers();
    }


}