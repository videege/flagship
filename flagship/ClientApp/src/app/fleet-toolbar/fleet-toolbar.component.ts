import { Component, OnInit, Input } from '@angular/core';
import { Fleet } from '../domain/fleet';
import { ShipSelectorComponent, ShipSelectorData } from '../ship-selector/ship-selector.component';
import { MatDialog } from '@angular/material';
import { Ship } from '../domain/ship';

@Component({
  selector: 'flagship-fleet-toolbar',
  templateUrl: './fleet-toolbar.component.html',
  styleUrls: ['./fleet-toolbar.component.css']
})
export class FleetToolbarComponent implements OnInit {

  @Input() fleet: Fleet;
  constructor(private dialog: MatDialog) { }

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
}
