import { Component, OnInit, Input } from '@angular/core';
import { Ship } from '../domain/ship';
import { MatDialog } from '@angular/material';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DieModificationFactory } from '../domain/statistics/factories/dieModificationFactory';
import { IDieModification } from '../domain/statistics/dieModification';

@Component({
  selector: 'flagship-ship-statistics',
  templateUrl: './ship-statistics.component.html',
  styleUrls: ['./ship-statistics.component.css']
})
export class ShipStatisticsComponent implements OnInit {
  @Input() ship: Ship;

  private modificationFactory: DieModificationFactory = new DieModificationFactory();
  public modifications: IDieModification[] = [];

  constructor(public dialog: MatDialog, private breakpointObserver: BreakpointObserver) {

  }

  ngOnInit() {
    this.modifications = this.modificationFactory.getModificationsForShip(this.ship);
    
  }

}
