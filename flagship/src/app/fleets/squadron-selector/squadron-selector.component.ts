import { Component, OnInit, Inject } from '@angular/core';
import { Fleet } from '../../domain/fleet';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SquadronFactory } from '../../domain/factories/squadronFactory';
import { SquadronData } from '../../domain/squadron';

export interface SquadronSelectorData {
  fleet: Fleet;
}
@Component({
  selector: 'flagship-squadron-selector',
  templateUrl: './squadron-selector.component.html',
  styleUrls: ['./squadron-selector.component.css']
})
export class SquadronSelectorComponent implements OnInit {

  private squadronFactory = new SquadronFactory();
  public squadrons: SquadronData[] = [];

  constructor(public dialogRef: MatDialogRef<SquadronSelectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SquadronSelectorData) { }

  ngOnInit() {
    this.squadrons = this.squadronFactory.getSquadrons(this.data.fleet.faction);

    // filter out unique squadrons that are already in the fleet
    let selectedUniques = this.data.fleet.getEquippedUniqueNames();
    this.squadrons = this.squadrons
        .filter(s => !s.unique || selectedUniques.indexOf(s.name) === -1)
        .sort((a, b) => { 
          if (a.name < b.name) return -1;
          else if (a.name > b.name) return 1;
          return 0;
        });
  }

  displayName(squadron: SquadronData): string {
    if (squadron.name !== squadron.shipName) {
      return `${squadron.name} (${squadron.shipName})`;
    } else {
      return squadron.name;
    }
  }

  selectSquadron(squadron: SquadronData) {
    let _squadron = this.squadronFactory.instantiateSquadron(squadron.id);
    this.dialogRef.close(_squadron);
  }
}
