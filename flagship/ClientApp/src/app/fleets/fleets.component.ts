import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { FleetService } from '../fleet.service';
import { Fleet } from '../domain/fleet';
import { Faction } from '../domain/faction';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'flagship-fleets',
  templateUrl: './fleets.component.html',
  styleUrls: ['./fleets.component.css']
})
export class FleetsComponent implements OnInit {
  faction = Faction;

  displayedColumns = ['faction', 'name', 'commander', 'points'];

  constructor(private breakpointObserver: BreakpointObserver,
    private fleetService: FleetService) {}

  public fleets: Fleet[];
  dataSource = new MatTableDataSource<Fleet>(this.fleets);

  ngOnInit() {
    this.fleets = this.fleetService.fleets;
    this.dataSource.data = this.fleets;
    //this.dataSource.
  }
}
