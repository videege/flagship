import { Ship } from "../ship";
import { Faction } from "../faction";
import { Size } from "../size";
import { UpgradeType } from "../upgradeType";
import { ISDI } from "../ships/isd-i";
import { Fleet } from "../fleet";

export class ShipFactory {

  ships: { [name: string]: () => Ship };

  constructor() {
    this.ships = {
      'Imperial I-Class Star Destroyer': () => new ISDI()
    };
  }

  instantiateShip(name: string, fleet: Fleet): Ship {
    const ship = this.ships[name]();
    ship.fleet = fleet;
    return ship;
  }
}
