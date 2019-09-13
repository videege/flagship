import { Component, OnInit, Input, Output } from '@angular/core';
import { Objective, ObjectiveType } from '../domain/objective';
import { ObjectiveSelectorData, ObjectiveSelectorComponent } from '../objective-selector/objective-selector.component';
import { Fleet } from '../domain/fleet';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'flagship-objective',
  templateUrl: './objective.component.html',
  styleUrls: ['./objective.component.css']
})
export class ObjectiveComponent implements OnInit {

  @Input() objective: Objective;
  //@Output() objectiveChange = new EventEmitt
  @Input() type: ObjectiveType;
  @Input() fleet: Fleet;
  public objType = ObjectiveType;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  selectObjective() {
    let ref = this.dialog.open(ObjectiveSelectorComponent, {
      width: '500px',
      data: <ObjectiveSelectorData>{ fleet: this.fleet, type: this.type }
    });
    ref.afterClosed().subscribe((objective: Objective) => {
      if (objective)
        this.fleet.setObjective(objective);
    }); 
  }

  removeObjective() {
    if (this.objective) {
      this.fleet.removeObjective(this.objective);
    }
  }
}
