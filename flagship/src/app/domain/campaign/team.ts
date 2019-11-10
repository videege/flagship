import { Faction } from '../faction';
import { CampaignPlayer, SerializedCampaignPlayer } from './campaignPlayer';
import { StrategicEffectType } from './strategicEffectType';

export interface SerializedTeam {
    faction: Faction;
    name: string;
    players: SerializedCampaignPlayer[];
    campaignPoints: number;
    tokens: { [id: number]: number }
}

export class Team {

    faction: Faction;
    name: string;
    players: CampaignPlayer[] = [];
    campaignPoints: number = 0;
    tokens: { [id: number]: number } = {};

    public serialize(): SerializedTeam {
        return {
            faction: this.faction,
            name: this.name,
            campaignPoints: this.campaignPoints,
            players: this.players.map(x => x.serialize()),
            tokens: this.tokens
        }
    }

    static hydrate(data: SerializedTeam): Team {
        let team = new Team();
        team.faction = data.faction;
        team.name = data.name || null;
        team.campaignPoints = data.campaignPoints;
        team.players = data.players.map(x => CampaignPlayer.hydrate(x));
        team.tokens = data.tokens || {};
        return team;
    }

    addToken(type: StrategicEffectType, count = 1) {
        if (this.tokens[type]) {
            this.tokens[type] += count;
        } else {
            this.tokens[type] = count;
        }
    }

    removeToken(type: StrategicEffectType, count = 1) {
        if (this.tokens[type] && this.tokens[type] >= count) {
            this.tokens[type] -= count;
        }
    }

    tokensOfType(type: StrategicEffectType): number {
        return this.tokens[type] || 0;
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
