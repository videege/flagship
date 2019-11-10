import { UpgradeType } from '../upgradeType';

export class LocationReward {
    public upgradeType: UpgradeType;
    public winnerPoints: number;
    public loserPoints: number;

    public isSquadronReward(): boolean {
        return !this.upgradeType;
    }

    public understrengthBonus(loserFleetPointDifference) : number {
        if (loserFleetPointDifference <= 0) return 0;
        
        return Math.floor(loserFleetPointDifference / 25) * 5;
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
