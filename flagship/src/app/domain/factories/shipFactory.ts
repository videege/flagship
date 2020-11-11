import { Ship, ShipData, ShipClass, IgnitionCapableShip, IgnitionCapableShipData, HugeShipData, HugeShip } from "../game/ship";
import { Faction } from '../game/faction';
import { DefenseToken } from '../game/defenseToken';
import { Size } from '../game/size';
import { Armament } from '../game/armament';
import { NavigationChart } from '../game/navigationChart';
import { UpgradeSlot } from '../game/upgradeSlot';
import { UpgradeType } from '../game/upgradeType';
import { CustomCommander } from '../campaign/customCommander';
import { Guid } from 'guid-typescript';
import { Traits } from '../game/traits';

export class ShipFactory {
  private static titles = {
    isd: [2000, 2001, 2002, 2003, 2010, 2011],
    arquitens: [2004, 2005],
    gladiator: [2006, 2007, 2010],
    gozanti: [2008, 2009],
    ssd: [2019, 2020, 2021, 2022],
    raider: [2016, 2017, 2018],
    quasar: [2013, 2014, 2015],
    vsd: [2010, 2026, 2027, 2028, 2029],
    interdictor: [2012],
    onager: [2023, 2024, 2025],
    onagerSD: [2023, 2010, 2024, 2025],
    // rebels
    assaultFrigate: [2500, 2501],
    cr90: [2502, 2503, 2504, 2505],
    gr75: [2506, 2507],
    mc30c: [2511, 2512, 2515],
    mc80lib: [2515, 2519, 2520, 2521],
    mc80ho: [2515, 2516, 2517, 2518],
    nebulon: [2522, 2523, 2524, 2525],
    pelta: [2526],
    hammerhead: [2508, 2509, 2510],
    mc75: [2513, 2514, 2515],
    starhawkMarkI: [2527, 2528, 2529],
    starhawkMarkII: [2529],
    // republic
    acclamator: [2800, 2801],
    consular: [],
    // separatists
    munificent: [2700],
    hardcell: []
  };

