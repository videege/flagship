import { Phase } from './phase';
import { CampaignEvent, SerializedCampaignEvent, CampaignEventType } from './campaignEvent';
import { Battle, SerializedBattle } from './battle';

export interface SerializedCampaignState {
    turn: number;
    phase: Phase;
    act: number;
    events: SerializedCampaignEvent[];
}

export class CampaignState {
    turn: number;
    phase: Phase;
    act: number;
    events: CampaignEvent[] = [];

    public serialize(): SerializedCampaignState {
        return {
            turn: this.turn,
            phase: this.phase,
            act: this.act,
            events: this.events.map(x => x.serialize())
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
                default:
                    throw new Error("Unrecognized campaign event type.");
            }
        });
        return state;
    }
}
