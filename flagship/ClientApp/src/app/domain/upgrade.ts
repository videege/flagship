import { Faction } from './faction';
import { UpgradeType } from './upgradeType';
import { Ship } from './ship';

export class Upgrade {
  constructor(public name: string, public type: UpgradeType, public faction: Faction, public text: string, public modification: boolean,
    public points: number, public unique: boolean) {

    }

  
  //canEquipToShip(ship: Ship): boolean {
  //  if (this.faction !== Faction.Any && this.faction !== ship.faction)
  //    return false;

  //  //check upgrade slot

  //  return true;
  //}
}