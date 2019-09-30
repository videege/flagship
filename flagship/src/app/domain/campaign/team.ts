import { Faction } from '../faction';
import { CampaignPlayer, SerializedCampaignPlayer } from './campaignPlayer';

export interface SerializedTeam {
    faction: Faction;
    players: SerializedCampaignPlayer[];
    campaignPoints: number;
}

export class Team {
    faction: Faction;
    players: CampaignPlayer[] = [];
    campaignPoints: number = 0;

    public serialize(): SerializedTeam {
        return {
            faction: this.faction,
            campaignPoints: this.campaignPoints,
            players: this.players.map(x => x.serialize())
        }
    }

    static hydrate(data: SerializedTeam): Team {
        let team = new Team();
        team.faction = data.faction;
        team.campaignPoints = data.campaignPoints;
        team.players = data.players.map(x => CampaignPlayer.hydrate(x));
        return team;
    }

    getLeader() {
        return this.players.find(x => x.isLeader);
    }

    numberOfPlayers() {
        if (!this.players) return 0;
        return this.players.length;
    }
}