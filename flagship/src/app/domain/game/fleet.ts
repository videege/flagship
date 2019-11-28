import { Faction } from "./faction";
import { Ship, ISerializedShip } from "./ship";
import { Squadron, ISerializedSquadron } from "./squadron";
import { Upgrade } from "./upgrade";
import { UpgradeSlot } from "./upgradeSlot";
import { UpgradeType } from "./upgradeType";

import { Subject } from 'rxjs';
import { Objective } from './objective';
import { CustomCommander, SerializedCustomCommander } from '../campaign/customCommander';
import { CustomCommanderAbilityCategory } from '../campaign/customCommanderAbilityCategory';

export interface ISerializedFleet {
  id: string;
  name: string;
  author: string;
  faction: Faction;
  pointLimit: number;
  squadronPointLimit: number;

  ships: ISerializedShip[];
  squadrons: ISerializedSquadron[];
  objectives: number[];

  ownerUid: string;
  campaignId: string;
  customCommander: SerializedCustomCommander;

  originalFleetId: string;
  isPublic: boolean;
}

export class Fleet {
  public subject: Subject<string>;

  public ownerUid: string;
  public campaignId: string;
  public customCommander: CustomCommander = null;

  public ships: Ship[];
  public squadrons: Squadron[];
  public objectives: Objective[];

  public originalFleetId: string = null;
  public isPublic: boolean = true;

  canEdit: boolean = false;

  constructor(public id: string, public name: string,
    public author: string, public faction: Faction, public pointLimit: number,
    public squadronPointLimit: number) {
    this.ships = [];
    this.squadrons = [];
    this.objectives = [];
    if (this.squadronPointLimit > this.pointLimit) {
      this.squadronPointLimit = this.pointLimit;
    }

    this.subject = new Subject<string>();
  }

  public setId(id: string) {
    this.id = id;
  }

  public setOwnerUid(uid: string) {
    this.ownerUid = uid;
  }

  public setCampaignId(id: string) {
    this.campaignId = id;
  }

  public setCommander(commander: CustomCommander) {
    this.customCommander = commander;
    this.customCommander.subject.subscribe(() => {
      this.subject.next(this.id);
    })
  }

  public hasCustomCommander(): boolean {
    return !!this.customCommander;
  }

  serialize(): ISerializedFleet {
    let ships = this.ships.map(s => s.serialize());
    let squadrons = this.squadrons.map(s => s.serialize());
    let objectives = this.objectives.map(o => o.id);

    return {
      id: this.id,
      name: this.name,
      author: this.author,
      faction: this.faction,
      pointLimit: this.pointLimit,
      squadronPointLimit: this.squadronPointLimit,
      ships: ships,
      squadrons: squadrons,
      objectives: objectives,
      ownerUid: this.ownerUid,
      campaignId: this.campaignId || null,
      customCommander: this.customCommander ? this.customCommander.serialize() : null,
      originalFleetId: this.originalFleetId,
      isPublic: this.isPublic
    };
  }

  currentPointsFromShips(): number {
    let points = 0;
    for (let i = 0; i < this.ships.length; i++) {
      points += this.ships[i].currentPoints();
    }
    return points;
  }

  currentPointsFromSquadrons(): number {
    let points = 0;
    for (let i = 0; i < this.squadrons.length; i++) {
      points += this.squadrons[i].points;
    }
    return points;
  }

  currentPoints(): number {
    return this.currentPointsFromShips() + this.currentPointsFromSquadrons();
  }

  getCommanderName(): string {
    let commander = "None";
    for (const ship of this.ships) {
      let commanderSlot = ship.upgradeSlots.find((u: UpgradeSlot) => {
        return u.isEnabled && u.isFilled() && u.type === UpgradeType.Commander;
      });
      if (commanderSlot != null) {
        commander = commanderSlot.upgrade.name;
        break;
      }
    }
    return commander;
  }

  getShipWithMatchingUpgradeName(name: string): Ship {
    let shipWithMatchingUpgrade = this.ships.find((s: Ship) => {
      let matchingUpgrade = s.upgradeSlots.find((u: UpgradeSlot) => u.isEnabled && u.isFilled() && u.upgrade.name === name);
      return matchingUpgrade ? true : false;
    });
    return shipWithMatchingUpgrade;
  }

  canEquipUpgrade(ship: Ship, upgrade: Upgrade): boolean {
    // Can't equip if unique and there is already a upgrade/squadron with
    // the same name
    if (upgrade.unique && this.hasUniqueNameEquipped(upgrade.name)) {
      return false;
    }

    return true;
  }

  setObjective(objective: Objective) {
    // if there is already an objective of this type, remove it.
    let existingObjective = this.objectives.find(o => o.type === objective.type);
    if (existingObjective) {
      this.removeObjective(existingObjective);
    }
    this.objectives.push(objective);
    this.subject.next(this.id);
  }

  removeObjective(objective: Objective) {
    let idx = this.objectives.indexOf(objective);
    this.objectives.splice(idx, 1);
    this.subject.next(this.id);
  }

  addShip(ship: Ship): void {
    if (this.faction !== ship.faction)
      return;

    ship.fleet = this;
    if (this.getCommanderName() !== "None") {
      let commanderSlot = ship.upgradeSlots.find(x => x.type === UpgradeType.Commander);
      if (commanderSlot) {
        commanderSlot.isEnabled = false;
      }
    }
    this.ships.push(ship);
    ship.subject.subscribe((id: number) => {
      this.subject.next(this.id);
    })
    this.subject.next(this.id);
  }

  deleteShip(ship: Ship): void {
    let idx = this.ships.indexOf(ship);
    if (idx >= 0) {
      this.ships[idx].subject.unsubscribe();
      this.ships.splice(idx, 1);
      if (this.hasCustomCommander()) {
        if (this.customCommander.hasAdditionalSupport() &&
          this.customCommander.additionalSupportShipUid === ship.uid) {
          this.customCommander.setAdditionalSupportShip(null);
        }
        if (this.customCommander.hasCommandBridge() &&
          this.customCommander.commandBridgeShipUid === ship.uid) {
          this.customCommander.setCommandBridgeShip(null);
        }
      }
      this.subject.next(this.id);
    }
  }

  addSquadron(squadron: Squadron): void {
    if (this.faction !== squadron.faction)
      return;

    squadron.fleet = this;
    this.squadrons.push(squadron);
    this.subject.next(this.id);
  }

  removeSquadron(id: number): void {
    let idx = this.squadrons.findIndex(s => s.id === id);
    if (idx >= 0) {
      this.squadrons.splice(idx, 1);
      this.subject.next(this.id);
    }
  }

  getEquippedUniqueNames(): string[] {
    let upgradeUniques = this.ships.map(s => s.upgradeSlots).flat()
      .filter(u => u.isEnabled && u.isFilled() && u.upgrade.unique).map(u => u.upgrade.name);

    let squadronUniques = this.squadrons.filter(s => s.unique).map(u => u.name);

    return upgradeUniques.concat(squadronUniques);
  }

  hasUniqueNameEquipped(name: string): boolean {
    let shipWithMatchingUpgrade = this.getShipWithMatchingUpgradeName(name);
    if (shipWithMatchingUpgrade) {
      return true;
    }

    let matchingSquadron = this.squadrons.find((s: Squadron) => s.name === name);
    if (matchingSquadron) {
      return true;
    }

    return false;
  }
}
