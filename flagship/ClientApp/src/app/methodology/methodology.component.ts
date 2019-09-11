import { Component, OnInit, Input } from '@angular/core';
import { IDieModification } from '../domain/statistics/dieModification';

@Component({
  selector: 'flagship-methodology',
  templateUrl: './methodology.component.html',
  styleUrls: ['./methodology.component.css']
})
export class MethodologyComponent implements OnInit {
  @Input() modifications: IDieModification[];

  constructor() { }

  ngOnInit() {
  }

  hasAdditionalNotes(): boolean {
    return true; 
  }
}
