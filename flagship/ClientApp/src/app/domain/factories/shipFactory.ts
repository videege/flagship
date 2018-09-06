import { Ship } from "../ship";
import { Faction } from "../faction";
import { Size } from "../size";
import { UpgradeType } from "../upgradeType";
import { ISDI } from "../ships/isd-i";

export class ShipFactory {

  ships: { [name: string]: () => Ship };

  constructor() {
    this.ships = {
      'Imperial I-Class Star Destroyer': () => new ISDI()
    };
  }

  instantiateShip(name: string): Ship {
    return this.ships[name]();
  }
}