  static shipData: (ShipData|IgnitionCapableShipData|HugeShipData)[] = [
    {
      id: 1, name: 'Imperial I-Class Star Destroyer', shipClass: ShipClass.Normal, faction: Faction.Empire,
      points: 110, hull: 11, command: 3, squadron: 4, engineering: 4, size: Size.Large,
      defenseTokens: [DefenseToken.Brace, DefenseToken.Redirect, DefenseToken.Redirect, DefenseToken.Contain],
      leftShields: 3, rightShields: 3, frontShields: 4, rearShields: 2, 
      frontArmament: new Armament(3, 2, 3), rearArmament: new Armament(1, 2, 0),
      leftArmament: new Armament(2, 0, 2), rightArmament: new Armament(2, 0, 2),
      antiSquadronArmament: new Armament(0, 1, 1),
      navigationChart: new NavigationChart(2, [1, 1], [0, 1, 1], null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.Turbolaser),
        new UpgradeSlot(UpgradeType.WeaponsTeam), new UpgradeSlot(UpgradeType.OffensiveRetrofit),
        new UpgradeSlot(UpgradeType.OffensiveRetrofit), new UpgradeSlot(UpgradeType.IonCannons)
      ],
      allowedTitles: ShipFactory.titles.isd, traits: []
    },
    {
      id: 2, name: 'Imperial II-Class Star Destroyer', shipClass: ShipClass.Normal, faction: Faction.Empire,
      points: 120, hull: 11, command: 3, squadron: 4, engineering: 4, size: Size.Large,
      defenseTokens: [DefenseToken.Brace, DefenseToken.Redirect, DefenseToken.Redirect, DefenseToken.Contain],
      leftShields: 3, rightShields: 3, frontShields: 4, rearShields: 2,
      frontArmament: new Armament(4, 4, 0), rearArmament: new Armament(1, 2, 0),
      leftArmament: new Armament(2, 2, 0), rightArmament: new Armament(2, 2, 0),
      antiSquadronArmament: new Armament(0, 2, 0),
      navigationChart: new NavigationChart(2, [1, 1], [0, 1, 1], null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.Turbolaser),
        new UpgradeSlot(UpgradeType.WeaponsTeam), new UpgradeSlot(UpgradeType.OffensiveRetrofit),
        new UpgradeSlot(UpgradeType.DefensiveRetrofit), new UpgradeSlot(UpgradeType.IonCannons),
      ],
      allowedTitles: ShipFactory.titles.isd, traits: []
    },
    {
      id: 3, name: 'Imperial Star Destroyer Cymoon Refit', shipClass: ShipClass.Normal, faction: Faction.Empire,
      points: 112, hull: 11, command: 3, squadron: 4, engineering: 4, size: Size.Large,
      defenseTokens: [DefenseToken.Brace, DefenseToken.Redirect, DefenseToken.Redirect, DefenseToken.Contain],
      leftShields: 3, rightShields: 3, frontShields: 4, rearShields: 2,
      frontArmament: new Armament(5, 2, 0), rearArmament: new Armament(1, 2, 0),
      leftArmament: new Armament(1, 3, 0), rightArmament: new Armament(1, 3, 0),
      antiSquadronArmament: new Armament(0, 0, 2),
      navigationChart: new NavigationChart(2, [1, 1], [0, 1, 1], null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.FleetCommand),
        new UpgradeSlot(UpgradeType.WeaponsTeam), new UpgradeSlot(UpgradeType.OffensiveRetrofit),
        new UpgradeSlot(UpgradeType.Turbolaser), new UpgradeSlot(UpgradeType.Turbolaser)
      ],
      allowedTitles: ShipFactory.titles.isd, traits: []
    },
    {
      id: 4, name: 'Imperial Star Destroyer Kuat Refit', shipClass: ShipClass.Normal, faction: Faction.Empire,
      points: 112, hull: 11, command: 3, squadron: 4, engineering: 4, size: Size.Large,
      defenseTokens: [DefenseToken.Brace, DefenseToken.Redirect, DefenseToken.Redirect, DefenseToken.Contain],
      leftShields: 3, rightShields: 3, frontShields: 4, rearShields: 2,
      frontArmament: new Armament(3, 2, 3), rearArmament: new Armament(1, 1, 1),
      leftArmament: new Armament(1, 1, 2), rightArmament: new Armament(1, 1, 2),
      antiSquadronArmament: new Armament(0, 1, 1),
      navigationChart: new NavigationChart(2, [1, 1], [0, 1, 1], null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.IonCannons),
        new UpgradeSlot(UpgradeType.WeaponsTeam), new UpgradeSlot(UpgradeType.OffensiveRetrofit),
        new UpgradeSlot(UpgradeType.DefensiveRetrofit), new UpgradeSlot(UpgradeType.Ordnance)
      ],
      allowedTitles: ShipFactory.titles.isd, traits: []
    },
    {
      id: 5, name: 'Arquitens-Class Command Cruiser', shipClass: ShipClass.Normal, faction: Faction.Empire,
      points: 59, hull: 5, command: 2, squadron: 2, engineering: 3, size: Size.Small,
      defenseTokens: [DefenseToken.Evade, DefenseToken.Redirect, DefenseToken.Redirect, DefenseToken.Contain],
      leftShields: 2, rightShields: 2, frontShields: 2, rearShields: 2,
      frontArmament: new Armament(1, 1, 0), rearArmament: new Armament(1, 1, 0),
      leftArmament: new Armament(3, 0, 0), rightArmament: new Armament(3, 0, 0),
      antiSquadronArmament: new Armament(0, 1, 0),
      navigationChart: new NavigationChart(2, [0, 2], [0, 0, 2], null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.SupportTeam),
        new UpgradeSlot(UpgradeType.DefensiveRetrofit), new UpgradeSlot(UpgradeType.Turbolaser)
      ],
      allowedTitles: ShipFactory.titles.arquitens, traits: []
    },
    {
      id: 6, name: 'Arquitens-Class Light Cruiser', shipClass: ShipClass.Normal, faction: Faction.Empire,
      points: 54, hull: 5, command: 2, squadron: 2, engineering: 3, size: Size.Small,
      defenseTokens: [DefenseToken.Evade, DefenseToken.Redirect, DefenseToken.Redirect, DefenseToken.Contain],
      leftShields: 2, rightShields: 2, frontShields: 2, rearShields: 2,
      frontArmament: new Armament(1, 0, 1), rearArmament: new Armament(1, 0, 1),
      leftArmament: new Armament(3, 0, 0), rightArmament: new Armament(3, 0, 0),
      antiSquadronArmament: new Armament(0, 0, 1),
      navigationChart: new NavigationChart(2, [0, 2], [0, 0, 2], null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.DefensiveRetrofit),
        new UpgradeSlot(UpgradeType.Turbolaser)
      ],
      allowedTitles: ShipFactory.titles.arquitens, traits: []
    },
    {
      id: 7, name: 'Gladiator I-Class Star Destroyer', shipClass: ShipClass.Normal, faction: Faction.Empire,
      points: 56, hull: 5, command: 2, squadron: 2, engineering: 3, size: Size.Small,
      defenseTokens: [DefenseToken.Evade, DefenseToken.Brace, DefenseToken.Redirect],
      leftShields: 2, rightShields: 2, frontShields: 3, rearShields: 1,
      frontArmament: new Armament(2, 0, 2), rearArmament: new Armament(1, 0, 1),
      leftArmament: new Armament(0, 0, 4), rightArmament: new Armament(0, 0, 4),
      antiSquadronArmament: new Armament(0, 1, 0),
      navigationChart: new NavigationChart(2, [1, 1], [0, 1, 1], null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.WeaponsTeam),
        new UpgradeSlot(UpgradeType.SupportTeam), new UpgradeSlot(UpgradeType.Ordnance)
      ],
      allowedTitles: ShipFactory.titles.gladiator, traits: []
    },
    {
      id: 8, name: 'Gladiator II-Class Star Destroyer', shipClass: ShipClass.Normal, faction: Faction.Empire,
      points: 62, hull: 5, command: 2, squadron: 2, engineering: 3, size: Size.Small,
      defenseTokens: [DefenseToken.Evade, DefenseToken.Brace, DefenseToken.Redirect],
      leftShields: 2, rightShields: 2, frontShields: 3, rearShields: 1,
      frontArmament: new Armament(2, 0, 2), rearArmament: new Armament(1, 0, 1),
      leftArmament: new Armament(1, 0, 3), rightArmament: new Armament(1, 0, 3),
      antiSquadronArmament: new Armament(0, 2, 0),
      navigationChart: new NavigationChart(2, [1, 1], [0, 1, 1], null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.WeaponsTeam),
        new UpgradeSlot(UpgradeType.SupportTeam), new UpgradeSlot(UpgradeType.Ordnance)
      ],
      allowedTitles: ShipFactory.titles.gladiator, traits: []
    },
    {
      id: 9, name: 'Gozanti-Class Assault Carriers', shipClass: ShipClass.Normal, faction: Faction.Empire,
      points: 28, hull: 1, command: 1, squadron: 2, engineering: 2, size: Size.SmallFlotilla,
      defenseTokens: [DefenseToken.Scatter, DefenseToken.Evade],
      leftShields: 1, rightShields: 1, frontShields: 1, rearShields: 1,
      frontArmament: new Armament(1, 0, 0), rearArmament: new Armament(0, 0, 0),
      leftArmament: new Armament(0, 1, 0), rightArmament: new Armament(0, 1, 0),
      antiSquadronArmament: new Armament(0, 1, 0),
      navigationChart: new NavigationChart(2, [1, 1], [1, 1, 0], null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.OffensiveRetrofit),
        new UpgradeSlot(UpgradeType.FleetSupport)
      ],
      allowedTitles: ShipFactory.titles.gozanti, traits: []
    },
    {
      id: 10, name: 'Gozanti-Class Cruisers', shipClass: ShipClass.Normal, faction: Faction.Empire,
      points: 23, hull: 1, command: 1, squadron: 2, engineering: 2, size: Size.SmallFlotilla,
      defenseTokens: [DefenseToken.Scatter, DefenseToken.Evade],
      leftShields: 1, rightShields: 1, frontShields: 1, rearShields: 1,
      frontArmament: new Armament(0, 1, 0), rearArmament: new Armament(0, 0, 0),
      leftArmament: new Armament(0, 1, 0), rightArmament: new Armament(0, 1, 0),
      antiSquadronArmament: new Armament(0, 0, 1),
      navigationChart: new NavigationChart(2, [1, 1], [1, 1, 0], null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.OffensiveRetrofit),
        new UpgradeSlot(UpgradeType.FleetSupport)
      ],
      allowedTitles: ShipFactory.titles.gozanti, traits: []
    },
    {
      id: 11, name: 'Interdictor-Class Combat Refit', shipClass: ShipClass.Normal, faction: Faction.Empire,
      points: 93, hull: 9, command: 2, squadron: 2, engineering: 5, size: Size.Medium,
      defenseTokens: [DefenseToken.Brace, DefenseToken.Redirect, DefenseToken.Contain, DefenseToken.Contain],
      leftShields: 2, rightShields: 2, frontShields: 3, rearShields: 2,
      frontArmament: new Armament(2, 2, 0), rearArmament: new Armament(1, 2, 0),
      leftArmament: new Armament(2, 2, 0), rightArmament: new Armament(2, 2, 0),
      antiSquadronArmament: new Armament(0, 1, 1),
      navigationChart: new NavigationChart(1, [1, 1], null, null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.SupportTeam),
        new UpgradeSlot(UpgradeType.OffensiveRetrofit), new UpgradeSlot(UpgradeType.IonCannons),
        new UpgradeSlot(UpgradeType.ExperimentalRetrofit)
      ],
      allowedTitles: ShipFactory.titles.interdictor, traits: []
    },
    {
      id: 12, name: 'Interdictor-Class Suppression Refit', shipClass: ShipClass.Normal, faction: Faction.Empire,
      points: 90, hull: 9, command: 2, squadron: 2, engineering: 5, size: Size.Medium,
      defenseTokens: [DefenseToken.Brace, DefenseToken.Redirect, DefenseToken.Contain, DefenseToken.Contain],
      leftShields: 2, rightShields: 2, frontShields: 3, rearShields: 2,
      frontArmament: new Armament(1, 3, 0), rearArmament: new Armament(1, 2, 0),
      leftArmament: new Armament(1, 3, 0), rightArmament: new Armament(1, 3, 0),
      antiSquadronArmament: new Armament(0, 1, 0),
      navigationChart: new NavigationChart(1, [1, 1], null, null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.SupportTeam),
        new UpgradeSlot(UpgradeType.OffensiveRetrofit), new UpgradeSlot(UpgradeType.IonCannons),
        new UpgradeSlot(UpgradeType.ExperimentalRetrofit), new UpgradeSlot(UpgradeType.ExperimentalRetrofit)
      ],
      allowedTitles: ShipFactory.titles.interdictor, traits: []
    },
    {
      id: 13, name: 'Quasar Fire I-Class Cruiser-Carrier', shipClass: ShipClass.Normal, faction: Faction.Empire,
      points: 54, hull: 6, command: 2, squadron: 4, engineering: 2, size: Size.Medium,
      defenseTokens: [DefenseToken.Brace, DefenseToken.Redirect],
      leftShields: 2, rightShields: 2, frontShields: 2, rearShields: 1,
      frontArmament: new Armament(0, 3, 0), rearArmament: new Armament(0, 1, 0),
      leftArmament: new Armament(0, 2, 0), rightArmament: new Armament(0, 2, 0),
      antiSquadronArmament: new Armament(0, 1, 0),
      navigationChart: new NavigationChart(2, [1, 1], [0, 1, 1], null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.WeaponsTeam),
        new UpgradeSlot(UpgradeType.OffensiveRetrofit), new UpgradeSlot(UpgradeType.OffensiveRetrofit),
      ],
      allowedTitles: ShipFactory.titles.quasar, traits: []
    },
    {
      id: 14, name: 'Quasar Fire II-Class Cruiser-Carrier', shipClass: ShipClass.Normal, faction: Faction.Empire,
      points: 61, hull: 6, command: 2, squadron: 4, engineering: 2, size: Size.Medium,
      defenseTokens: [DefenseToken.Brace, DefenseToken.Redirect],
      leftShields: 2, rightShields: 2, frontShields: 2, rearShields: 1,
      frontArmament: new Armament(2, 1, 0), rearArmament: new Armament(0, 1, 0),
      leftArmament: new Armament(1, 1, 0), rightArmament: new Armament(1, 1, 0),
      antiSquadronArmament: new Armament(1, 0, 0),
      navigationChart: new NavigationChart(2, [1, 1], [0, 1, 1], null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.WeaponsTeam),
        new UpgradeSlot(UpgradeType.WeaponsTeam), new UpgradeSlot(UpgradeType.OffensiveRetrofit),
      ],
      allowedTitles: ShipFactory.titles.quasar, traits: []
    },
    {
      id: 15, name: 'Raider I-Class Corvette', shipClass: ShipClass.Normal, faction: Faction.Empire,
      points: 44, hull: 4, command: 1, squadron: 1, engineering: 2, size: Size.Small,
      defenseTokens: [DefenseToken.Evade, DefenseToken.Evade, DefenseToken.Brace],
      leftShields: 2, rightShields: 2, frontShields: 2, rearShields: 1,
      frontArmament: new Armament(0, 2, 2), rearArmament: new Armament(0, 1, 0),
      leftArmament: new Armament(0, 1, 1), rightArmament: new Armament(0, 1, 1),
      antiSquadronArmament: new Armament(0, 0, 2),
      navigationChart: new NavigationChart(2, [2, 2], [0, 1, 1], [0, 1, 1, 1]),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.WeaponsTeam),
        new UpgradeSlot(UpgradeType.OffensiveRetrofit), new UpgradeSlot(UpgradeType.Ordnance),
      ],
      allowedTitles: ShipFactory.titles.raider, traits: []
    },
    {
      id: 16, name: 'Raider II-Class Corvette', shipClass: ShipClass.Normal, faction: Faction.Empire,
      points: 48, hull: 4, command: 1, squadron: 1, engineering: 2, size: Size.Small,
      defenseTokens: [DefenseToken.Evade, DefenseToken.Evade, DefenseToken.Brace],
      leftShields: 2, rightShields: 2, frontShields: 2, rearShields: 1,
      frontArmament: new Armament(0, 3, 1), rearArmament: new Armament(0, 1, 0),
      leftArmament: new Armament(0, 1, 1), rightArmament: new Armament(0, 1, 1),
      antiSquadronArmament: new Armament(0, 1, 1),
      navigationChart: new NavigationChart(2, [2, 2], [0, 1, 1], [0, 1, 1, 1]),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.WeaponsTeam),
        new UpgradeSlot(UpgradeType.OffensiveRetrofit), new UpgradeSlot(UpgradeType.IonCannons),
      ],
      allowedTitles: ShipFactory.titles.raider, traits: []
    },
    {
      id: 17, name: 'Victory I-Class Star Destroyer', shipClass: ShipClass.Normal, faction: Faction.Empire,
      points: 73, hull: 8, command: 3, squadron: 3, engineering: 4, size: Size.Medium,
      defenseTokens: [DefenseToken.Brace, DefenseToken.Redirect, DefenseToken.Redirect],
      leftShields: 3, rightShields: 3, frontShields: 3, rearShields: 1,
      frontArmament: new Armament(3, 0, 3), rearArmament: new Armament(2, 0, 0),
      leftArmament: new Armament(2, 0, 1), rightArmament: new Armament(2, 0, 1),
      antiSquadronArmament: new Armament(0, 1, 0),
      navigationChart: new NavigationChart(1, [0, 1], null, null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.WeaponsTeam),
        new UpgradeSlot(UpgradeType.OffensiveRetrofit), new UpgradeSlot(UpgradeType.Ordnance),
        new UpgradeSlot(UpgradeType.Turbolaser)
      ],
      allowedTitles: ShipFactory.titles.vsd, traits: []
    },
    {
      id: 18, name: 'Victory II-Class Star Destroyer', shipClass: ShipClass.Normal, faction: Faction.Empire,
      points: 85, hull: 8, command: 3, squadron: 3, engineering: 4, size: Size.Medium,
      defenseTokens: [DefenseToken.Brace, DefenseToken.Redirect, DefenseToken.Redirect],
      leftShields: 3, rightShields: 3, frontShields: 3, rearShields: 1,
      frontArmament: new Armament(3, 3, 0), rearArmament: new Armament(2, 0, 0),
      leftArmament: new Armament(2, 1, 0), rightArmament: new Armament(2, 1, 0),
      antiSquadronArmament: new Armament(0, 1, 0),
      navigationChart: new NavigationChart(1, [0, 1], null, null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.WeaponsTeam),
        new UpgradeSlot(UpgradeType.OffensiveRetrofit), new UpgradeSlot(UpgradeType.IonCannons),
        new UpgradeSlot(UpgradeType.Turbolaser)
      ],
      allowedTitles: ShipFactory.titles.vsd, traits: []
    },
    {
      id: 19, name: 'Star Dreadnought Command Prototype', shipClass: ShipClass.Huge, faction: Faction.Empire,
      points: 220, hull: 22, command: 4, squadron: 5, engineering: 4, size: Size.Huge,
      defenseTokens: [DefenseToken.Brace, DefenseToken.Brace, DefenseToken.Redirect,
        DefenseToken.Redirect, DefenseToken.Contain, DefenseToken.Contain],
      leftShields: 3, rightShields: 3, frontShields: 6, rearShields: 2, leftAuxShields: 3, rightAuxShields: 3,
      frontArmament: new Armament(4, 4, 0), rearArmament: new Armament(1, 1, 1),
      leftArmament: new Armament(3, 1, 1), rightArmament: new Armament(3, 1, 1),
      leftAuxArmament: new Armament(2, 1, 1), rightAuxArmament: new Armament(2, 1, 1),
      antiSquadronArmament: new Armament(0, 2, 0),
      navigationChart: new NavigationChart(0, [0, 0], null, null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.Officer),
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.WeaponsTeam),
        new UpgradeSlot(UpgradeType.OffensiveRetrofit), new UpgradeSlot(UpgradeType.IonCannons),
        new UpgradeSlot(UpgradeType.Turbolaser), new UpgradeSlot(UpgradeType.FleetCommand),
        new UpgradeSlot(UpgradeType.FleetCommand)
      ],
      allowedTitles: ShipFactory.titles.ssd, traits: []
    },
    {
      id: 20, name: 'Star Dreadnought Assault Prototype', shipClass: ShipClass.Huge, faction: Faction.Empire,
      points: 250, hull: 22, command: 4, squadron: 5, engineering: 4, size: Size.Huge,
      defenseTokens: [DefenseToken.Brace, DefenseToken.Brace, DefenseToken.Redirect,
        DefenseToken.Redirect, DefenseToken.Contain, DefenseToken.Contain],
      leftShields: 3, rightShields: 3, frontShields: 6, rearShields: 2, leftAuxShields: 3, rightAuxShields: 3,
      frontArmament: new Armament(5, 4, 0), rearArmament: new Armament(1, 1, 1),
      leftArmament: new Armament(3, 2, 1), rightArmament: new Armament(3, 2, 1),
      leftAuxArmament: new Armament(2, 2, 1), rightAuxArmament: new Armament(2, 2, 1),
      antiSquadronArmament: new Armament(1, 1, 0),
      navigationChart: new NavigationChart(0, [0, 0], null, null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.Officer),
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.WeaponsTeam),
        new UpgradeSlot(UpgradeType.OffensiveRetrofit), new UpgradeSlot(UpgradeType.OffensiveRetrofit),
        new UpgradeSlot(UpgradeType.IonCannons), new UpgradeSlot(UpgradeType.IonCannons),
        new UpgradeSlot(UpgradeType.Turbolaser), new UpgradeSlot(UpgradeType.Turbolaser)
      ],
      allowedTitles: ShipFactory.titles.ssd, traits: []
    },
    {
      id: 21, name: 'Executor I-Class Star Dreadnought', shipClass: ShipClass.Huge, faction: Faction.Empire,
      points: 381, hull: 33, command: 4, squadron: 6, engineering: 5, size: Size.Huge,
      defenseTokens: [DefenseToken.Brace, DefenseToken.Brace, DefenseToken.Redirect,
        DefenseToken.Redirect, DefenseToken.Contain, DefenseToken.Contain],
      leftShields: 5, rightShields: 5, frontShields: 6, rearShields: 3, leftAuxShields: 5, rightAuxShields: 5,
      frontArmament: new Armament(5, 4, 0), rearArmament: new Armament(2, 1, 1),
      leftArmament: new Armament(3, 3, 1), rightArmament: new Armament(3, 3, 1),
      leftAuxArmament: new Armament(2, 3, 1), rightAuxArmament: new Armament(2, 3, 1),
      antiSquadronArmament: new Armament(0, 2, 1),
      navigationChart: new NavigationChart(0, [0, 0], null, null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.Officer),
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.Officer),
        new UpgradeSlot(UpgradeType.WeaponsTeam), new UpgradeSlot(UpgradeType.OffensiveRetrofit),
        new UpgradeSlot(UpgradeType.IonCannons), new UpgradeSlot(UpgradeType.Turbolaser),
        new UpgradeSlot(UpgradeType.FleetCommand), new UpgradeSlot(UpgradeType.FleetCommand),
        new UpgradeSlot(UpgradeType.FleetCommand), new UpgradeSlot(UpgradeType.FleetCommand)
      ],
      allowedTitles: ShipFactory.titles.ssd, traits: []
    },
    {
      id: 22, name: 'Executor II-Class Star Dreadnought', shipClass: ShipClass.Huge, faction: Faction.Empire,
      points: 411, hull: 33, command: 4, squadron: 6, engineering: 5, size: Size.Huge,
      defenseTokens: [DefenseToken.Brace, DefenseToken.Brace, DefenseToken.Redirect,
        DefenseToken.Redirect, DefenseToken.Contain, DefenseToken.Contain],
      leftShields: 5, rightShields: 5, frontShields: 6, rearShields: 3, leftAuxShields: 5, rightAuxShields: 5,
      frontArmament: new Armament(5, 5, 0), rearArmament: new Armament(2, 1, 1),
      leftArmament: new Armament(4, 3, 1), rightArmament: new Armament(4, 3, 1),
      leftAuxArmament: new Armament(3, 3, 1), rightAuxArmament: new Armament(3, 3, 1),
      antiSquadronArmament: new Armament(1, 1, 1),
      navigationChart: new NavigationChart(0, [0, 0], null, null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.Officer),
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.Officer),
        new UpgradeSlot(UpgradeType.WeaponsTeam), new UpgradeSlot(UpgradeType.OffensiveRetrofit),
        new UpgradeSlot(UpgradeType.OffensiveRetrofit), new UpgradeSlot(UpgradeType.IonCannons),
        new UpgradeSlot(UpgradeType.IonCannons), new UpgradeSlot(UpgradeType.Turbolaser),
        new UpgradeSlot(UpgradeType.Turbolaser), new UpgradeSlot(UpgradeType.FleetCommand)
      ],
      allowedTitles: ShipFactory.titles.ssd, traits: []
    },
    {
      id: 23, name: 'Onager-Class Testbed', shipClass: ShipClass.IgnitionCapable, faction: Faction.Empire,
      points: 96, hull: 10, command: 3, squadron: 1, engineering: 3, size: Size.Large,
      defenseTokens: [DefenseToken.Brace, DefenseToken.Redirect, DefenseToken.Salvo],
      leftShields: 2, rightShields: 2, frontShields: 5, rearShields: 1,
      frontArmament: new Armament(1, 2, 1), rearArmament: new Armament(1, 1, 0),
      leftArmament: new Armament(2, 1, 0), rightArmament: new Armament(2, 1, 0),
      ignitionArmament: new Armament(4, 0, 3),
      antiSquadronArmament: new Armament(0, 0, 1),
      navigationChart: new NavigationChart(1, [1, 1], [1, 1, 0], null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.WeaponsTeam),
        new UpgradeSlot(UpgradeType.WeaponsTeam), new UpgradeSlot(UpgradeType.SupportTeam),
        new UpgradeSlot(UpgradeType.Superweapon)
      ],
      allowedTitles: ShipFactory.titles.onager, traits: []
    },
    {
      id: 24, name: 'Onager-Class Star Destroyer', shipClass: ShipClass.IgnitionCapable, faction: Faction.Empire,
      points: 110, hull: 10, command: 3, squadron: 2, engineering: 3, size: Size.Large,
      defenseTokens: [DefenseToken.Brace, DefenseToken.Redirect, DefenseToken.Salvo],
      leftShields: 2, rightShields: 2, frontShields: 5, rearShields: 1,
      frontArmament: new Armament(2, 2, 1), rearArmament: new Armament(2, 1, 0),
      leftArmament: new Armament(3, 0, 1), rightArmament: new Armament(3, 0, 1),
      ignitionArmament: new Armament(3, 2, 2),
      antiSquadronArmament: new Armament(0, 1, 1),
      navigationChart: new NavigationChart(1, [1, 1], [1, 1, 0], null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.WeaponsTeam),
        new UpgradeSlot(UpgradeType.WeaponsTeam), new UpgradeSlot(UpgradeType.Turbolaser),
        new UpgradeSlot(UpgradeType.Superweapon)
      ],
      allowedTitles: ShipFactory.titles.onagerSD, traits: []
    },
    // Rebel (Scum) 
    {
      id: 101, name: 'Assault Frigate Mark II A', shipClass: ShipClass.Normal, faction: Faction.Rebels,
      points: 81, hull: 6, command: 3, squadron: 2, engineering: 4, size: Size.Medium,
      defenseTokens: [DefenseToken.Evade, DefenseToken.Brace, DefenseToken.Redirect],
      leftShields: 3, rightShields: 3, frontShields: 4, rearShields: 2,
      frontArmament: new Armament(2, 1, 0), rearArmament: new Armament(2, 1, 0),
      leftArmament: new Armament(3, 1, 0), rightArmament: new Armament(3, 1, 0),
      antiSquadronArmament: new Armament(0, 2, 0),
      navigationChart: new NavigationChart(1, [1, 1], [0, 1, 1], null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.WeaponsTeam),
        new UpgradeSlot(UpgradeType.OffensiveRetrofit), new UpgradeSlot(UpgradeType.DefensiveRetrofit),
        new UpgradeSlot(UpgradeType.Turbolaser)
      ],
      allowedTitles: ShipFactory.titles.assaultFrigate, traits: []
    },
    {
      id: 102, name: 'Assault Frigate Mark II B', shipClass: ShipClass.Normal, faction: Faction.Rebels,
      points: 72, hull: 6, command: 3, squadron: 3, engineering: 4, size: Size.Medium,
      defenseTokens: [DefenseToken.Evade, DefenseToken.Brace, DefenseToken.Redirect],
      leftShields: 3, rightShields: 3, frontShields: 4, rearShields: 2,
      frontArmament: new Armament(2, 0, 0), rearArmament: new Armament(2, 0, 0),
      leftArmament: new Armament(3, 1, 0), rightArmament: new Armament(3, 1, 0),
      antiSquadronArmament: new Armament(0, 1, 0),
      navigationChart: new NavigationChart(1, [1, 1], [0, 1, 1], null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.WeaponsTeam),
        new UpgradeSlot(UpgradeType.OffensiveRetrofit), new UpgradeSlot(UpgradeType.DefensiveRetrofit),
        new UpgradeSlot(UpgradeType.Turbolaser)
      ],
      allowedTitles: ShipFactory.titles.assaultFrigate, traits: []
    },
    {
      id: 103, name: 'CR90A Corvette', shipClass: ShipClass.Normal, faction: Faction.Rebels,
      points: 44, hull: 4, command: 1, squadron: 1, engineering: 2, size: Size.Small,
      defenseTokens: [DefenseToken.Evade, DefenseToken.Evade, DefenseToken.Redirect],
      leftShields: 2, rightShields: 2, frontShields: 2, rearShields: 1,
      frontArmament: new Armament(2, 1, 0), rearArmament: new Armament(1, 0, 0),
      leftArmament: new Armament(1, 1, 0), rightArmament: new Armament(1, 1, 0),
      antiSquadronArmament: new Armament(0, 1, 0),
      navigationChart: new NavigationChart(2, [1, 2], [0, 1, 2], [0, 1, 1, 2]),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.SupportTeam),
        new UpgradeSlot(UpgradeType.DefensiveRetrofit), new UpgradeSlot(UpgradeType.Turbolaser)
      ],
      allowedTitles: ShipFactory.titles.cr90, traits: []
    },
    {
      id: 104, name: 'CR90B Corvette', shipClass: ShipClass.Normal, faction: Faction.Rebels,
      points: 39, hull: 4, command: 1, squadron: 1, engineering: 2, size: Size.Small,
      defenseTokens: [DefenseToken.Evade, DefenseToken.Evade, DefenseToken.Redirect],
      leftShields: 2, rightShields: 2, frontShields: 2, rearShields: 1,
      frontArmament: new Armament(0, 3, 0), rearArmament: new Armament(0, 1, 0),
      leftArmament: new Armament(0, 2, 0), rightArmament: new Armament(0, 2, 0),
      antiSquadronArmament: new Armament(0, 1, 0),
      navigationChart: new NavigationChart(2, [1, 2], [0, 1, 2], [0, 1, 1, 2]),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.SupportTeam),
        new UpgradeSlot(UpgradeType.DefensiveRetrofit), new UpgradeSlot(UpgradeType.IonCannons)
      ],
      allowedTitles: ShipFactory.titles.cr90, traits: []
    },
    {
      id: 105, name: 'GR-75 Combat Retrofits', shipClass: ShipClass.Normal, faction: Faction.Rebels,
      points: 24, hull: 3, command: 1, squadron: 2, engineering: 2, size: Size.SmallFlotilla,
      defenseTokens: [DefenseToken.Scatter, DefenseToken.Evade],
      leftShields: 1, rightShields: 1, frontShields: 1, rearShields: 1,
      frontArmament: new Armament(0, 1, 0), rearArmament: new Armament(0, 1, 0),
      leftArmament: new Armament(0, 0, 0), rightArmament: new Armament(0, 0, 0),
      antiSquadronArmament: new Armament(0, 1, 0),
      navigationChart: new NavigationChart(2, [1, 2], [0, 1, 2], null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.OffensiveRetrofit),
        new UpgradeSlot(UpgradeType.FleetSupport)
      ],
      allowedTitles: ShipFactory.titles.gr75, traits: []
    },
    {
      id: 106, name: 'GR-75 Medium Transports', shipClass: ShipClass.Normal, faction: Faction.Rebels,
      points: 18, hull: 3, command: 1, squadron: 2, engineering: 2, size: Size.SmallFlotilla,
      defenseTokens: [DefenseToken.Scatter, DefenseToken.Evade],
      leftShields: 1, rightShields: 1, frontShields: 1, rearShields: 1,
      frontArmament: new Armament(0, 0, 0), rearArmament: new Armament(0, 0, 0),
      leftArmament: new Armament(0, 0, 0), rightArmament: new Armament(0, 0, 0),
      antiSquadronArmament: new Armament(0, 0, 1),
      navigationChart: new NavigationChart(2, [1, 2], [0, 1, 2], null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.OffensiveRetrofit),
        new UpgradeSlot(UpgradeType.FleetSupport)
      ],
      allowedTitles: ShipFactory.titles.gr75, traits: []
    },
    {
      id: 107, name: 'Hammerhead Scout Corvette', shipClass: ShipClass.Normal, faction: Faction.Rebels,
      points: 41, hull: 5, command: 1, squadron: 1, engineering: 2, size: Size.Small,
      defenseTokens: [DefenseToken.Evade, DefenseToken.Redirect, DefenseToken.Contain],
      leftShields: 1, rightShields: 1, frontShields: 2, rearShields: 1,
      frontArmament: new Armament(2, 1, 0), rearArmament: new Armament(0, 0, 0),
      leftArmament: new Armament(0, 1, 0), rightArmament: new Armament(0, 1, 0),
      antiSquadronArmament: new Armament(0, 1, 0),
      navigationChart: new NavigationChart(2, [2, 1], [1, 1, 0], null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.WeaponsTeam),
        new UpgradeSlot(UpgradeType.OffensiveRetrofit), new UpgradeSlot(UpgradeType.Turbolaser)
      ],
      allowedTitles: ShipFactory.titles.hammerhead, traits: []
    },
    {
      id: 108, name: 'Hammerhead Torpedo Corvette', shipClass: ShipClass.Normal, faction: Faction.Rebels,
      points: 36, hull: 5, command: 1, squadron: 1, engineering: 2, size: Size.Small,
      defenseTokens: [DefenseToken.Evade, DefenseToken.Redirect, DefenseToken.Contain],
      leftShields: 1, rightShields: 1, frontShields: 2, rearShields: 1,
      frontArmament: new Armament(1, 1, 1), rearArmament: new Armament(0, 0, 0),
      leftArmament: new Armament(0, 0, 1), rightArmament: new Armament(0, 0, 1),
      antiSquadronArmament: new Armament(0, 0, 1),
      navigationChart: new NavigationChart(2, [2, 1], [1, 1, 0], null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.WeaponsTeam),
        new UpgradeSlot(UpgradeType.OffensiveRetrofit), new UpgradeSlot(UpgradeType.Ordnance)
      ],
      allowedTitles: ShipFactory.titles.hammerhead, traits: []
    },
    {
      id: 109, name: 'MC30c Scout Frigate', shipClass: ShipClass.Normal, faction: Faction.Rebels,
      points: 69, hull: 4, command: 2, squadron: 1, engineering: 3, size: Size.Small,
      defenseTokens: [DefenseToken.Evade, DefenseToken.Evade, DefenseToken.Redirect, DefenseToken.Redirect],
      leftShields: 3, rightShields: 3, frontShields: 3, rearShields: 2,
      frontArmament: new Armament(1, 0, 2), rearArmament: new Armament(1, 0, 1),
      leftArmament: new Armament(2, 0, 3), rightArmament: new Armament(2, 0, 3),
      antiSquadronArmament: new Armament(0, 1, 0),
      navigationChart: new NavigationChart(1, [1, 1], [0, 1, 2], [0, 1, 1, 0]),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.WeaponsTeam),
        new UpgradeSlot(UpgradeType.DefensiveRetrofit), new UpgradeSlot(UpgradeType.Ordnance),
        new UpgradeSlot(UpgradeType.Turbolaser)
      ],
      allowedTitles: ShipFactory.titles.mc30c, traits: []
    },
    {
      id: 110, name: 'MC30c Torpedo Frigate', shipClass: ShipClass.Normal, faction: Faction.Rebels,
      points: 63, hull: 4, command: 2, squadron: 1, engineering: 3, size: Size.Small,
      defenseTokens: [DefenseToken.Evade, DefenseToken.Evade, DefenseToken.Redirect, DefenseToken.Redirect],
      leftShields: 3, rightShields: 3, frontShields: 3, rearShields: 2,
      frontArmament: new Armament(0, 1, 2), rearArmament: new Armament(0, 1, 1),
      leftArmament: new Armament(0, 2, 3), rightArmament: new Armament(0, 2, 3),
      antiSquadronArmament: new Armament(0, 1, 0),
      navigationChart: new NavigationChart(1, [1, 1], [0, 1, 2], [0, 1, 1, 0]),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.WeaponsTeam),
        new UpgradeSlot(UpgradeType.DefensiveRetrofit), new UpgradeSlot(UpgradeType.Ordnance),
        new UpgradeSlot(UpgradeType.Turbolaser)
      ],
      allowedTitles: ShipFactory.titles.mc30c, traits: []
    },
    {
      id: 111, name: 'MC75 Armored Cruiser', shipClass: ShipClass.Normal, faction: Faction.Rebels,
      points: 104, hull: 9, command: 3, squadron: 3, engineering: 4, size: Size.Large,
      defenseTokens: [DefenseToken.Brace, DefenseToken.Redirect, DefenseToken.Contain, DefenseToken.Contain],
      leftShields: 3, rightShields: 3, frontShields: 4, rearShields: 3,
      frontArmament: new Armament(0, 2, 3), rearArmament: new Armament(0, 1, 1),
      leftArmament: new Armament(3, 2, 0), rightArmament: new Armament(3, 2, 0),
      antiSquadronArmament: new Armament(0, 1, 1),
      navigationChart: new NavigationChart(2, [1, 1], [0, 1, 1], null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.WeaponsTeam),
        new UpgradeSlot(UpgradeType.OffensiveRetrofit), new UpgradeSlot(UpgradeType.DefensiveRetrofit),
        new UpgradeSlot(UpgradeType.Ordnance), new UpgradeSlot(UpgradeType.IonCannons),
        new UpgradeSlot(UpgradeType.Turbolaser)
      ],
      allowedTitles: ShipFactory.titles.mc75, traits: []
    },
    {
      id: 112, name: 'MC75 Ordnance Cruiser', shipClass: ShipClass.Normal, faction: Faction.Rebels,
      points: 100, hull: 9, command: 3, squadron: 3, engineering: 4, size: Size.Large,
      defenseTokens: [DefenseToken.Brace, DefenseToken.Redirect, DefenseToken.Contain, DefenseToken.Contain],
      leftShields: 3, rightShields: 3, frontShields: 4, rearShields: 3,
      frontArmament: new Armament(0, 2, 3), rearArmament: new Armament(0, 0, 2),
      leftArmament: new Armament(3, 0, 2), rightArmament: new Armament(3, 0, 2),
      antiSquadronArmament: new Armament(0, 0, 1),
      navigationChart: new NavigationChart(2, [1, 1], [0, 1, 1], null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.WeaponsTeam),
        new UpgradeSlot(UpgradeType.OffensiveRetrofit), new UpgradeSlot(UpgradeType.DefensiveRetrofit),
        new UpgradeSlot(UpgradeType.Ordnance), new UpgradeSlot(UpgradeType.Ordnance)
      ],
      allowedTitles: ShipFactory.titles.mc75, traits: []
    },
    {
      id: 113, name: 'MC80 Assault Cruiser', shipClass: ShipClass.Normal, faction: Faction.Rebels,
      points: 114, hull: 8, command: 3, squadron: 3, engineering: 4, size: Size.Large,
      defenseTokens: [DefenseToken.Brace, DefenseToken.Redirect, DefenseToken.Redirect, DefenseToken.Contain],
      leftShields: 4, rightShields: 4, frontShields: 4, rearShields: 3,
      frontArmament: new Armament(2, 1, 0), rearArmament: new Armament(2, 1, 0),
      leftArmament: new Armament(4, 2, 0), rightArmament: new Armament(4, 2, 0),
      antiSquadronArmament: new Armament(0, 2, 0),
      navigationChart: new NavigationChart(1, [1, 1], null, null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.SupportTeam),
        new UpgradeSlot(UpgradeType.DefensiveRetrofit), new UpgradeSlot(UpgradeType.DefensiveRetrofit),
        new UpgradeSlot(UpgradeType.IonCannons), new UpgradeSlot(UpgradeType.Turbolaser)
      ],
      allowedTitles: ShipFactory.titles.mc80ho, traits: []
    },
    {
      id: 114, name: 'MC80 Command Cruiser', shipClass: ShipClass.Normal, faction: Faction.Rebels,
      points: 106, hull: 8, command: 3, squadron: 3, engineering: 4, size: Size.Large,
      defenseTokens: [DefenseToken.Brace, DefenseToken.Redirect, DefenseToken.Redirect, DefenseToken.Contain],
      leftShields: 4, rightShields: 4, frontShields: 4, rearShields: 3,
      frontArmament: new Armament(1, 2, 0), rearArmament: new Armament(1, 2, 0),
      leftArmament: new Armament(3, 3, 0), rightArmament: new Armament(3, 3, 0),
      antiSquadronArmament: new Armament(0, 1, 1),
      navigationChart: new NavigationChart(1, [1, 1], null, null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.SupportTeam),
        new UpgradeSlot(UpgradeType.OffensiveRetrofit), new UpgradeSlot(UpgradeType.DefensiveRetrofit),
        new UpgradeSlot(UpgradeType.IonCannons), new UpgradeSlot(UpgradeType.Turbolaser)
      ],
      allowedTitles: ShipFactory.titles.mc80ho, traits: []
    },
    {
      id: 115, name: 'MC80 Battle Cruiser', shipClass: ShipClass.Normal, faction: Faction.Rebels,
      points: 103, hull: 8, command: 3, squadron: 2, engineering: 4, size: Size.Large,
      defenseTokens: [DefenseToken.Brace, DefenseToken.Brace, DefenseToken.Redirect],
      leftShields: 2, rightShields: 2, frontShields: 5, rearShields: 2,
      frontArmament: new Armament(4, 3, 0), rearArmament: new Armament(1, 1, 0),
      leftArmament: new Armament(2, 1, 0), rightArmament: new Armament(2, 1, 0),
      antiSquadronArmament: new Armament(0, 0, 2),
      navigationChart: new NavigationChart(1, [1, 0], [1, 0, 1], null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.WeaponsTeam),
        new UpgradeSlot(UpgradeType.SupportTeam), new UpgradeSlot(UpgradeType.IonCannons),
        new UpgradeSlot(UpgradeType.Turbolaser), new UpgradeSlot(UpgradeType.Turbolaser)
      ],
      allowedTitles: ShipFactory.titles.mc80lib, traits: []
    },
    {
      id: 116, name: 'MC80 Star Cruiser', shipClass: ShipClass.Normal, faction: Faction.Rebels,
      points: 96, hull: 8, command: 3, squadron: 2, engineering: 4, size: Size.Large,
      defenseTokens: [DefenseToken.Brace, DefenseToken.Brace, DefenseToken.Redirect],
      leftShields: 2, rightShields: 2, frontShields: 5, rearShields: 2,
      frontArmament: new Armament(3, 4, 0), rearArmament: new Armament(0, 2, 0),
      leftArmament: new Armament(2, 1, 0), rightArmament: new Armament(2, 1, 0),
      antiSquadronArmament: new Armament(0, 0, 1),
      navigationChart: new NavigationChart(1, [1, 0], [1, 0, 1], null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.WeaponsTeam),
        new UpgradeSlot(UpgradeType.SupportTeam), new UpgradeSlot(UpgradeType.IonCannons),
        new UpgradeSlot(UpgradeType.Turbolaser), new UpgradeSlot(UpgradeType.Turbolaser)
      ],
      allowedTitles: ShipFactory.titles.mc80lib, traits: []
    },
    {
      id: 117, name: 'Modified Pelta-Class Assault Ship', shipClass: ShipClass.Normal, faction: Faction.Rebels,
      points: 56, hull: 5, command: 2, squadron: 1, engineering: 4, size: Size.Small,
      defenseTokens: [DefenseToken.Evade, DefenseToken.Brace, DefenseToken.Redirect],
      leftShields: 2, rightShields: 2, frontShields: 3, rearShields: 1,
      frontArmament: new Armament(2, 0, 2), rearArmament: new Armament(2, 0, 0),
      leftArmament: new Armament(1, 0, 1), rightArmament: new Armament(1, 0, 1),
      antiSquadronArmament: new Armament(0, 1, 1),
      navigationChart: new NavigationChart(2, [1, 1], null, null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.SupportTeam),
        new UpgradeSlot(UpgradeType.Ordnance), new UpgradeSlot(UpgradeType.FleetCommand)
      ],
      allowedTitles: ShipFactory.titles.pelta, traits: []
    },
    {
      id: 118, name: 'Modified Pelta-Class Command Ship', shipClass: ShipClass.Normal, faction: Faction.Rebels,
      points: 60, hull: 5, command: 2, squadron: 3, engineering: 4, size: Size.Small,
      defenseTokens: [DefenseToken.Evade, DefenseToken.Brace, DefenseToken.Redirect],
      leftShields: 2, rightShields: 2, frontShields: 3, rearShields: 1,
      frontArmament: new Armament(2, 2, 0), rearArmament: new Armament(2, 0, 0),
      leftArmament: new Armament(1, 1, 0), rightArmament: new Armament(1, 1, 0),
      antiSquadronArmament: new Armament(0, 1, 0),
      navigationChart: new NavigationChart(2, [1, 1], null, null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.SupportTeam),
        new UpgradeSlot(UpgradeType.OffensiveRetrofit), new UpgradeSlot(UpgradeType.FleetCommand)
      ],
      allowedTitles: ShipFactory.titles.pelta, traits: []
    },
    {
      id: 119, name: 'Nebulon-B Escort Frigate', shipClass: ShipClass.Normal, faction: Faction.Rebels,
      points: 57, hull: 5, command: 2, squadron: 2, engineering: 3, size: Size.Small,
      defenseTokens: [DefenseToken.Evade, DefenseToken.Brace, DefenseToken.Brace],
      leftShields: 1, rightShields: 1, frontShields: 3, rearShields: 2,
      frontArmament: new Armament(3, 0, 0), rearArmament: new Armament(2, 0, 0),
      leftArmament: new Armament(1, 1, 0), rightArmament: new Armament(1, 1, 0),
      antiSquadronArmament: new Armament(0, 2, 0),
      navigationChart: new NavigationChart(1, [1, 1], [0, 1, 2], null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.SupportTeam),
        new UpgradeSlot(UpgradeType.Turbolaser)
      ],
      allowedTitles: ShipFactory.titles.nebulon, traits: []
    },
    {
      id: 120, name: 'Nebulon-B Support Frigate', shipClass: ShipClass.Normal, faction: Faction.Rebels,
      points: 51, hull: 5, command: 2, squadron: 2, engineering: 3, size: Size.Small,
      defenseTokens: [DefenseToken.Evade, DefenseToken.Brace, DefenseToken.Brace],
      leftShields: 1, rightShields: 1, frontShields: 3, rearShields: 2,
      frontArmament: new Armament(3, 0, 0), rearArmament: new Armament(2, 0, 0),
      leftArmament: new Armament(1, 1, 0), rightArmament: new Armament(1, 1, 0),
      antiSquadronArmament: new Armament(0, 1, 0),
      navigationChart: new NavigationChart(1, [1, 1], [0, 1, 2], null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.SupportTeam),
        new UpgradeSlot(UpgradeType.Turbolaser)
      ],
      allowedTitles: ShipFactory.titles.nebulon, traits: []
    },
    {
      id: 121, name: 'Starhawk-Class Battleship Mark I', shipClass: ShipClass.Normal, faction: Faction.Rebels,
      points: 140, hull: 14, command: 4, squadron: 3, engineering: 4, size: Size.Large,
      defenseTokens: [DefenseToken.Brace, DefenseToken.Redirect, DefenseToken.Contain, DefenseToken.Salvo],
      leftShields: 4, rightShields: 4, frontShields: 6, rearShields: 2,
      frontArmament: new Armament(3, 2, 2), rearArmament: new Armament(2, 0, 1),
      leftArmament: new Armament(2, 2, 1), rightArmament: new Armament(2, 2, 1),
      antiSquadronArmament: new Armament(0, 1, 1),
      navigationChart: new NavigationChart(1, [1, 1], null, null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.Officer),
        new UpgradeSlot(UpgradeType.WeaponsTeam), new UpgradeSlot(UpgradeType.OffensiveRetrofit),
        new UpgradeSlot(UpgradeType.IonCannons), new UpgradeSlot(UpgradeType.Turbolaser),
        new UpgradeSlot(UpgradeType.Superweapon)
      ],
      allowedTitles: ShipFactory.titles.starhawkMarkI, traits: []
    },
    {
      id: 122, name: 'Starhawk-Class Battleship Mark II', shipClass: ShipClass.Normal, faction: Faction.Rebels,
      points: 150, hull: 14, command: 4, squadron: 3, engineering: 4, size: Size.Large,
      defenseTokens: [DefenseToken.Brace, DefenseToken.Redirect, DefenseToken.Contain, DefenseToken.Salvo],
      leftShields: 4, rightShields: 4, frontShields: 6, rearShields: 2,
      frontArmament: new Armament(3, 3, 1), rearArmament: new Armament(2, 1, 0),
      leftArmament: new Armament(3, 2, 0), rightArmament: new Armament(3, 2, 0),
      antiSquadronArmament: new Armament(1, 1, 0),
      navigationChart: new NavigationChart(1, [1, 1], null, null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.Officer),
        new UpgradeSlot(UpgradeType.WeaponsTeam), new UpgradeSlot(UpgradeType.OffensiveRetrofit),
        new UpgradeSlot(UpgradeType.IonCannons), new UpgradeSlot(UpgradeType.Turbolaser),
        new UpgradeSlot(UpgradeType.Superweapon)
      ],
      allowedTitles: ShipFactory.titles.starhawkMarkII, traits: []
    },
    // Republic
    {
      id: 200, name: 'Acclamator I-class Assault Ship', shipClass: ShipClass.Normal, faction: Faction.Republic,
      points: 66, hull: 7, command: 3, squadron: 3, engineering: 4, size: Size.Medium,
      defenseTokens: [DefenseToken.Brace, DefenseToken.Redirect, DefenseToken.Salvo],
      leftShields: 2, rightShields: 2, frontShields: 4, rearShields: 2,
      frontArmament: new Armament(3, 0, 2), rearArmament: new Armament(1, 0, 1),
      leftArmament: new Armament(2, 0, 1), rightArmament: new Armament(2, 0, 1),
      antiSquadronArmament: new Armament(0, 0, 2),
      navigationChart: new NavigationChart(1, [1, 0], [0, 1, 0], null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.OffensiveRetrofit),
        new UpgradeSlot(UpgradeType.WeaponsTeam), new UpgradeSlot(UpgradeType.OffensiveRetrofit),
        new UpgradeSlot(UpgradeType.Ordnance), new UpgradeSlot(UpgradeType.Turbolaser)
      ],
      allowedTitles: ShipFactory.titles.acclamator, traits: [Traits.clone, Traits.transport]
    },
    {
      id: 201, name: 'Acclamator II-class Assault Ship', shipClass: ShipClass.Normal, faction: Faction.Republic,
      points: 71, hull: 7, command: 3, squadron: 3, engineering: 4, size: Size.Medium,
      defenseTokens: [DefenseToken.Brace, DefenseToken.Redirect, DefenseToken.Salvo],
      leftShields: 2, rightShields: 2, frontShields: 4, rearShields: 2,
      frontArmament: new Armament(3, 1, 2), rearArmament: new Armament(1, 1, 0),
      leftArmament: new Armament(2, 0, 1), rightArmament: new Armament(2, 0, 1),
      antiSquadronArmament: new Armament(0, 1, 1),
      navigationChart: new NavigationChart(1, [1, 0], [0, 1, 0], null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), 
        new UpgradeSlot(UpgradeType.WeaponsTeam), new UpgradeSlot(UpgradeType.DefensiveRetrofit),
        new UpgradeSlot(UpgradeType.Ordnance), new UpgradeSlot(UpgradeType.Turbolaser)
      ],
      allowedTitles: ShipFactory.titles.acclamator, 
      traits: [Traits.clone, Traits.bombard, Traits.transport]
    },
    {
      id: 202, name: 'Consular-class Charger C70', shipClass: ShipClass.Normal, faction: Faction.Republic,
      points: 45, hull: 4, command: 1, squadron: 1, engineering: 2, size: Size.Small,
      defenseTokens: [DefenseToken.Evade, DefenseToken.Redirect, DefenseToken.Contain],
      leftShields: 2, rightShields: 2, frontShields: 2, rearShields: 1,
      frontArmament: new Armament(2, 1, 0), rearArmament: new Armament(1, 1, 0),
      leftArmament: new Armament(2, 0, 0), rightArmament: new Armament(2, 0, 0),
      antiSquadronArmament: new Armament(0, 0, 1),
      navigationChart: new NavigationChart(2, [2, 1], [1, 1, 1], [1, 0, 1, 1]),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.SupportTeam), 
        new UpgradeSlot(UpgradeType.OffensiveRetrofit), new UpgradeSlot(UpgradeType.Turbolaser)
      ],
      allowedTitles: ShipFactory.titles.consular, 
      traits: [Traits.clone]
    },
    // Separatists
    {
      id: 300, name: 'Munificent-class Comms Frigate', shipClass: ShipClass.Normal, faction: Faction.Separatists,
      points: 1, hull: 6, command: 2, squadron: 3, engineering: 4, size: Size.Medium,
      defenseTokens: [DefenseToken.Brace, DefenseToken.Redirect, DefenseToken.Salvo],
      leftShields: 2, rightShields: 2, frontShields: 4, rearShields: 2,
      frontArmament: new Armament(2, 2, 0), rearArmament: new Armament(1, 1, 0),
      leftArmament: new Armament(2, 0, 1), rightArmament: new Armament(2, 0, 1),
      antiSquadronArmament: new Armament(1, 0, 0),
      navigationChart: new NavigationChart(1, [1, 2], null, null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), 
      ],
      allowedTitles: ShipFactory.titles.munificent, 
      traits: [Traits.droid]
    },
    {
      id: 301, name: 'Munificent-class Star Frigate', shipClass: ShipClass.Normal, faction: Faction.Separatists,
      points: 1, hull: 6, command: 2, squadron: 2, engineering: 4, size: Size.Medium,
      defenseTokens: [DefenseToken.Brace, DefenseToken.Redirect, DefenseToken.Salvo],
      leftShields: 2, rightShields: 2, frontShields: 4, rearShields: 2,
      frontArmament: new Armament(2, 2, 0), rearArmament: new Armament(1, 1, 0),
      leftArmament: new Armament(2, 0, 1), rightArmament: new Armament(2, 0, 1),
      antiSquadronArmament: new Armament(1, 0, 0),
      navigationChart: new NavigationChart(1, [1, 2], null, null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.FleetSupport), 
        new UpgradeSlot(UpgradeType.SupportTeam), 
      ],
      allowedTitles: ShipFactory.titles.munificent, 
      traits: [Traits.droid, Traits.transport]
    },
    {
      id: 302, name: 'Hardcell-class Battle Refit', shipClass: ShipClass.Normal, faction: Faction.Separatists,
      points: 52, hull: 3, command: 1, squadron: 2, engineering: 2, size: Size.Small,
      defenseTokens: [DefenseToken.Brace],
      leftShields: 2, rightShields: 2, frontShields: 4, rearShields: 2,
      frontArmament: new Armament(2, 2, 0), rearArmament: new Armament(1, 1, 0),
      leftArmament: new Armament(2, 0, 1), rightArmament: new Armament(2, 0, 1),
      antiSquadronArmament: new Armament(1, 0, 0),
      navigationChart: new NavigationChart(1, [1, 2], null, null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.OffensiveRetrofit), 
        new UpgradeSlot(UpgradeType.DefensiveRetrofit), new UpgradeSlot(UpgradeType.Turbolaser),  
      ],
      allowedTitles: ShipFactory.titles.hardcell, 
      traits: [Traits.droid, Traits.transport]
    },
    {
      id: 303, name: 'Hardcell-class Transport', shipClass: ShipClass.Normal, faction: Faction.Separatists,
      points: 52, hull: 3, command: 1, squadron: 2, engineering: 2, size: Size.Small,
      defenseTokens: [DefenseToken.Brace],
      leftShields: 2, rightShields: 2, frontShields: 4, rearShields: 2,
      frontArmament: new Armament(2, 2, 0), rearArmament: new Armament(1, 1, 0),
      leftArmament: new Armament(2, 0, 1), rightArmament: new Armament(2, 0, 1),
      antiSquadronArmament: new Armament(1, 0, 0),
      navigationChart: new NavigationChart(1, [1, 2], null, null),
      upgradeSlots: [
        new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.OffensiveRetrofit), 
        new UpgradeSlot(UpgradeType.DefensiveRetrofit), new UpgradeSlot(UpgradeType.Turbolaser),  
      ],
      allowedTitles: ShipFactory.titles.hardcell, 
      traits: [Traits.droid, Traits.transport]
    }
  ];

  constructor() {

  }

  getShips(faction: Faction): (ShipData | IgnitionCapableShipData)[]  {
    return ShipFactory.shipData.filter(x => x.faction === faction);
  }

  instantiateShip(id: number, customCommander: CustomCommander = null,
    isScarred: boolean = false, isVeteran: boolean = false,
    uid: string = Guid.create().toString()): Ship {
    const data = ShipFactory.shipData.find(x => x.id === id);

    if (!data)
      return null;

    let isForFleetWithCustomCommander = !!customCommander;

    let upgradeSlots = data.upgradeSlots.map(x => new UpgradeSlot(x.type));
    if (upgradeSlots.find(u => u.type === UpgradeType.OffensiveRetrofit) &&
      upgradeSlots.find(u => u.type === UpgradeType.WeaponsTeam) &&
      !upgradeSlots.find(u => u.type === UpgradeType.BoardingTeam)) {
      // add a boarding team slot in
      // currently there are no ships that can fit two boarding teams
      upgradeSlots.push(new UpgradeSlot(UpgradeType.BoardingTeam));
    }

    // All ships currently have titles
    if (!upgradeSlots.find(u => u.type === UpgradeType.Title))
      upgradeSlots.push(new UpgradeSlot(UpgradeType.Title));
    // If the ship is not a flotilla, add a commander slot
    if (data.size !== Size.SmallFlotilla && !upgradeSlots.find(u => u.type === UpgradeType.Commander)) {
      const type = isForFleetWithCustomCommander ? UpgradeType.CustomCommander : UpgradeType.Commander;
      upgradeSlots.push(new UpgradeSlot(type));
    }

    if (isForFleetWithCustomCommander) {
      if (customCommander.additionalSupportShipUid === uid) {
        upgradeSlots.push(new UpgradeSlot(UpgradeType.FleetSupport));
      }
      if (customCommander.commandBridgeShipUid === uid) {
        upgradeSlots.push(new UpgradeSlot(UpgradeType.FleetCommand));
      }
    }

    if (data.shipClass === ShipClass.Normal) {
      let ship = new Ship(uid, data.id, data.name, data.shipClass, data.faction,
        data.size, data.hull, data.command, data.squadron, data.engineering, data.points,
        data.defenseTokens, data.frontShields, 
        data.leftShields, data.rightShields, data.rearShields, data.antiSquadronArmament,
        data.frontArmament, 
        data.leftArmament, data.rightArmament, data.rearArmament, data.navigationChart,
        upgradeSlots, data.allowedTitles, data.traits);
      ship.isScarred = isScarred;
      ship.isVeteran = isVeteran;
      return ship;
    } else if (data.shipClass === ShipClass.Huge) {
      let ship = new HugeShip(uid, data.id, data.name, data.shipClass, data.faction,
        data.size, data.hull, data.command, data.squadron, data.engineering, data.points,
        data.defenseTokens, data.frontShields, 
        data.leftShields, data.rightShields, data.rearShields, data.antiSquadronArmament,
        data.frontArmament, 
        data.leftArmament, data.rightArmament, data.rearArmament, data.navigationChart,
        upgradeSlots, data.allowedTitles, data.traits,
        (<HugeShipData>data).leftAuxShields,  (<HugeShipData>data).rightAuxShields,
        (<HugeShipData>data).leftAuxArmament,  (<HugeShipData>data).rightAuxArmament);
      ship.isScarred = isScarred;
      ship.isVeteran = isVeteran;
      return ship;
    } else if (data.shipClass === ShipClass.IgnitionCapable) {
      let ship = new IgnitionCapableShip(uid, data.id, data.name, data.shipClass, data.faction,
        data.size, data.hull, data.command, data.squadron, data.engineering, data.points,
        data.defenseTokens, data.frontShields, 
        data.leftShields, data.rightShields, data.rearShields, data.antiSquadronArmament,
        data.frontArmament, 
        data.leftArmament, data.rightArmament, data.rearArmament, data.navigationChart,
        upgradeSlots, data.allowedTitles, data.traits, (<IgnitionCapableShipData>data).ignitionArmament);
      ship.isScarred = isScarred;
      ship.isVeteran = isVeteran;
      return ship;
    }
    return null;
  }
}
