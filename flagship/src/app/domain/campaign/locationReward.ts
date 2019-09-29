import { UpgradeType } from '../upgradeType';

export class LocationReward {
    public upgradeType: UpgradeType;
    public upperLimit: number;
    public lowerLimit: number;

    public isSquadronReward(): boolean {
        return !this.upgradeType;
    }
}