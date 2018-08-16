import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { FleetService } from '../fleet.service';
import { Fleet } from '../domain/fleet';
import { Faction } from '../domain/faction';

@Component({
  selector: 'flagship-fleets',
  templateUrl: './fleets.component.html',
  styleUrls: ['./fleets.component.css']
})
export class FleetsComponent {
  faction = Faction;

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return this.fleets.map((f: Fleet) => { return { fleet: f, cols: 2, rows: 1}; });
      }
      return this.fleets.map((f: Fleet) => { return { fleet: f, cols: 1, rows: 1}; });
      
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,
    private fleetService: FleetService) {}

  public fleets: Fleet[];

  ngOnInit() {
    this.fleets = this.fleetService.fleets;
  }
}
