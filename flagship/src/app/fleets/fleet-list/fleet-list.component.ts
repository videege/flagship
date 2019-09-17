import { Component, OnInit } from '@angular/core';
import { FleetService } from '../../core/services/fleet.service';
import { Fleet } from '../../domain/fleet';
import { Faction } from '../../domain/faction';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FleetEditorData, FleetEditorComponent } from '../fleet-editor/fleet-editor.component';

@Component({
  selector: 'flagship-fleet-list',
  templateUrl: './fleet-list.component.html',
  styleUrls: ['./fleet-list.component.css']
})
export class FleetListComponent implements OnInit {
  faction = Faction;

  displayedColumns = ['faction', 'name', 'commander', 'points', 'actions'];

  constructor(private fleetService: FleetService, private dialog: MatDialog) {}

  public fleets: Fleet[];
  dataSource: MatTableDataSource<Fleet>;

  ngOnInit() {
    this.fleets = [];
    this.fleetService.getFleetsForUser().subscribe((fleets: Fleet[]) => {
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
          .then(() => {
            //this.dataSource = new MatTableDataSource<Fleet>(this.fleets);
            
          });
      }
    });
  }
}
