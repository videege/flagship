import { UpgradeType } from '../upgradeType';

export class BattleReward {
    public playerId: string;
    public experiencePoints: number;
    public upgradeType: UpgradeType;
    public upgradeValue: number;
    public canBeUnique: boolean;

    public isSquadronReward(): boolean {
        return !this.upgradeType;
    }
}