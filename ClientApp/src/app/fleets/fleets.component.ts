import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { FleetService } from '../fleet.service';
import { Fleet } from '../domain/fleet';
import { Faction } from '../domain/faction';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { FleetEditorData, FleetEditorComponent } from '../fleet-editor/fleet-editor.component';

@Component({
  selector: 'flagship-fleets',
  templateUrl: './fleets.component.html',
  styleUrls: ['./fleets.component.css']
})
export class FleetsComponent implements OnInit {
  faction = Faction;

  displayedColumns = ['faction', 'name', 'commander', 'points', 'actions'];

  constructor(private breakpointObserver: BreakpointObserver,
    private fleetService: FleetService, private dialog: MatDialog) {}

  public fleets: Fleet[];
  dataSource: MatTableDataSource<Fleet>;

  ngOnInit() {
    this.fleets = [];
    this.fleetService.fleets$.subscribe((fleets: Fleet[]) => {
      this.fleets = fleets;
      this.dataSource = new MatTableDataSource<Fleet>(this.fleets);
    });
    this.fleetService.getFleets().subscribe((fleets: Fleet[]) => {
      this.fleets = fleets;
      this.dataSource = new MatTableDataSource<Fleet>(this.fleets);
    });
  }

  editFleet(fleet: Fleet) {
    let ref = this.dialog.open(FleetEditorComponent, {
      width: '450px',
      data: FleetEditorData.fromFleet(fleet)
    }); 
    ref.afterClosed().subscribe((data: FleetEditorData) => {
      if (data) {
        fleet.name = data.name;
        fleet.author = data.author;
        fleet.pointLimit = data.pointLimit;
        fleet.squadronPointLimit = data.squadronPointLimit;
        
      }
    });
  }

  addFleet() {
    let ref = this.dialog.open(FleetEditorComponent, {
      width: '450px',
      data: FleetEditorData.newFleet()
    }); 
    ref.afterClosed().subscribe((data: FleetEditorData) => {
      if (data) {
        this.fleetService.createFleet(data.name, data.author,
          data.faction, data.pointLimit, data.squadronPointLimit)
          .subscribe((f: Fleet) => {
            this.dataSource = new MatTableDataSource<Fleet>(this.fleets);
            
          });
      }
    });
  }
}
