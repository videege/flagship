import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { AdditionModification } from '../domain/statistics/additions/additionModification';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'flagship-addition-modification',
  templateUrl: './addition-modification.component.html',
  styleUrls: ['./addition-modification.component.css']
})
export class AdditionModificationComponent implements OnInit {

  @Input() modification: AdditionModification;
  @Output() change = new EventEmitter();

  
  constructor() { }

  ngOnInit() {
    
  }

  enabledToggled(event: MatSlideToggleChange) {
    this.modification.enabled = event.checked;
    this.change.emit(this.modification);
  }

}


