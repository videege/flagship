import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { AdditionModification } from '../../domain/statistics/additions/additionModification';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DieType } from 'src/app/domain/statistics/dieRoll';

@Component({
  selector: 'flagship-addition-modification',
  templateUrl: './addition-modification.component.html',
  styleUrls: ['./addition-modification.component.scss']
})
export class AdditionModificationComponent implements OnInit {

  @Input() modification: AdditionModification;
  @Output() change = new EventEmitter();

  public types = DieType;
  public preferences: DieType[][] = [
    [ DieType.Black, DieType.Blue, DieType.Red ],
    [ DieType.Black, DieType.Red, DieType.Blue ],
    [ DieType.Blue, DieType.Red, DieType.Black ],
    [ DieType.Blue, DieType.Black, DieType.Red ],
    [ DieType.Red, DieType.Blue, DieType.Black ],
    [ DieType.Red, DieType.Black, DieType.Blue ],
  ];
  public selectedPreference: DieType[] = this.preferences[0];
  
  constructor() { }

  ngOnInit() {
    
  }

  enabledToggled(event: MatSlideToggleChange) {
    this.modification.enabled = event.checked;
    this.change.emit(this.modification);
  }

  preferenceChanged() {
    this.modification.preferredTypes = this.selectedPreference;
    this.change.emit(this.modification);
  }

  dieCountChanged() {
    this.change.emit(this.modification);
  }
}


