import { Component, OnInit } from '@angular/core';
import { FleetService } from '../../core/services/fleet.service';
import { Fleet } from '../../domain/fleet';
import { Faction } from '../../domain/faction';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FleetEditorData, FleetEditorComponent } from '../fleet-editor/fleet-editor.component';
import { SettingsService } from 'src/app/core/services/settings.service';
import { UserSettings } from 'src/app/domain/settings/userSettings';

@Component({
  selector: 'flagship-fleet-list',
  templateUrl: './fleet-list.component.html',
  styleUrls: ['./fleet-list.component.scss']
})
export class FleetListComponent implements OnInit {
  faction = Faction;

  displayedColumns = ['faction', 'name', 'commander', 'points', 'actions'];
  settings: UserSettings;

  constructor(private fleetService: FleetService, private dialog: MatDialog,
    private settingsService: SettingsService) {}

  public fleets: Fleet[];
  dataSource: MatTableDataSource<Fleet>;

  ngOnInit() {
    this.fleets = [];
    this.fleetService.getFleetsForUser().subscribe((fleets: Fleet[]) => {
      this.fleets = fleets;
      this.dataSource = new MatTableDataSource<Fleet>(this.fleets);
    });
    this.settingsService.settings$.subscribe(settings => {
      this.settings = settings;
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
      data: FleetEditorData.newFleet(this.settings)
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
