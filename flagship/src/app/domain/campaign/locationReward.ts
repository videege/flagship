import { UpgradeType } from '../upgradeType';

export class LocationReward {
    public upgradeType: UpgradeType;
    public winnerPoints: number;
    public loserPoints: number;

    public isSquadronReward(): boolean {
        return !this.upgradeType;
    }

    static upgradeReward(type: UpgradeType, winnerPoints: number, loserPoints: number = null) : LocationReward {
        let reward = new LocationReward();
        reward.upgradeType = type;
        reward.winnerPoints = winnerPoints;
        reward.loserPoints = loserPoints || winnerPoints / 2;
        return reward;
    }

    static squadronReward(winnerPoints: number, loserPoints: number = null) : LocationReward {
        return this.upgradeReward(null, winnerPoints, loserPoints);
    }
}