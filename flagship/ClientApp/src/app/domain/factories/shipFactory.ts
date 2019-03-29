import { Ship } from "../ship";
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
    ship.id = fleet.getAvailableShipId();
    return ship;
  }
}
