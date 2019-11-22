import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CustomCommander } from 'src/app/domain/campaign/customCommander';
import { CustomCommanderAbility } from 'src/app/domain/campaign/customCommanderAbility';
import { CustomAbilityFactory } from 'src/app/domain/factories/customAbilityFactory';
import { CustomAbilitySelectorComponent, CustomAbilitySelectorData } from '../custom-ability-selector/custom-ability-selector.component';
import { MatDialog } from '@angular/material';
import { Ship } from 'src/app/domain/game/ship';
import { Fleet } from 'src/app/domain/game/fleet';
import { Size } from 'src/app/domain/game/size';
import { UpgradeType } from 'src/app/domain/game/upgradeType';
import { UpgradeSlot } from 'src/app/domain/game/upgradeSlot';

@Component({
  selector: 'flagship-custom-commander',
  templateUrl: './custom-commander.component.html',
  styleUrls: ['./custom-commander.component.scss']
})
export class CustomCommanderComponent implements OnInit, OnChanges {

  @Input() commander: CustomCommander;
  @Input() fleet: Fleet;

  isEditing = false;
  proposedAbilities: CustomCommanderAbility[] = [];
  proposedExperience: number;

  abilityFactory = new CustomAbilityFactory();

  commandBridgeShip: Ship = null;
  additionalSupportShip: Ship = null;

  shipsForCommandBridge(): Ship[] {
    return this.fleet.ships.filter(x => x.uid === this.commander.commandBridgeShipUid ||
      ((x.size === Size.Medium || x.size === Size.Large) &&
        !x.upgradeSlots.find(u => u.type === UpgradeType.FleetCommand)));
  }

