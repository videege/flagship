import { Ship, ShipData, ShipClass } from "../ship";
import { Faction } from '../faction';
import { DefenseToken } from '../defenseToken';
import { Size } from '../size';
import { Armament } from '../armament';
import { NavigationChart } from '../navigationChart';
import { UpgradeSlot } from '../upgradeSlot';
import { UpgradeType } from '../upgradeType';

export class ShipFactory {
  static shipData: ShipData[] = [
    {
      id: 1, name: 'Imperial I-Class Star Destroyer', shipClass: ShipClass.Normal, faction: Faction.Empire,
      points: 110, hull: 11, command: 3, squadron: 4, engineering: 4, size: Size.Large,
      defenseTokens: [DefenseToken.Brace, DefenseToken.Redirect, DefenseToken.Redirect, DefenseToken.Contain],
      leftShields: 3, rightShields: 3, frontShields: 4, rearShields: 2, leftAuxShields: null, rightAuxShields: null,
      frontArmament: new Armament(3, 2, 3), rearArmament: new Armament(1, 2, 0),
      leftArmament: new Armament(2, 0, 2), rightArmament: new Armament(2, 0, 2),
      leftAuxArmament: null, rightAuxArmament: null,
      antiSquadronArmament: new Armament(0, 1, 1),
      navigationChart: new NavigationChart(2, [1, 1], [0, 1, 1], null),
      upgradeSlots: [new UpgradeSlot(UpgradeType.Commander), new UpgradeSlot(UpgradeType.Title),
      new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.BoardingTeam),
      new UpgradeSlot(UpgradeType.WeaponsTeam), new UpgradeSlot(UpgradeType.OffensiveRetrofit),
      new UpgradeSlot(UpgradeType.OffensiveRetrofit), new UpgradeSlot(UpgradeType.IonCannons),
      new UpgradeSlot(UpgradeType.Turbolaser)],
      allowedTitles: [2000, 2001, 2002, 2003, 2004]
    },
    {
      id: 2, name: 'Imperial II-Class Star Destroyer', shipClass: ShipClass.Normal, faction: Faction.Empire,
      points: 120, hull: 11, command: 3, squadron: 4, engineering: 4, size: Size.Large,
      defenseTokens: [DefenseToken.Brace, DefenseToken.Redirect, DefenseToken.Redirect, DefenseToken.Contain],
      leftShields: 3, rightShields: 3, frontShields: 4, rearShields: 2, leftAuxShields: null, rightAuxShields: null,
      frontArmament: new Armament(4, 4, 0), rearArmament: new Armament(1, 2, 0),
      leftArmament: new Armament(2, 2, 0), rightArmament: new Armament(2, 2, 0),
      leftAuxArmament: null, rightAuxArmament: null,
      antiSquadronArmament: new Armament(0, 2, 0),
      navigationChart: new NavigationChart(2, [1, 1], [0, 1, 1], null),
      upgradeSlots: [new UpgradeSlot(UpgradeType.Commander), new UpgradeSlot(UpgradeType.Title),
      new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.BoardingTeam),
      new UpgradeSlot(UpgradeType.WeaponsTeam), new UpgradeSlot(UpgradeType.OffensiveRetrofit),
      new UpgradeSlot(UpgradeType.DefensiveRetrofit), new UpgradeSlot(UpgradeType.IonCannons),
      new UpgradeSlot(UpgradeType.Turbolaser)],
      allowedTitles: [2000, 2001, 2002, 2003, 2004]
    }
  ];

  constructor() {

  }

  getShips(faction: Faction): ShipData[] {
    return ShipFactory.shipData.filter(x => x.faction === faction);
  }

  instantiateShip(id: number): Ship {
    let data = ShipFactory.shipData.find(x => x.id === id);

    if (!data)
      return null;

    if (data.shipClass === ShipClass.Normal) {
      return new Ship(data.id, data.name, data.shipClass, data.faction,
        data.size, data.hull, data.command, data.squadron, data.engineering, data.points,
        data.defenseTokens, data.frontShields, data.leftAuxShields, data.rightAuxShields,
        data.leftShields, data.rightShields, data.rearShields, data.antiSquadronArmament,
        data.frontArmament, data.leftAuxArmament, data.rightAuxArmament, 
        data.leftArmament, data.rightArmament, data.rearArmament, data.navigationChart,
        data.upgradeSlots, data.allowedTitles);
    }
    return null;
  }
}
