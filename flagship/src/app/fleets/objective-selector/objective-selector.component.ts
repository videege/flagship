import { Component, OnInit, Inject } from '@angular/core';
import { Fleet } from '../../domain/game/fleet';
import { ObjectiveType, Objective } from '../../domain/game/objective';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ObjectiveFactory } from '../../domain/factories/objectiveFactory';

export interface ObjectiveSelectorData {
  fleet: Fleet;
  type: ObjectiveType;
}

@Component({
  selector: 'flagship-objective-selector',
  templateUrl: './objective-selector.component.html',
  styleUrls: ['./objective-selector.component.scss']
})
export class ObjectiveSelectorComponent implements OnInit {

  public objectives: Objective[];
  private objectiveFactory: ObjectiveFactory = new ObjectiveFactory();

  constructor(public dialogRef: MatDialogRef<ObjectiveSelectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ObjectiveSelectorData) { }

  ngOnInit() {
    this.objectives = this.objectiveFactory
      .getObjectives(this.data.type)
      .sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      })
  }

  selectObjective(objective: Objective) {
    this.dialogRef.close(objective);
  }
}
