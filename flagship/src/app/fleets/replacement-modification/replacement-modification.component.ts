import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReplacementModification } from 'src/app/domain/statistics/replacements/replacementModification';
import { DieType } from 'src/app/domain/statistics/dieRoll';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'flagship-replacement-modification',
  templateUrl: './replacement-modification.component.html',
  styleUrls: ['./replacement-modification.component.scss']
})
export class ReplacementModificationComponent implements OnInit {

  @Input() modification: ReplacementModification;
  @Output() change = new EventEmitter();

  public types = DieType;
  public preferences: DieType[] = [
    DieType.Black,
    DieType.Blue,
    DieType.Red
  ];
  public selectedPreference: DieType = this.preferences[0];
  
  constructor() { }

  ngOnInit() {
    
  }

  enabledToggled(event: MatSlideToggleChange) {
    this.modification.enabled = event.checked;
    this.change.emit(this.modification);
  }

  preferenceChanged() {
    this.modification.preferredType = this.selectedPreference;
    this.change.emit(this.modification);
  }
}
