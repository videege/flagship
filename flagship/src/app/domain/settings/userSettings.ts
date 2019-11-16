import { Faction } from '../faction';

export interface SerializedUserSettings {
    uid: string;
    faction: Faction;
    author: string;
    displayCampaignFleets: boolean;
}

export class UserSettings {
    constructor(public uid: string,
        public faction: Faction,
        public author: string,
        public displayCampaignFleets: boolean) {

        }

    serialize(): SerializedUserSettings {
        return {
            uid: this.uid,
            faction: this.faction,
            author: this.author,
            displayCampaignFleets: this.displayCampaignFleets || false
        };
    }

    static hydrate(serialized: SerializedUserSettings, backupUid: string = null): UserSettings {
        if (!serialized)
            return new UserSettings(backupUid, Faction.Empire, null, true);
        return new UserSettings(serialized.uid, serialized.faction, serialized.author,
            serialized.displayCampaignFleets);
    }
}