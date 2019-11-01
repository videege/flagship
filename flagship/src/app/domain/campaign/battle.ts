import { BattleParticipant } from './battleParticipant';
import { BattleType } from './battleType';
import { BattleState } from './battleState';
import { BattleReward } from './battleReward';
import { CampaignEvent, SerializedCampaignEvent, CampaignEventType } from './campaignEvent';
import { CampaignLocation } from './campaignLocation';
import { CampaignPlayer } from './campaignPlayer';
import { LocationControlType } from './locationControlType';
import { Condition } from './condition';
import { Team } from './team';
import { Faction, oppositeFaction } from '../faction';

export interface SerializedBattle extends SerializedCampaignEvent {
    attackingPlayers: BattleParticipant[];
    defendingPlayers: BattleParticipant[];
    type: BattleType;
    state: BattleState;
    locationId: number;
    objectiveId: number;
    attackerResult: BattleResult;
    defenderResult: BattleResult;
}

export interface BattleResult {
    fleetPoints: number;
    score: number;
    earnedXP: number;
    earnedPoints: number;
}

export class Battle implements CampaignEvent {
    public eventType: CampaignEventType = CampaignEventType.Battle;
    public title: string;
    public timestamp: Date = new Date();
    public userUid: string = null;

    public attackingPlayers: BattleParticipant[] = [];
    public defendingPlayers: BattleParticipant[] = [];
    public type: BattleType;
    public state: BattleState;
    public locationId: number;
    public objectiveId: number = null;
    public attackerResult: BattleResult = null;
    public defenderResult: BattleResult = null;

    public serialize(): SerializedBattle {
        return {
            eventType: CampaignEventType.Battle,
            title: this.title,
            userUid: this.userUid,
            timestamp: this.timestamp,
            attackingPlayers: this.attackingPlayers,
            defendingPlayers: this.defendingPlayers,
            type: this.type,
            state: this.state,
            locationId: this.locationId,
            objectiveId: this.objectiveId,
            attackerResult: this.attackerResult,
            defenderResult: this.defenderResult
        };
    }

    static hydrate(data: SerializedBattle): Battle {
        let battle = new Battle();
        battle.title = data.title;
        battle.userUid = data.userUid;
        battle.timestamp = data.timestamp;
        battle.attackingPlayers = data.attackingPlayers;
        battle.defendingPlayers = data.defendingPlayers;
        battle.type = data.type;
        battle.state = data.state;
        battle.locationId = data.locationId;
        battle.objectiveId = data.objectiveId || null;
        battle.attackerResult = data.attackerResult || null;
        battle.defenderResult = data.defenderResult || null;
        return battle;
    }

    static declareBattle(userUid: string, title: string, location: CampaignLocation, attackingPlayers: CampaignPlayer[],
        defendingPlayers: CampaignPlayer[], type: BattleType = BattleType.Normal): Battle {
        let battle = new Battle();
        battle.userUid = userUid;
        battle.title = title;
        battle.type = type;
        battle.state = BattleState.Declared;
        battle.locationId = location.id;
        if (location.controlType === LocationControlType.Base) {
            battle.objectiveId = location.chosenObjective;
        }
        battle.attackingPlayers = attackingPlayers.map(x => <BattleParticipant>{
            playerId: x.id,
            fleetId: x.fleetId,
            condition: x.condition,
            spentAllyToken: false
        });
        battle.defendingPlayers = defendingPlayers.map(x => <BattleParticipant>{
            playerId: x.id,
            fleetId: x.fleetId,
            condition: x.condition,
            spentAllyToken: false
        });
        return battle;
    }

    public playerCount(): number {
        return this.attackingPlayers.length + this.defendingPlayers.length;
    }

    public getWinnerFaction(team: Team): Faction {
        if (this.state === BattleState.Declared) {
            return null;
        }
        let winnersAreProvidedTeam = team.players.map(x => x.id)
            .includes(this.state === BattleState.AttackersWon 
                ? this.attackingPlayers[0].playerId : this.defendingPlayers[0].playerId);
        return winnersAreProvidedTeam ? team.faction : oppositeFaction(team.faction);
    }

    public recordResult(attackerFleetPoints: number, attackerScore: number,
        attackerPoints: number, defenderFleetPoints: number, defenderScore: number,
        defenderPoints: number) {
        this.attackerResult = {
            fleetPoints: attackerFleetPoints,
            score: attackerScore,
            earnedPoints: attackerPoints,
            earnedXP: 0
        };
        this.defenderResult = {
            fleetPoints: defenderFleetPoints,
            score: defenderScore,
            earnedPoints: defenderPoints,
            earnedXP: 0
        };
        this.state = this.attackersWon() ? BattleState.AttackersWon : BattleState.DefendersWon;
        this.calculateEarnedXP();
    }

    private calculateEarnedXP() {
        let winnerXP = 1;
        let loserXP = 2;

        // Winner gets 1 extra for every full 75 points in their MOV
        let mov = this.marginOfVictory();
        winnerXP += Math.floor(mov / 75);

        (this.state === BattleState.AttackersWon ? this.attackerResult : this.defenderResult).earnedXP = winnerXP;
        (this.state === BattleState.AttackersWon ? this.defenderResult : this.attackerResult).earnedXP = loserXP;

        // If one team has less fleet points than the other, for every full 25, 
        // they get an extra XP
        let lessTeam = this.attackerResult.fleetPoints > this.defenderResult.fleetPoints ? this.defenderResult : this.attackerResult;
        let moreTeam = this.attackerResult.fleetPoints > this.defenderResult.fleetPoints ? this.attackerResult : this.defenderResult;

        lessTeam.earnedXP += Math.floor((moreTeam.fleetPoints - lessTeam.fleetPoints) / 25);
    }

    public marginOfVictory(): number {
        return Math.abs(this.attackerResult.score - this.defenderResult.score);
    }

    public attackersWon(): boolean {
        return this.attackerResult.score > this.defenderResult.score;
    }
}