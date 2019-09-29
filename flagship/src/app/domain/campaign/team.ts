import { Faction } from '../faction';
import { CampaignPlayer } from './campaignPlayer';

export class Team {
    faction: Faction;
    players: CampaignPlayer[];
    campaignPoints: number = 0;

    getLeader() {
        return this.players.find(x => x.isLeader);
    }

    numberOfPlayers() {
        if (!this.players) return 0;
        return this.players.length;
    }
}