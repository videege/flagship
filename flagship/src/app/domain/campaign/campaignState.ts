import { Phase } from './phase';
import { CampaignEvent, SerializedCampaignEvent, CampaignEventType } from './campaignEvent';
import { Battle, SerializedBattle } from './battle';
import { Faction } from '../game/faction';

export interface SerializedCampaignState {
    turn: number;
    phase: Phase;
    act: number;
    initiativeFaction: Faction;
    events: SerializedCampaignEvent[];
    imperialPointsScored: number;
    rebelPointsScored: number;
    imperialSkilledSpacersSpent: number;
    rebelSkilledSpacersSpent: number;
}

export class CampaignState {
    turn: number;
    phase: Phase;
    act: number;
    initiativeFaction: Faction = null;
    events: CampaignEvent[] = [];
    imperialPointsScored: number = 0;
    rebelPointsScored: number = 0;
    imperialSkilledSpacersSpent: number = 0;
    rebelSkilledSpacersSpent: number = 0;

    public actInRomanNumerals(): string {
        if (this.act === 1) return "I";
        if (this.act === 2) return "II";
        if (this.act === 3) return "III";
        return this.act.toString();
    }

    public name(): string {
        if (this.phase === Phase.CampaignSetup) return 'Setup';
        else if (this.phase === Phase.Finished) return 'Finished';
        return `Act ${this.actInRomanNumerals()} Turn ${this.turn}`;
    }

    public actShouldEnd(numberOfFleets: number): boolean {
        return numberOfFleets === 4
            ? (this.imperialPointsScored >= 4 || this.rebelPointsScored >= 4)
            : (this.imperialPointsScored >= 5 || this.rebelPointsScored >= 5);
    }

    public addEvent(event: CampaignEvent) {
        this.events.push(event);
    }

    public setPhase(phase: Phase) {
        this.phase = phase;
    }

    public getBattles(): Battle[] {
        return this.events.filter(x => x.eventType === CampaignEventType.Battle)
            .map(x => x as Battle);
    }

    public serialize(): SerializedCampaignState {
        return {
            turn: this.turn,
            phase: this.phase,
            act: this.act,
            initiativeFaction: this.initiativeFaction,
            events: this.events.map(x => x.serialize()),
            rebelPointsScored: this.rebelPointsScored,
            imperialPointsScored: this.imperialPointsScored,
            imperialSkilledSpacersSpent: this.imperialSkilledSpacersSpent,
            rebelSkilledSpacersSpent: this.rebelSkilledSpacersSpent
        }
    }

    static hydrate(data: SerializedCampaignState): CampaignState {
        let state = new CampaignState();
        state.turn = data.turn;
        state.phase = data.phase;
        state.act = data.act;
        state.initiativeFaction = data.initiativeFaction || Faction.Rebels;
        state.events = data.events.map(x => {
            switch (x.eventType) {
                case CampaignEventType.Battle:
                    return Battle.hydrate(x as SerializedBattle);
                case CampaignEventType.ManualLocationChange:
                case CampaignEventType.ManualXPChange:
                case CampaignEventType.ManualScoreChange:
                    return CampaignEvent.hydrate(x);
                default:
                    throw new Error("Unrecognized campaign event type.");
            }
        });
        state.imperialPointsScored = data.imperialPointsScored || 0;
        state.rebelPointsScored = data.rebelPointsScored || 0;
        state.imperialSkilledSpacersSpent = data.imperialSkilledSpacersSpent || 0;
        state.rebelSkilledSpacersSpent = data.rebelSkilledSpacersSpent || 0;
        return state;
    }
}
