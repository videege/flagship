import { Component, OnInit } from '@angular/core';
import { FleetService } from '../../core/services/fleet.service';
import { Fleet } from '../../domain/game/fleet';
import { Faction } from '../../domain/game/faction';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FleetEditorData, FleetEditorComponent } from '../fleet-editor/fleet-editor.component';
import { SettingsService } from 'src/app/core/services/settings.service';
import { UserSettings } from 'src/app/domain/settings/userSettings';
import { FleetImporterComponent } from '../fleet-importer/fleet-importer.component';
import { MatSnackBar } from '@angular/material';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'flagship-fleet-list',
  templateUrl: './fleet-list.component.html',
  styleUrls: ['./fleet-list.component.scss']
})
export class FleetListComponent implements OnInit {
  faction = Faction;

  private mobileColumns = ['faction', 'name', 'actions'];
  private fullColumns = ['faction', 'name', 'commander', 'points', 'campaign', 'actions'];
  displayedColumns: string[];
  settings: UserSettings;

  constructor(private fleetService: FleetService, private dialog: MatDialog,
    private settingsService: SettingsService, private snackbar: MatSnackBar,
    private breakpointObserver: BreakpointObserver) {
      this.displayedColumns = this.fullColumns;
      this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.displayedColumns = this.mobileColumns;
        }
        else {
          this.displayedColumns = this.fullColumns;
        }
      });
    }

  public fleets: Fleet[];
  dataSource: MatTableDataSource<Fleet>;

  ngOnInit() {
    this.fleets = [];
    this.fleetService.getFleetsForUser().subscribe((fleets: Fleet[]) => {
      this.fleets = fleets;
      this.dataSource = new MatTableDataSource<Fleet>(this.fleets
        .filter(f => {
          if (this.settings && !this.settings.displayCampaignFleets) {
            return !f.campaignId;
          }
          return true;
        }));
    });
    this.settingsService.settings$.subscribe(settings => {
      this.settings = settings;
      this.dataSource = new MatTableDataSource<Fleet>(this.fleets
        .filter(f => {
          if (this.settings && !this.settings.displayCampaignFleets) {
            return !f.campaignId;
          }
          return true;
        }));
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

  importFleet() {
    let ref = this.dialog.open(FleetImporterComponent, {
      width: '450px'
    }); 
    ref.afterClosed().subscribe((fleet: Fleet) => {
      if (fleet) {
        this.fleetService.importFleet(fleet).then(() => {
          this.snackbar.open('Fleet successfully imported.', 'OK', { duration: 1500 });
        });
      }
    });
  }
}
