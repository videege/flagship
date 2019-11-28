import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GenericModification, FaceRestriction } from 'src/app/domain/statistics/modifications/genericModification';
import { DieType } from 'src/app/domain/statistics/dieRoll';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'flagship-change-modification',
  templateUrl: './change-modification.component.html',
  styleUrls: ['./change-modification.component.scss']
})
export class ChangeModificationComponent implements OnInit {

  @Input() modification: GenericModification;
  @Output() change = new EventEmitter();

  constructor() { }

  public types = DieType;
  public faces = FaceRestriction;
  public preferences: DieType[][] = [
    [DieType.Black, DieType.Blue, DieType.Red],
    [DieType.Black, DieType.Red, DieType.Blue],
    [DieType.Blue, DieType.Red, DieType.Black],
    [DieType.Blue, DieType.Black, DieType.Red],
    [DieType.Red, DieType.Blue, DieType.Black],
    [DieType.Red, DieType.Black, DieType.Blue],
  ];
  public canHaveColorPreference = true;

  ngOnInit() {
    if (this.modification.sourceColorRestriction !== DieType.Any) {
      this.canHaveColorPreference = false;
    } else {
      for (const preference of this.preferences) {
        if (preference[0] === this.modification.sourceColorPreference[0] &&
          preference[1] === this.modification.sourceColorPreference[1] &&
          preference[2] === this.modification.sourceColorPreference[2]) {
          this.modification.sourceColorPreference = preference;
          break;
        }
      }
    }
  }

  enabledToggled(event: MatSlideToggleChange) {
    this.modification.enabled = event.checked;
    this.change.emit(this.modification);
  }

  preferenceChanged() {
    this.change.emit(this.modification);
  }

}
