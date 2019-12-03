import { Component, OnInit, Input } from '@angular/core';
import { Ship, IgnitionCapableShip, HugeShip, ShipClass } from '../../domain/game/ship';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Component({
  selector: 'flagship-ship-detail',
  templateUrl: './ship-detail.component.html',
  styleUrls: ['./ship-detail.component.scss']
})
export class ShipDetailComponent implements OnInit {
  isExtraSmall: Observable<BreakpointState>;

  @Input() ship: Ship|IgnitionCapableShip|HugeShip;
  hugeShip: HugeShip;
  ignitionShip: IgnitionCapableShip;
  isCampaign = false;

  constructor(public dialog: MatDialog, private breakpointObserver: BreakpointObserver) { 
    this.isExtraSmall = this.breakpointObserver.observe(Breakpoints.HandsetPortrait);
  }

  ngOnInit() {
    this.isCampaign = !!this.ship.fleet.campaignId;
    this.hugeShip = this.ship.shipClass === ShipClass.Huge ? <HugeShip>this.ship : null;
    this.ignitionShip = this.ship.shipClass === ShipClass.IgnitionCapable ? <IgnitionCapableShip>this.ship : null;
  }

  deleteShip() {
    this.ship.fleet.deleteShip(this.ship);
  }

  duplicateShip() {
    this.ship.fleet.duplicateShip(this.ship);
  }

  scar() {
    this.ship.setIsScarred(true);
  }
  
  unscar() {
    this.ship.setIsScarred(false);
  }

  promote() {
    this.ship.setIsVeteran(true);
  }

  demote() {
    this.ship.setIsVeteran(false);
  }
}
