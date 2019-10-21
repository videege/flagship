import { Phase } from './phase';
import { CampaignEvent, SerializedCampaignEvent, CampaignEventType } from './campaignEvent';
import { Battle, SerializedBattle } from './battle';

export interface SerializedCampaignState {
    turn: number;
    phase: Phase;
    act: number;
    events: SerializedCampaignEvent[];
    imperialPointsScored: number;
    rebelPointsScored: number;
}

export class CampaignState {
    turn: number;
    phase: Phase;
    act: number;
    events: CampaignEvent[] = [];
    imperialPointsScored: number = 0;
    rebelPointsScored: number = 0;

    public actInRomanNumerals(): string {
        if (this.act === 1) return "I";
        if (this.act === 2) return "II";
        if (this.act === 3) return "III";
        return this.act.toString();
    }

    public addEvent(event: CampaignEvent) {
        this.events.push(event);
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
            events: this.events.map(x => x.serialize()),
            rebelPointsScored: this.rebelPointsScored,
            imperialPointsScored: this.imperialPointsScored
        }
    }

    static hydrate(data: SerializedCampaignState): CampaignState {
        let state = new CampaignState();
        state.turn = data.turn;
        state.phase = data.phase;
        state.act = data.act;
        state.events = data.events.map(x => {
            switch (x.eventType) {
                case CampaignEventType.Battle:
                    return Battle.hydrate(x as SerializedBattle);
                case CampaignEventType.ManualLocationChange:
                    return CampaignEvent.hydrate(x);
                default:
                    throw new Error("Unrecognized campaign event type.");
            }
        });
        state.imperialPointsScored = data.imperialPointsScored || 0;
        state.rebelPointsScored = data.rebelPointsScored || 0;
        return state;
    }
}
