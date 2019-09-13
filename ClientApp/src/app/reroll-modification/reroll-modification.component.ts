import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RerollModification } from '../domain/statistics/rerolls/rerollModification';
import { MatSlideToggleChange } from '@angular/material';
import { RerollStrategy } from '../domain/statistics/rerolls/rerollStrategy';

@Component({
  selector: 'flagship-reroll-modification',
  templateUrl: './reroll-modification.component.html',
  styleUrls: ['./reroll-modification.component.css']
})
export class RerollModificationComponent implements OnInit {
  @Input() modification: RerollModification;
  @Output() change = new EventEmitter();
  @Output() reorder = new EventEmitter();

  public blanks: boolean;
  public accuracies: boolean;
  public hits: boolean;
  public blackHits: boolean;
  constructor() { }

  ngOnInit() {
    this.blanks = (this.modification.strategy & RerollStrategy.Blanks) === RerollStrategy.Blanks;
    this.accuracies = (this.modification.strategy & RerollStrategy.Accuracies) === RerollStrategy.Accuracies;
    this.hits = (this.modification.strategy & RerollStrategy.Hits) === RerollStrategy.Hits;
    this.blackHits = (this.modification.strategy & RerollStrategy.BlackHits) === RerollStrategy.BlackHits;
  }

  enabledToggled(event: MatSlideToggleChange) {
    this.modification.enabled = event.checked;
    this.change.emit(this.modification);
  }

  strategyChanged() {
    this.modification.strategy = (this.blanks ? RerollStrategy.Blanks : 0) |
      (this.accuracies ? RerollStrategy.Accuracies : 0) |
      (this.hits ? RerollStrategy.Hits : 0) |
      (this.blackHits ? RerollStrategy.BlackHits : 0);
    this.change.emit(this.modification);
  }
}
