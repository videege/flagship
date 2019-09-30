export interface SerializedCampaignPlayer {
    playerUid: string;
    id: string;
    name: string;
    fleetId: string;
    isLeader: boolean;
    inviteToken: string;
}

export class CampaignPlayer {
    public playerUid: string;
    public id: string;
    public name: string;
    public fleetId: string;
    public isLeader: boolean;
    public inviteToken: string;

    public serialize(): SerializedCampaignPlayer {
        return {
            playerUid: this.playerUid,
            id: this.id,
            name: this.name,
            fleetId: this.fleetId,
            isLeader: this.isLeader,
            inviteToken: this.inviteToken
        };
    }

    static hydrate(data: SerializedCampaignPlayer): CampaignPlayer {
        let player = new CampaignPlayer();
        player.playerUid = data.playerUid;
        player.id = data.id;
        player.name = data.name;
        player.fleetId = data.fleetId;
        player.isLeader = data.isLeader;
        player.inviteToken = data.inviteToken;
        return player;
    }
}