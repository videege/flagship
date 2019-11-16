import { Faction } from '../faction';

export interface SerializedUserSettings {
    uid: string;
    faction: Faction;
    author: string;
}

export class UserSettings {
    constructor(public uid: string,
        public faction: Faction,
        public author: string) {

        }

    serialize(): SerializedUserSettings {
        return {
            uid: this.uid,
            faction: this.faction,
            author: this.author
        };
    }

    static hydrate(serialized: SerializedUserSettings, backupUid: string = null): UserSettings {
        if (!serialized)
            return new UserSettings(backupUid, Faction.Empire, null);
        return new UserSettings(serialized.uid, serialized.faction, serialized.author);
    }
}