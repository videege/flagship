import { CampaignType } from './campaignType';
import { CampaignState } from './campaignState';
import { Faction } from '../faction';
import { Team } from './team';


export class Campaign {
    public id: string;
    public ownerUid: string;
    public playerUids: string[] = [];
    public type: CampaignType;
    public name: string;
    public startDate: Date;
    public statusDate: Date;
    public state: CampaignState;

    public empire: Team;
    public rebels: Team;

    public locations: Location[] = [];

    private areTeamsBalanced(): boolean {
        return this.empire.numberOfPlayers() === this.rebels.numberOfPlayers();
    }
}