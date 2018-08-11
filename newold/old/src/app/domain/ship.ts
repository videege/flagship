import { Faction } from "./faction";
import { Size } from "./size";
import { DefenseToken } from "./defenseToken";
import { UpgradeType } from "./upgradeType";
import { Upgrade } from "./upgrade";
import { Armament } from "./armament";

export class Ship {
  name: string;
  faction: Faction;
  size: Size;

  hull: number;
  command: number;
  squadron: number;
  engineering: number;
  points: number;

  defenseTokens: DefenseToken[];

  upgradeSlots: UpgradeType[];
  upgrades: {[type in UpgradeType]: Upgrade[]};

  antiSquadronArmament: Armament;
  frontArmament: Armament;
  leftArmament: Armament;
  rightArmament: Armament;
  rearArmament: Armament;

  currentPoints(): number {
    let points = this.points;
    for (let key in this.upgrades) {
      if (this.upgrades[key] !== null) {
        for (let i = 0; i < this.upgrades[key].length; i++) {
          if (this.upgrades[key][i]) {
            points += this.upgrades[key][i].points;
          }
        }
      }
    }

    return points;
  }
}
