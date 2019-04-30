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
    },
    {
      id: 3, name: 'Imperial Star Destroyer Cymoon Refit', shipClass: ShipClass.Normal, faction: Faction.Empire,
      points: 112, hull: 11, command: 3, squadron: 4, engineering: 4, size: Size.Large,
      defenseTokens: [DefenseToken.Brace, DefenseToken.Redirect, DefenseToken.Redirect, DefenseToken.Contain],
      leftShields: 3, rightShields: 3, frontShields: 4, rearShields: 2, leftAuxShields: null, rightAuxShields: null,
      frontArmament: new Armament(5, 2, 0), rearArmament: new Armament(1, 2, 0),
      leftArmament: new Armament(1, 3, 0), rightArmament: new Armament(1, 3, 0),
      leftAuxArmament: null, rightAuxArmament: null,
      antiSquadronArmament: new Armament(0, 0, 2),
      navigationChart: new NavigationChart(2, [1, 1], [0, 1, 1], null),
      upgradeSlots: [new UpgradeSlot(UpgradeType.Commander), new UpgradeSlot(UpgradeType.Title),
      new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.BoardingTeam),
      new UpgradeSlot(UpgradeType.WeaponsTeam), new UpgradeSlot(UpgradeType.OffensiveRetrofit),
      new UpgradeSlot(UpgradeType.FleetCommand), new UpgradeSlot(UpgradeType.Turbolaser),
      new UpgradeSlot(UpgradeType.Turbolaser)],
      allowedTitles: [2000, 2001, 2002, 2003, 2004]
    },
    {
      id: 4, name: 'Imperial Star Destroyer Kuat Refit', shipClass: ShipClass.Normal, faction: Faction.Empire,
      points: 112, hull: 11, command: 3, squadron: 4, engineering: 4, size: Size.Large,
      defenseTokens: [DefenseToken.Brace, DefenseToken.Redirect, DefenseToken.Redirect, DefenseToken.Contain],
      leftShields: 3, rightShields: 3, frontShields: 4, rearShields: 2, leftAuxShields: null, rightAuxShields: null,
      frontArmament: new Armament(3, 2, 3), rearArmament: new Armament(1, 1, 1),
      leftArmament: new Armament(1, 1, 2), rightArmament: new Armament(1, 1, 2),
      leftAuxArmament: null, rightAuxArmament: null,
      antiSquadronArmament: new Armament(0, 1, 1),
      navigationChart: new NavigationChart(2, [1, 1], [0, 1, 1], null),
      upgradeSlots: [new UpgradeSlot(UpgradeType.Commander), new UpgradeSlot(UpgradeType.Title),
      new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.BoardingTeam),
      new UpgradeSlot(UpgradeType.WeaponsTeam), new UpgradeSlot(UpgradeType.OffensiveRetrofit),
      new UpgradeSlot(UpgradeType.DefensiveRetrofit), new UpgradeSlot(UpgradeType.Ordnance),
      new UpgradeSlot(UpgradeType.IonCannons)],
      allowedTitles: [2000, 2001, 2002, 2003, 2004]
    },
    {
      id: 5, name: 'Arquitens-Class Command Cruiser', shipClass: ShipClass.Normal, faction: Faction.Empire,
      points: 59, hull: 5, command: 2, squadron: 2, engineering: 3, size: Size.Small,
      defenseTokens: [DefenseToken.Evade, DefenseToken.Redirect, DefenseToken.Redirect, DefenseToken.Contain],
      leftShields: 2, rightShields: 2, frontShields: 2, rearShields: 2, leftAuxShields: null, rightAuxShields: null,
      frontArmament: new Armament(1, 1, 0), rearArmament: new Armament(1, 1, 0),
      leftArmament: new Armament(3, 0, 0), rightArmament: new Armament(3, 0, 0),
      leftAuxArmament: null, rightAuxArmament: null,
      antiSquadronArmament: new Armament(0, 1, 0),
      navigationChart: new NavigationChart(2, [0, 2], [0, 0, 2], null),
      upgradeSlots: [new UpgradeSlot(UpgradeType.Commander), new UpgradeSlot(UpgradeType.Title),
      new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.SupportTeam),
      new UpgradeSlot(UpgradeType.DefensiveRetrofit), new UpgradeSlot(UpgradeType.Turbolaser)],
      allowedTitles: [-1]
    },
    {
      id: 6, name: 'Arquitens-Class Light Cruiser', shipClass: ShipClass.Normal, faction: Faction.Empire,
      points: 54, hull: 5, command: 2, squadron: 2, engineering: 3, size: Size.Small,
      defenseTokens: [DefenseToken.Evade, DefenseToken.Redirect, DefenseToken.Redirect, DefenseToken.Contain],
      leftShields: 2, rightShields: 2, frontShields: 2, rearShields: 2, leftAuxShields: null, rightAuxShields: null,
      frontArmament: new Armament(1, 0, 1), rearArmament: new Armament(1, 0, 1),
      leftArmament: new Armament(3, 0, 0), rightArmament: new Armament(3, 0, 0),
      leftAuxArmament: null, rightAuxArmament: null,
      antiSquadronArmament: new Armament(0, 0, 1),
      navigationChart: new NavigationChart(2, [0, 2], [0, 0, 2], null),
      upgradeSlots: [new UpgradeSlot(UpgradeType.Commander), new UpgradeSlot(UpgradeType.Title),
      new UpgradeSlot(UpgradeType.Officer),
      new UpgradeSlot(UpgradeType.DefensiveRetrofit), new UpgradeSlot(UpgradeType.Turbolaser)],
      allowedTitles: [-1]
    },
    {
      id: 7, name: 'Gladiator I-Class Star Destroyer', shipClass: ShipClass.Normal, faction: Faction.Empire,
      points: 56, hull: 5, command: 2, squadron: 2, engineering: 3, size: Size.Small,
      defenseTokens: [DefenseToken.Evade, DefenseToken.Brace, DefenseToken.Redirect],
      leftShields: 2, rightShields: 2, frontShields: 3, rearShields: 1, leftAuxShields: null, rightAuxShields: null,
      frontArmament: new Armament(2, 0, 2), rearArmament: new Armament(1, 0, 1),
      leftArmament: new Armament(0, 0, 4), rightArmament: new Armament(0, 0, 4),
      leftAuxArmament: null, rightAuxArmament: null,
      antiSquadronArmament: new Armament(0, 1, 0),
      navigationChart: new NavigationChart(2, [1, 1], [0, 1, 1], null),
      upgradeSlots: [new UpgradeSlot(UpgradeType.Commander), new UpgradeSlot(UpgradeType.Title),
      new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.WeaponsTeam),
      new UpgradeSlot(UpgradeType.SupportTeam), new UpgradeSlot(UpgradeType.Ordnance)],
      allowedTitles: [-1]
    },
    {
      id: 8, name: 'Gladiator II-Class Star Destroyer', shipClass: ShipClass.Normal, faction: Faction.Empire,
      points: 62, hull: 5, command: 2, squadron: 2, engineering: 3, size: Size.Small,
      defenseTokens: [DefenseToken.Evade, DefenseToken.Brace, DefenseToken.Redirect],
      leftShields: 2, rightShields: 2, frontShields: 3, rearShields: 1, leftAuxShields: null, rightAuxShields: null,
      frontArmament: new Armament(2, 0, 2), rearArmament: new Armament(1, 0, 1),
      leftArmament: new Armament(1, 0, 3), rightArmament: new Armament(1, 0, 3),
      leftAuxArmament: null, rightAuxArmament: null,
      antiSquadronArmament: new Armament(0, 2, 0),
      navigationChart: new NavigationChart(2, [1, 1], [0, 1, 1], null),
      upgradeSlots: [new UpgradeSlot(UpgradeType.Commander), new UpgradeSlot(UpgradeType.Title),
      new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.WeaponsTeam),
      new UpgradeSlot(UpgradeType.SupportTeam), new UpgradeSlot(UpgradeType.Ordnance)],
      allowedTitles: [-1]
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
