import { CampaignType } from './campaignType';
import { CampaignState, SerializedCampaignState } from './campaignState';
import { Team, SerializedTeam } from './team';
import { SerializedCampaignLocation } from './campaignLocation';
import { CampaignLocation } from './campaignLocation';
import { Invite } from './invite';
import { CampaignPlayer } from './campaignPlayer';
import { CampaignUser } from './campaignUser';
import { Validator, RITRValidator } from './validator';

export interface SerializedCampaign {
    id: string;
    ownerUid: string;
    campaignUsers: CampaignUser[];
    playerUids: string[];
    inviteToken: string;
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
    public campaignUsers: CampaignUser[] = [];
    public playerUids: string[] = [];
    public inviteToken: string;
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
            campaignUsers: this.campaignUsers,
            playerUids: this.playerUids,
            inviteToken: this.inviteToken,
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
        campaign.campaignUsers = data.campaignUsers || [];
        campaign.playerUids = data.playerUids || [];
        campaign.inviteToken = data.inviteToken || null;
        campaign.type = data.type;
        campaign.startDate = data.startDate;
        campaign.statusDate = data.statusDate;
        campaign.history = data.history.map(x => CampaignState.hydrate(x));
        campaign.empire = Team.hydrate(data.empire);
        campaign.rebels = Team.hydrate(data.rebels);
        campaign.locations = data.locations.map(x => CampaignLocation.hydrate(x));
        return campaign;
    }

    public currentState(): CampaignState {
        if (!this.history || !this.history.length) return null;

        return this.history[this.history.length - 1];
    }

    public inviteUrl(): string {
        return `${window.location.origin}/campaigns/${this.id}/invitation?token=${this.inviteToken}`;
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

    public getPlayer(playerId: string): CampaignPlayer {
        return this.empire.players.find(x => x.id === playerId) ||
            this.rebels.players.find(x => x.id === playerId);
    }

    public campaignOwner(): CampaignUser {
        return this.campaignUsers.find(x => x.uid === this.ownerUid);
    }

    public invitedUsers(): CampaignUser[] {
        return this.campaignUsers.filter(x => x.uid !== this.ownerUid);
    }
}