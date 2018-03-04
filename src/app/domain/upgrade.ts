import { Faction } from "./faction";
import { UpgradeType } from "./upgradeType";
import { Ship } from "./ship";

export class Upgrade {
  name: string;
  type: UpgradeType;
  faction: Faction;
  text: string;
  modification: boolean;
  points: number;
  unique: boolean;

  //canEquipToShip(ship: Ship): boolean {
  //  if (this.faction !== Faction.Any && this.faction !== ship.faction)
  //    return false;

  //  //check upgrade slot

  //  return true;
  //}
}
