import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material';
import { SW7Modification } from 'src/app/domain/statistics/special/sw7';

@Component({
  selector: 'flagship-special-modification',
  templateUrl: './special-modification.component.html',
  styleUrls: ['./special-modification.component.scss']
})
export class SpecialModificationComponent implements OnInit {
  
  @Input() modification: SW7Modification;
  @Output() change = new EventEmitter();

  constructor() { }

  ngOnInit() {
    
  }

  enabledToggled(event: MatSlideToggleChange) {
    this.modification.enabled = event.checked;
    this.change.emit(this.modification);
  }

}
