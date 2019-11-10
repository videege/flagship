
export enum CampaignEventType {
    Battle = 0,
    ManualLocationChange = 1
}

export interface SerializedCampaignEvent {
    eventType: CampaignEventType;
    title: string;
    timestamp: Date;
    userUid: string;
}

export class CampaignEvent {
    constructor(public eventType: CampaignEventType, 
        public title: string, public userUid: string,
        public timestamp: Date = new Date()) {

        }

    public serialize(): SerializedCampaignEvent {
        return {
            eventType: this.eventType,
            title: this.title,
            userUid: this.userUid,
            timestamp: this.timestamp
        };
    }

    static hydrate(data: SerializedCampaignEvent): CampaignEvent {
        return new CampaignEvent(data.eventType, data.title, data.userUid, data.timestamp);
    }
}
