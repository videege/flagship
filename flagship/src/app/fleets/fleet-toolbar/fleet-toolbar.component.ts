import { Component, OnInit, Input } from '@angular/core';
import { Fleet } from '../../domain/fleet';
import { ShipSelectorComponent, ShipSelectorData } from '../ship-selector/ship-selector.component';
import { MatDialog } from '@angular/material/dialog';
import { Ship } from '../../domain/ship';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'flagship-fleet-toolbar',
  templateUrl: './fleet-toolbar.component.html',
  styleUrls: ['./fleet-toolbar.component.scss']
})
export class FleetToolbarComponent implements OnInit {

  public fleet: Fleet;

  showEditButtons = true;

  constructor(private dialog: MatDialog, private route: ActivatedRoute) {
    // this.transitionService.onEnter({ entering: 'fleets.fleet.ship' },
    //   (t, s) => {
    //     this.showEditButtons = false;
    //   });
    // this.transitionService.onExit({ exiting: 'fleets.fleet.ship' },
    //   (t, s) => {
    //     this.showEditButtons = true;
    //   });
    // this.transitionService.onEnter({ entering: 'fleets.fleet.ship.statistics' },
    //   (t, s) => {
    //     this.showEditButtons = false;
    //   });
    // this.transitionService.onExit({ exiting: 'fleets.fleet.ship.statistics' },
    //   (t, s) => {
    //     this.showEditButtons = true;
    //   });
  }

  ngOnInit() {
    this.fleet = this.route.snapshot.data.fleet;
    // if (this.stateService.current.name!.includes('fleets.fleet.ship')) {
    //   this.showEditButtons = false;
    // }
  }

  navToFleet() {
    //this.stateService.go('fleets.fleet', { id: this.fleet.id });
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
