import { Component, OnInit, Input } from '@angular/core';
import { IDieModification } from '../../domain/statistics/dieModification';

@Component({
  selector: 'flagship-methodology',
  templateUrl: './methodology.component.html',
  styleUrls: ['./methodology.component.scss']
})
export class MethodologyComponent implements OnInit {
  @Input() modifications: IDieModification[];

  constructor() { }

  ngOnInit() {

  }

  hasEffect(name: string): boolean {
    return this.modifications.find(m => m.name === name) != null;
  }

  hasAdditionalNotes(): boolean {
    return this.modifications.filter(m => {
      return m.name === "Leading Shots";
    }).length > 0; 
  }
}
