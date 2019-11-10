import { Component, OnInit, Input } from '@angular/core';
import { CustomCommander } from 'src/app/domain/campaign/customCommander';
import { CustomCommanderAbility } from 'src/app/domain/campaign/customCommanderAbility';
import { CustomAbilityFactory } from 'src/app/domain/factories/customAbilityFactory';
import { CustomAbilitySelectorComponent, CustomAbilitySelectorData } from '../custom-ability-selector/custom-ability-selector.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'flagship-custom-commander',
  templateUrl: './custom-commander.component.html',
  styleUrls: ['./custom-commander.component.scss']
})
export class CustomCommanderComponent implements OnInit {
  @Input() commander: CustomCommander;

  isEditing = false;
  proposedAbilities: CustomCommanderAbility[] = [];
  proposedExperience: number;

  abilityFactory = new CustomAbilityFactory();
  constructor(private dialog: MatDialog) { }

  ngOnInit() {

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

      let lesserAbility = this.commander.abilities.find(x => x.group === ability.group);
      if (lesserAbility) {
        let nextRank: CustomCommanderAbility = lesserAbility;
        do {
          nextRank = this.abilityFactory.getNextRank(nextRank);
          this.proposedExperience -= nextRank.xpCost;
        } while (nextRank.id !== ability.id)
        continue;
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
    this.commander.setAbilities(this.proposedAbilities, this.proposedExperience);
  }
}
