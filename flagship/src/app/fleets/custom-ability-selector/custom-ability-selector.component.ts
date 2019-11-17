import { Component, OnInit, Inject } from '@angular/core';
import { CustomCommander } from 'src/app/domain/campaign/customCommander';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Objective } from 'src/app/domain/game/objective';
import { CustomAbilityFactory } from 'src/app/domain/factories/customAbilityFactory';
import { CustomCommanderAbility } from 'src/app/domain/campaign/customCommanderAbility';

export class CustomAbilitySelectorData {
  abilities: CustomCommanderAbility[] = [];
  currentExperience: number = 0;
  currentTiers: number = 0;
  isFreeSelection: boolean = false;
}

@Component({
  selector: 'flagship-custom-ability-selector',
  templateUrl: './custom-ability-selector.component.html',
  styleUrls: ['./custom-ability-selector.component.scss']
})
export class CustomAbilitySelectorComponent implements OnInit {

  private abilityFactory = new CustomAbilityFactory();
  public abilities: CustomCommanderAbility[] = [];

  constructor(public dialogRef: MatDialogRef<CustomAbilitySelectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CustomAbilitySelectorData) { }

  ngOnInit() {
    this.abilities = this.abilityFactory
      .getAbilities()
      .filter(this.abilityFilter())
      .sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      })
  }

  private abilityFilter(): (value: CustomCommanderAbility, index: number, array: CustomCommanderAbility[]) => boolean {
    return x => {
      if (this.data.currentTiers + x.tier > 4)
        return false;
      if (x.prerequisiteId)
        return false; // Upgrades are not doen with this dialog
      if (this.data.isFreeSelection) {
        if (x.tier > 1)
          return false;
      }
      else {
        if (this.data.abilities.find(a => a.id === x.id))
          return false;
        if (this.data.currentExperience - x.xpCost < 0)
          return false;
      }
      return true;
    };
  }

  selectAbility(ability: CustomCommanderAbility) {
    this.dialogRef.close(ability);
  }

}
