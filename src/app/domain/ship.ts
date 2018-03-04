import { Faction } from "./faction";
import { Size } from "./size";
import { DefenseToken } from "./defenseToken";
import { UpgradeType } from "./upgradeType";
import { Upgrade } from "./upgrade";

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

  upgradeSlots: { [type in UpgradeType]: number };
  upgrades: { [type in UpgradeType]: Upgrade[] };
}
