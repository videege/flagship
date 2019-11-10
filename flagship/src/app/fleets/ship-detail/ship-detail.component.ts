import { Component, OnInit, Input } from '@angular/core';
import { Ship } from '../../domain/ship';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Component({
  selector: 'flagship-ship-detail',
  templateUrl: './ship-detail.component.html',
  styleUrls: ['./ship-detail.component.scss']
})
export class ShipDetailComponent implements OnInit {
  isExtraSmall: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.XSmall);

  @Input() ship: Ship;
  isCampaign = false;

  constructor(public dialog: MatDialog, private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.isCampaign = !!this.ship.fleet.campaignId;
  }

  deleteShip() {
    this.ship.fleet.deleteShip(this.ship);
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
