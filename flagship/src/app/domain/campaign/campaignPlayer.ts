export interface SerializedCampaignPlayer {
    playerUid: string;
    id: string;
    name: string;
    fleetId: string;
    isLeader: boolean;
    wins: number;
    losses: number;
    mov: number;
}

export class CampaignPlayer {
    public playerUid: string;
    public id: string;
    public name: string;
    public fleetId: string;
    public isLeader: boolean;

    public wins: number = 0;
    public losses: number = 0;
    public mov: number = 0;

    public serialize(): SerializedCampaignPlayer {
        return {
            playerUid: this.playerUid,
            id: this.id,
            name: this.name,
            fleetId: this.fleetId,
            isLeader: this.isLeader,
            wins: this.wins,
            losses: this.losses,
            mov: this.mov
        };
    }

    static hydrate(data: SerializedCampaignPlayer): CampaignPlayer {
        let player = new CampaignPlayer();
        player.playerUid = data.playerUid;
        player.id = data.id;
        player.name = data.name;
        player.fleetId = data.fleetId;
        player.isLeader = data.isLeader;
        player.wins = data.wins;
        player.losses = data.losses;
        player.mov = data.mov;
        return player;
    }
}