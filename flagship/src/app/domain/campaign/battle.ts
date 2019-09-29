import { BattleParticipant } from './battleParticipant';
import { BattleType } from './battleType';
import { BattleState } from './battleState';
import { BattleReward } from './battleReward';

export class Battle {
    public attackingPlayers: BattleParticipant[] = [];
    public defendingPlayers: BattleParticipant[] = [];
    public type: BattleType;
    public state: BattleState;
    public locationName: string;
    public attackerScore: number;
    public defenderScore: number;

    public rewards: BattleReward[] = [];

    public marginOfVictory(): number {
        return Math.abs(this.attackerScore - this.defenderScore);
    }
}