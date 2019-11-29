import { Faction } from '../game/faction';

export interface SerializedUserSettings {
    uid: string;
    faction: Faction;
    author: string;
    displayCampaignFleets: boolean;
    defaultPublic: boolean;
}

export class UserSettings {
    constructor(public uid: string,
        public faction: Faction,
        public author: string,
        public displayCampaignFleets: boolean,
        public defaultPublic: boolean) {

        }

    serialize(): SerializedUserSettings {
        return {
            uid: this.uid,
            faction: this.faction,
            author: this.author,
            displayCampaignFleets: this.displayCampaignFleets || false,
            defaultPublic: this.defaultPublic === false ? false : true
        };
    }

    static hydrate(serialized: SerializedUserSettings, backupUid: string = null): UserSettings {
        if (!serialized)
            return new UserSettings(backupUid, Faction.Empire, null, true, true);
        return new UserSettings(serialized.uid, serialized.faction, serialized.author,
            serialized.displayCampaignFleets, serialized.defaultPublic);
    }
}