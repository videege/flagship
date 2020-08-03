import { Faction } from "./faction";
import { Size } from "./size";
import { DefenseToken } from "./defenseToken";
import { UpgradeType, sortUpgradeTypes } from "./upgradeType";
import { UpgradeSlot } from "./upgradeSlot";
import { Armament } from "./armament";
import { Upgrade } from "./upgrade";
import { Fleet } from "./fleet";
import { NavigationChart } from "./navigationChart";
import { Squadron } from './squadron';
import { Subject } from 'rxjs';
import { ClipboardIfSupportedDirective } from 'ngx-clipboard';

export interface ISerializedShip {
  uid: string;
  id: number;
  upgrades: number[];
  isScarred: boolean;
  isVeteran: boolean;
}

export enum ShipClass {
  Normal,
  IgnitionCapable,
  Huge
}

export interface ShipData {
  id: number;
  name: string;
  shipClass: ShipClass;
  faction: Faction;
  size: Size;
  hull: number;
  command: number;
  squadron: number;
  engineering: number;
  points: number;
  frontShields: number;
  leftShields: number;
  rightShields: number;
  rearShields: number;
  defenseTokens: DefenseToken[];
  allowedTitles: number[];
  upgradeSlots: UpgradeSlot[];
  antiSquadronArmament: Armament;
  frontArmament: Armament;
  leftArmament: Armament;
  rightArmament: Armament;
  rearArmament: Armament;
  navigationChart: NavigationChart;
  traits: string[];
}

export interface HugeShipData extends ShipData {
  leftAuxShields: number;
  rightAuxShields: number;
  leftAuxArmament: Armament;
  rightAuxArmament: Armament;
}

export interface IgnitionCapableShipData extends ShipData {
  ignitionArmament: Armament;
}

export class Ship implements ShipData {
  public subject: Subject<number>;

  public fleet: Fleet;
  public isScarred: boolean = null;
  public isVeteran: boolean = null;

  constructor(public uid: string, public id: number, public name: string, public shipClass: ShipClass,
    public faction: Faction, public size: Size,
    public hull: number, public command: number,
    public squadron: number, public engineering: number, public points: number,
    public defenseTokens: DefenseToken[], public frontShields: number,
    public leftShields: number, public rightShields: number,
    public rearShields: number,
    public antiSquadronArmament: Armament, public frontArmament: Armament,
    public leftArmament: Armament, public rightArmament: Armament,
    public rearArmament: Armament, public navigationChart: NavigationChart,
    public upgradeSlots: UpgradeSlot[], public allowedTitles: number[],
    public traits: string[]) {
    this.subject = new Subject<number>();
  }

  serialize(): ISerializedShip {
    let upgradeIds = this.upgradeSlots.filter(u => u.isEnabled && u.isFilled())
      .map(u => u.upgrade.id);
    return {
      uid: this.uid,
      id: this.id,
      upgrades: upgradeIds,
      isScarred: this.isScarred,
      isVeteran: this.isVeteran
    };
  }

  getSummaryName(): string {
    const title = this.upgradeSlots.find(x => x.type === UpgradeType.Title && x.isEnabled && x.isFilled());
    if (title) {
      return `${this.name} - ${title.upgrade.name} [${this.currentPoints()} points]`;
    }
    return `${this.name} [${this.currentPoints()} points]`
  }

  setIsScarred(isScarred: boolean) {
    if (this.isScarred != isScarred) {
      this.isScarred = isScarred;
      this.subject.next(this.id);
    }
  }

  setIsVeteran(isVeteran: boolean) {
    if (this.isVeteran != isVeteran) {
      this.isVeteran = isVeteran;
      this.subject.next(this.id);
    }
  }

  currentPointsFromUpgrades(): number {
    let points = 0;
    for (const upgradeSlot of this.upgradeSlots) {
      if (upgradeSlot.isEnabled && upgradeSlot.upgrade) {
        points += upgradeSlot.upgrade.points;
      }
    }
    return points;
  }

  currentPoints(): number {
    let points = this.points;
    points = points + this.currentPointsFromUpgrades();

    return points;
  }

