import { CampaignType } from './campaignType';
import { CampaignState, SerializedCampaignState } from './campaignState';
import { Team, SerializedTeam } from './team';
import { SerializedCampaignLocation } from './campaignLocation';
import { CampaignLocation } from './campaignLocation';
import { Invite } from './invite';
import { CampaignPlayer } from './campaignPlayer';
import { CampaignUser } from './campaignUser';
import { Validator, RITRValidator } from './validator';
import { CampaignLocationFactory } from '../factories/campaignLocationFactory';
import { SerializedCampaignEvent, CampaignEvent } from './campaignEvent';
import { Phase } from './phase';
import { Faction } from '../faction';

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
        let factory = new CampaignLocationFactory();
        campaign.locations = factory.createCampaignLocations(campaign.type, data.locations);
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

    public getPlayers(): CampaignPlayer[] {
        return this.empire.players.concat(this.rebels.players);
    }

    public getPlayersMap(): { [id: string] : CampaignPlayer } {
        let players = this.getPlayers();
        let map = {};
        for (const player of players) {
            map[player.id] = player;
        }
        return map;
    }

    public getFactionOfPlayer(playerId: string): Faction {
        if (this.empire.players.find(x => x.id === playerId))
            return Faction.Empire;
        if (this.rebels.players.find(x => x.id === playerId))
            return Faction.Rebels;
        return null;
    }

    public campaignOwner(): CampaignUser {
        return this.campaignUsers.find(x => x.uid === this.ownerUid);
    }

    public invitedUsers(): CampaignUser[] {
        return this.campaignUsers.filter(x => x.uid !== this.ownerUid);
    }

    public addEvent(event: CampaignEvent) {
        this.currentState().addEvent(event);
    }

    public finishSetup() {
        if (this.currentState().act !== 0)
            throw new Error("Campaign is already started.");
            
        this.history.push(this.createTurn(true));
    }

    private createTurn(newAct = false): CampaignState {
        let turn = new CampaignState();
        let current = this.currentState();
        turn.phase = Phase.Strategy;
        turn.act = newAct ? current.act + 1 : current.act;
        turn.turn = newAct ? 1 : current.turn + 1;
        return turn;
    }
}