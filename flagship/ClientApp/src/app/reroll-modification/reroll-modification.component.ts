import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RerollModification } from '../domain/statistics/rerolls/rerollModification';

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

}
