import { Faction } from '../faction';
import { CampaignPlayer, SerializedCampaignPlayer } from './campaignPlayer';

export interface SerializedTeam {
    faction: Faction;
    name: string;
    players: SerializedCampaignPlayer[];
    campaignPoints: number;
}

export class Team {

    faction: Faction;
    name: string;
    players: CampaignPlayer[] = [];
    campaignPoints: number = 0;

    public serialize(): SerializedTeam {
        return {
            faction: this.faction,
            name: this.name,
            campaignPoints: this.campaignPoints,
            players: this.players.map(x => x.serialize())
        }
    }

    static hydrate(data: SerializedTeam): Team {
        let team = new Team();
        team.faction = data.faction;
        team.name = data.name || null;
        team.campaignPoints = data.campaignPoints;
        team.players = data.players.map(x => CampaignPlayer.hydrate(x));
        return team;
    }

    getLeader() {
        return this.players.find(x => x.isLeader);
    }

    designateLeader(player: CampaignPlayer) {
        let leader = this.getLeader();
        if (!leader) { 
            player.isLeader = true;
        } else {
            leader.isLeader = false;
            player.isLeader = true;
        }
    }

    numberOfPlayers() {
        if (!this.players) return 0;
        return this.players.length;
    }

}