  isUpgradeSelectable(upgrade: Upgrade, slot: UpgradeSlot): boolean {
    if (slot.isFilled() && slot.upgrade.id === upgrade.id)
      return true; //You can always select what is already there

    if (upgrade.unique) {
      //Check if this upgrade's name is equipped elsewhere
      let matchingUpgrade = this.fleet.ships.map(s => s.upgradeSlots).flat()
        .find(u => u.isEnabled && u.isFilled() && u.upgrade.name === upgrade.name);
      if (matchingUpgrade && matchingUpgrade.upgrade) {
        return false;
      }

      let matchingSquadron = this.fleet.squadrons.find((s: Squadron) => s.name === upgrade.name);
      if (matchingSquadron) {
        return false;
      }
    }

    if (upgrade.modification) {
      let upgradeSlotWithMod = this.upgradeSlots.find(u => u.isEnabled && u.isFilled() && u.upgrade.modification);
      if (upgradeSlotWithMod) {
        return false;
      }
    }

    if (upgrade.type === UpgradeType.Title) {
      const matchingTitle = this.allowedTitles.find((t) => t === upgrade.id);
      if (!matchingTitle) {
        return false;
      }
    }

    // Can't equip if this card has a size restriction and the ship size doesn't match
    if (upgrade.sizeRestriction) {
      let matchingSize = upgrade.sizeRestriction.find(x => x === this.size);
      if (!matchingSize) {
        return false;
      }
    }

    return true;
  }

  canEquipUpgrade(upgrade: Upgrade): boolean {
    // Can't equip if upgrade doesn't agree
    if (!upgrade.canEquipToShip(this)) {
      return false;
    }

    if (upgrade.type === UpgradeType.Title) {
      const matchingTitle = this.allowedTitles.find((t) => t === upgrade.id);
      if (!matchingTitle) {
        return false;
      }
    }

    // Can't equip if fleet doesn't agree
    if (this.fleet != null && !this.fleet.canEquipUpgrade(this, upgrade)) {
      return false;
    }

    return true;
  }

  equipUpgrade(upgrade: Upgrade, slot?: UpgradeSlot): boolean {
    if (!this.canEquipUpgrade(upgrade)) {
      console.log('Cannot equip upgrade.');
      return false;
    }

    slot = slot || this.upgradeSlots.find((u: UpgradeSlot) => u.isEnabled && u.type === upgrade.type && !u.isFilled());
    slot.equipUpgrade(upgrade, this);

    // Handle the case of boarding teams/weapon teams/offensive retrofits
    const boardingTeamsSlot = this.upgradeSlots.find((u: UpgradeSlot) => u.type === UpgradeType.BoardingTeam);
    if (boardingTeamsSlot) {
      if (upgrade.type === UpgradeType.BoardingTeam) {
        // disable the free weapons team and offensive retrofit slots
        const weaponsTeamSlot = this.upgradeSlots.find((u: UpgradeSlot) =>
          u.type === UpgradeType.WeaponsTeam && u.isEnabled && !u.isFilled());
        const offensiveRetrofitSlot = this.upgradeSlots.find((u: UpgradeSlot) =>
          u.type === UpgradeType.OffensiveRetrofit && u.isEnabled && !u.isFilled());
        weaponsTeamSlot.isEnabled = false;
        offensiveRetrofitSlot.isEnabled = false;
      } else if (upgrade.type === UpgradeType.OffensiveRetrofit ||
        upgrade.type === UpgradeType.WeaponsTeam) {
        // disable the free boarding teams slot if there aren't enough free slots
        const weaponsTeamSlot = this.upgradeSlots.find((u: UpgradeSlot) =>
          u.type === UpgradeType.WeaponsTeam && u.isEnabled && !u.isFilled());
        const offensiveRetrofitSlot = this.upgradeSlots.find((u: UpgradeSlot) =>
          u.type === UpgradeType.OffensiveRetrofit && u.isEnabled && !u.isFilled());
        if (!weaponsTeamSlot || !offensiveRetrofitSlot) {
          boardingTeamsSlot.isEnabled = false;
        }
      }
    }
    this.subject.next(this.id);
    return true;
  }

