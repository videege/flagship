import { Condition } from './condition';

export interface BattleParticipant {
    playerId: string;
    fleetId: string;
    condition: Condition;
}