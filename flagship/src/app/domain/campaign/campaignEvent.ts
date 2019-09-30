
export enum CampaignEventType {
    Battle = 0
}

export interface SerializedCampaignEvent {
    eventType: CampaignEventType;
    title: string;
    timestamp: Date;
}

export abstract class CampaignEvent {
    eventType: CampaignEventType;
    title: string;
    timestamp: Date;

    public abstract serialize(): SerializedCampaignEvent;

    static hydrate(data: SerializedCampaignEvent): CampaignEvent {
        throw new Error("Can't instantiate abstract campaign event.");
    }
}