  unequipUpgrade(slot: UpgradeSlot) {
    let upgradeType = slot.upgrade.type;
    slot.unequipUpgrade(this);

    // Handle the case of boarding teams/weapon teams/offensive retrofits
    const boardingTeamsSlot = this.upgradeSlots.find((u: UpgradeSlot) => u.type === UpgradeType.BoardingTeam);
    if (boardingTeamsSlot) {
      if (upgradeType === UpgradeType.BoardingTeam) {
        // enable the disabled weapons team and offensive retrofit slots
        const weaponsTeamSlot = this.upgradeSlots.find((u: UpgradeSlot) =>
          u.type === UpgradeType.WeaponsTeam && !u.isEnabled);
        const offensiveRetrofitSlot = this.upgradeSlots.find((u: UpgradeSlot) =>
          u.type === UpgradeType.OffensiveRetrofit && !u.isEnabled);
        weaponsTeamSlot.isEnabled = true;
        offensiveRetrofitSlot.isEnabled = true;
      } else if (upgradeType === UpgradeType.OffensiveRetrofit ||
        upgradeType === UpgradeType.WeaponsTeam) {
        // enable the free boarding teams slot if there are enough free slots
        const weaponsTeamSlot = this.upgradeSlots.find((u: UpgradeSlot) =>
          u.type === UpgradeType.WeaponsTeam && u.isEnabled && !u.isFilled());
        const offensiveRetrofitSlot = this.upgradeSlots.find((u: UpgradeSlot) =>
          u.type === UpgradeType.OffensiveRetrofit && u.isEnabled && !u.isFilled());
        if (weaponsTeamSlot && offensiveRetrofitSlot) {
          boardingTeamsSlot.isEnabled = true;
        }
      }
    }
    this.subject.next(this.id);
  }

  isFlagship(): boolean {
    return this.upgradeSlots.find((u: UpgradeSlot) => u.isEnabled &&
      (u.type === UpgradeType.Commander || u.type === UpgradeType.CustomCommander)
       && u.isFilled()) != null;
  }

  sortedUpgrades(): Upgrade[] {
    return this.upgradeSlots.filter((u: UpgradeSlot) => u.isEnabled && u.isFilled())
      .map(u => u.upgrade)
      .sort((a, b) => sortUpgradeTypes(a.type, b.type));
  }
}


export class HugeShip extends Ship implements HugeShipData {
  constructor(uid: string, id: number, name: string, shipClass: ShipClass,
    faction: Faction, size: Size,
    hull: number, command: number,
    squadron: number, engineering: number, points: number,
    defenseTokens: DefenseToken[], frontShields: number,
    leftShields: number, rightShields: number,
    rearShields: number,
    antiSquadronArmament: Armament, frontArmament: Armament,
    leftArmament: Armament, rightArmament: Armament,
    rearArmament: Armament, navigationChart: NavigationChart,
    upgradeSlots: UpgradeSlot[], allowedTitles: number[],
    traits: string[],
    public leftAuxShields: number, public rightAuxShields: number,
    public leftAuxArmament: Armament, public rightAuxArmament: Armament) {
      super(uid, id, name, shipClass, faction, size, hull,
        command, squadron, engineering, points, defenseTokens,
        frontShields, leftShields,
        rightShields, rearShields, antiSquadronArmament, frontArmament,
        leftArmament, rightArmament, rearArmament,
        navigationChart, upgradeSlots, allowedTitles, traits);
  }
}

export class IgnitionCapableShip extends Ship implements IgnitionCapableShipData {
  constructor(uid: string, id: number, name: string, shipClass: ShipClass,
    faction: Faction, size: Size,
    hull: number, command: number,
    squadron: number, engineering: number, points: number,
    defenseTokens: DefenseToken[], frontShields: number,
    leftShields: number, rightShields: number,
    rearShields: number,
    antiSquadronArmament: Armament, frontArmament: Armament,
    leftArmament: Armament, rightArmament: Armament,
    rearArmament: Armament, navigationChart: NavigationChart,
    upgradeSlots: UpgradeSlot[], allowedTitles: number[],
    traits: string[],
    public ignitionArmament: Armament) {
      super(uid, id, name, shipClass, faction, size, hull,
        command, squadron, engineering, points, defenseTokens,
        frontShields, leftShields,
        rightShields, rearShields, antiSquadronArmament, frontArmament,
        leftArmament, rightArmament, rearArmament,
        navigationChart, upgradeSlots, allowedTitles, traits);
  }
}