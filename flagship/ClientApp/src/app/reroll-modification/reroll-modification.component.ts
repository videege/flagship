import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RerollModification } from '../domain/statistics/rerolls/rerollModification';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'flagship-reroll-modification',
  templateUrl: './reroll-modification.component.html',
  styleUrls: ['./reroll-modification.component.css']
})
export class RerollModificationComponent implements OnInit {
  @Input() modification: RerollModification;
  @Output() change = new EventEmitter();
  constructor() { }

  ngOnInit() {
    
  }

  enabledToggled(event: MatSlideToggleChange) {
    this.modification.enabled = event.checked;
    this.change.emit(this.modification);
  }

}
