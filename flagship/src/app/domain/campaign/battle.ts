import { BattleParticipant } from './battleParticipant';
import { BattleType } from './battleType';
import { BattleState } from './battleState';
import { BattleReward } from './battleReward';
import { CampaignEvent, SerializedCampaignEvent, CampaignEventType } from './campaignEvent';

export interface SerializedBattle extends SerializedCampaignEvent {

}

export class Battle implements CampaignEvent {
    public eventType: CampaignEventType = CampaignEventType.Battle;
    public title: string;
    public timestamp: Date;
    
    public attackingPlayers: BattleParticipant[] = [];
    public defendingPlayers: BattleParticipant[] = [];
    public type: BattleType;
    public state: BattleState;
    public locationName: string;
    public attackerScore: number;
    public defenderScore: number;

    public rewards: BattleReward[] = [];

    public serialize(): SerializedBattle {
        return {
            eventType: CampaignEventType.Battle,
            title: this.title,
            timestamp: this.timestamp
        };
    }

    static hydrate(data: SerializedBattle): Battle {
        let battle = new Battle();
        battle.title = data.title;
        battle.timestamp = data.timestamp;
        return battle;
    }

    public marginOfVictory(): number {
        return Math.abs(this.attackerScore - this.defenderScore);
    }
}