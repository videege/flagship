import { Ship } from "../ship";
import { Faction } from "../faction";
import { Size } from "../size";
import { UpgradeType } from "../upgradeType";

export class ShipFactory {

  ships: { [name: string]: Ship };

  constructor() {
    this.ships = {
      'Imperial-I Star Destroyer': {
        name: 'Imperial-I Star Destroyer',
        command: 3,
        hull: 11,
        points: 110,
        engineering: 4,
        squadron: 3,
        faction: Faction.Empire,
        size: Size.Large,
        antiSquadronArmament: {
          redDice: 0,
          blueDice: 0,
          blackDice: 2
        },
        frontArmament: {
          redDice: 0,
          blueDice: 0,
          blackDice: 2
        },
        leftArmament: {
          redDice: 0,
          blueDice: 0,
          blackDice: 2
        },
        rightArmament: {
          redDice: 0,
          blueDice: 0,
          blackDice: 2
        },
        rearArmament: {
          redDice: 0,
          blueDice: 0,
          blackDice: 2
        },
        upgradeSlots: [
          UpgradeType.Commander,
          UpgradeType.IonCannons,
          UpgradeType.SupportTeam,
          UpgradeType.DefensiveRetrofit,
          UpgradeType.DefensiveRetrofit
        ]
      }
    }
  }

  createShipFromTemplate(name: string): Ship {
    return Object.assign({}, this.ships[name]);
  }

}
