import { Component, OnInit, Input } from '@angular/core';
import { Fleet } from '../domain/fleet';
import { Ship } from '../domain/ship';
import { ShipFactory } from '../domain/factories/shipFactory';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { UpgradeFactory } from '../domain/factories/upgradeFactory';
import { ShipSelectorComponent, ShipSelectorData } from '../ship-selector/ship-selector.component';
import { MatDialog } from '@angular/material';
import { Squadron } from '../domain/squadron';

@Component({
  selector: 'flagship-fleet',
  templateUrl: './fleet.component.html',
  styleUrls: ['./fleet.component.css']
})
export class FleetComponent implements OnInit {

  @Input() fleet: Fleet;

  private shipFactory: ShipFactory = new ShipFactory();
  private upgradeFactory: UpgradeFactory = new UpgradeFactory();

  public colSpan = 1;

  constructor(private breakpointObserver: BreakpointObserver, private dialog: MatDialog) {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.colSpan = 2;
        }
        else {
          this.colSpan = 1;
        }
      });
  }

  ngOnInit() {

  }

  addShip() {
    let ref = this.dialog.open(ShipSelectorComponent, {
      width: '350px',
      data: <ShipSelectorData>{ fleet: this.fleet }
    });
    ref.afterClosed().subscribe((ship: Ship) => {
      if (ship)
        this.fleet.addShip(ship);
    });
  }

  addSquadron() {
    let ref = this.dialog.open(SquadronSelectorComponent, {
      width: '350px',
      data: <SquadronSelectorData>{ fleet: this.fleet }
    });
    ref.afterClosed().subscribe((squadron: Squadron) => {
      if (squadron)
        this.fleet.addSquadron(squadron);
    });
  }
}