  shipsForAdditionalSupport(): Ship[] {
    return this.fleet.ships.filter(x => x.upgradeSlots.find(u => u.type === UpgradeType.FleetSupport));
  }

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    if (this.commander.hasAdditionalSupport()) {
      this.additionalSupportShip = this.fleet.ships.find(x => x.uid === this.commander.additionalSupportShipUid);
    }
    if (this.commander.hasCommandBridge()) {
      this.commandBridgeShip = this.fleet.ships.find(x => x.uid === this.commander.commandBridgeShipUid);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.commander.hasAdditionalSupport() || !this.commander.additionalSupportShipUid) {
      this.additionalSupportShip = null;
    }
    if (!this.commander.hasCommandBridge() || !this.commander.commandBridgeShipUid) {
      this.commandBridgeShip = null;
    }
  }

  additionalSupportShipChanged() {
    this.removeUpgradeSlotFromCurrentShip(this.commander.additionalSupportShipUid,
      this.additionalSupportShip, UpgradeType.FleetSupport);
    this.addUpgradeSlotToSelectedShip(this.commander.additionalSupportShipUid,
      this.additionalSupportShip, UpgradeType.FleetSupport);
    this.commander.setAdditionalSupportShip(this.additionalSupportShip.uid);
  }

  removeUpgradeSlotFromCurrentShip(uid: string, selectedShip: Ship, type: UpgradeType,
    force = false) {
    let ship = this.fleet.ships.find(x => x.uid === uid);
    if (ship && (ship !== selectedShip || force)) {
      let fleetSupport = ship.upgradeSlots.filter(x => x.type === type);
      let lastFleetSupport = fleetSupport[fleetSupport.length - 1];
      if (lastFleetSupport) {
        if (lastFleetSupport.isFilled()) {
          lastFleetSupport.unequipUpgrade(ship);
        }
        ship.upgradeSlots.splice(ship.upgradeSlots.indexOf(lastFleetSupport), 1);
      }
    }
  }

  addUpgradeSlotToSelectedShip(uid: string, selectedShip: Ship, type: UpgradeType) {
    let ship = this.fleet.ships.find(x => x.uid === uid)
    if (selectedShip && ship != selectedShip) {
      selectedShip.upgradeSlots.push(new UpgradeSlot(type));
    }
  }

  commandBridgeShipChanged() {
    this.removeUpgradeSlotFromCurrentShip(this.commander.commandBridgeShipUid,
      this.commandBridgeShip, UpgradeType.FleetCommand);
    this.addUpgradeSlotToSelectedShip(this.commander.commandBridgeShipUid,
      this.commandBridgeShip, UpgradeType.FleetCommand);
    this.commander.setCommandBridgeShip(this.commandBridgeShip.uid);
  }

  canAddFreeAbility() {
    return this.commander.abilities.length === 0 &&
      this.commander.lifetimeExperience === 0 &&
      this.proposedAbilities.length === 0;
  }

  canAddAbility() {
    return this.canAddFreeAbility() ||
      (this.tierSum(this.proposedAbilities) < 4 && this.proposedExperience > 0);
  }

  tierSum(abilities: CustomCommanderAbility[]): number {
    if (!abilities.length) return 0;

    return abilities.map(x => x.tier).reduce((sum, val) => sum + val);
  }

  canUpgradeAbility(ability: CustomCommanderAbility): boolean {
    if (!ability) return false;
    if (!this.canAddAbility()) return false;

    let nextRank = this.abilityFactory.getNextRank(ability);
    if (!nextRank) return false;

    let currentTiers = this.tierSum(this.proposedAbilities);
    if (currentTiers + (nextRank.tier - ability.tier) > 4)
      return false;

    if (this.proposedExperience - nextRank.xpCost < 0)
      return false;

    return true;
  }

  upgradeAbility(ability: CustomCommanderAbility): void {
    let nextRank = this.abilityFactory.getNextRank(ability);
    if (nextRank) {
      this.proposedAbilities.splice(this.proposedAbilities.indexOf(ability), 1,
        nextRank);
      this.reconcileCost();
    }
  }

  addNewAbility() {
    let ref = this.dialog.open(CustomAbilitySelectorComponent, {
      width: '500px',
      data: <CustomAbilitySelectorData>{
        abilities: this.proposedAbilities,
        currentExperience: this.proposedExperience,
        currentTiers: this.tierSum(this.proposedAbilities),
        isFreeSelection: this.canAddFreeAbility()
      }
    });
    ref.afterClosed().subscribe((ability: CustomCommanderAbility) => {
      if (ability) {
        this.proposedAbilities.push(ability);
        this.reconcileCost();
      }
    });
  }

  removeAbility(ability: CustomCommanderAbility) {
    this.proposedAbilities.splice(this.proposedAbilities.indexOf(ability), 1);
    this.reconcileCost();
  }

  reconcileCost() {
    this.proposedExperience = this.commander.currentExperience;

    for (const ability of this.proposedAbilities) {
      let matchingAbility = this.commander.abilities.find(x => x.id === ability.id);
      if (matchingAbility) continue;

      if (ability.rank !== null) {
        let lesserAbility = this.commander.abilities.find(x => x.group === ability.group);
        if (lesserAbility) {
          let nextRank: CustomCommanderAbility = lesserAbility;
          do {
            nextRank = this.abilityFactory.getNextRank(nextRank);
            this.proposedExperience -= nextRank.xpCost;
          } while (nextRank.id !== ability.id)
          continue;
        }
      }

      if (this.proposedAbilities.length === 1 &&
        this.commander.abilities.length === 0 &&
        this.commander.currentExperience === 0 &&
        this.commander.lifetimeExperience === 0)
        break; // free ability

      let newAbility = ability;
      this.proposedExperience -= newAbility.xpCost;

      while (newAbility.prerequisiteId) {
        // walk the chain backwards
        newAbility = this.abilityFactory.getAbility(newAbility.prerequisiteId);
        this.proposedExperience -= newAbility.xpCost;
      }

    }
  }

  beginEditing() {
    this.isEditing = true;
    this.proposedAbilities = Object.assign([], this.commander.abilities);
    this.proposedExperience = this.commander.currentExperience;
  }

  cancelEditing() {
    this.proposedAbilities = null;
    this.isEditing = false;
  }

  confirmChanges() {
    this.isEditing = false;
    // Check for the removal of command staff
    if (this.commander.hasCommandStaff() && !this.proposedAbilities.find(x => x.id === 21)) {
      let flagship = this.fleet.ships.find(x => x.isFlagship());
      if (flagship) {
        let officers = flagship.upgradeSlots.filter((u: UpgradeSlot) => u.isEnabled &&
          u.type === UpgradeType.Officer);
        let lastOfficer = officers[officers.length - 1];
        if (lastOfficer.isFilled()) {
          flagship.unequipUpgrade(lastOfficer);
        }
        flagship.upgradeSlots.splice(flagship.upgradeSlots.indexOf(lastOfficer, 1));
      }
    }
    // Check for removal of command bridge, additional support
    if (this.commander.hasAdditionalSupport() && !this.proposedAbilities.find(x => x.id === 20) &&
      this.additionalSupportShip) {
      this.removeUpgradeSlotFromCurrentShip(this.commander.additionalSupportShipUid,
        this.additionalSupportShip, UpgradeType.FleetSupport, true);
      this.commander.setAdditionalSupportShip(null);
    }
    if (this.commander.hasCommandBridge() && !this.proposedAbilities.find(x => x.id === 22) &&
      this.commandBridgeShip) {
      this.removeUpgradeSlotFromCurrentShip(this.commander.commandBridgeShipUid,
        this.commandBridgeShip, UpgradeType.FleetCommand, true);
      this.commander.setCommandBridgeShip(null);
    }
    this.commander.setAbilities(this.proposedAbilities, this.proposedExperience);
  }
}
