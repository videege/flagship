import { Component, OnInit, ViewChild } from '@angular/core';
import { FleetService } from '../../core/services/fleet.service';
import { Fleet } from '../../domain/game/fleet';
import { Faction } from '../../domain/game/faction';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FleetEditorData, FleetEditorComponent } from '../fleet-editor/fleet-editor.component';
import { SettingsService } from 'src/app/core/services/settings.service';
import { UserSettings } from 'src/app/domain/settings/userSettings';
import { FleetImporterComponent } from '../fleet-importer/fleet-importer.component';
import { MatSnackBar, MatSort, MatSortable } from '@angular/material';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'flagship-fleet-list',
  templateUrl: './fleet-list.component.html',
  styleUrls: ['./fleet-list.component.scss']
})
export class FleetListComponent implements OnInit {
  faction = Faction;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  private mobileColumns = ['faction', 'name', 'actions'];
  private fullColumns = ['faction', 'name', 'commander', 'points', 'campaign', 'actions'];
  displayedColumns: string[];
  settings: UserSettings;

  user: firebase.User;

  constructor(private fleetService: FleetService, private dialog: MatDialog,
    private settingsService: SettingsService, private snackbar: MatSnackBar,
    private breakpointObserver: BreakpointObserver, private afAuth: AngularFireAuth) {
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
    this.afAuth.user.subscribe((user) => {
      this.user = user;
    })
  }

  public fleets: Fleet[];
  dataSource: MatTableDataSource<Fleet>;

  ngOnInit() {
    this.fleets = [];

    this.fleetService.getFleetsForUser().subscribe((fleets: Fleet[]) => {
      this.fleets = fleets;
      this.initializeDataSource();
      this.sort.sort({ id: 'name', start: 'asc' } as MatSortable)
    });
    this.settingsService.settings$.subscribe(settings => {
      this.settings = settings;
      this.initializeDataSource();
    });
  }

  private initializeDataSource() {
    this.dataSource = new MatTableDataSource<Fleet>(this.fleets
      .filter(f => {
        if (this.settings && !this.settings.displayCampaignFleets) {
          return !f.campaignId;
        }
        return true;
      }));
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (fleet: Fleet, property: string) => {
      switch (property) {
        case 'faction':
          return fleet.faction;
        case 'name':
          return fleet.name.toLowerCase();
        case 'commander':
          return fleet.getCommanderName();
        case 'points':
          return fleet.currentPoints();
        case 'campaign':
          return fleet.hasCustomCommander() ? 1 : 0;
        default:
          break;
      }
    }
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
        this.fleetService.updateFleet(fleet).then(() => {
          this.snackbar.open(`${fleet.name} updated.`, 'OK', { duration: 1500 });
        }, (error) => {
          this.snackbar.open(`Sorry, something went wrong. Please try again later.`, 'OK', { duration: 3500 });
        })
      }
    });
  }

  addFleet() {
    let ref = this.dialog.open(FleetEditorComponent, {
      width: '450px',
      data: FleetEditorData.newFleet(this.settings, this.user ? this.user.displayName : 'Unknown')
    });
    ref.afterClosed().subscribe((data: FleetEditorData) => {
      if (data) {
        this.fleetService.createFleet(data.name, data.author,
          data.faction, data.pointLimit, data.squadronPointLimit)
          .then(() => {
            this.snackbar.open(`${data.name} created.`, 'OK', { duration: 1500 });
          }, (error) => {
            this.snackbar.open(`Sorry, something went wrong. Please try again later.`, 'OK', { duration: 3500 });
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
        }, (error) => {
          this.snackbar.open(`Sorry, something went wrong. Please try again later.`, 'OK', { duration: 3500 });
        });
      }
    });
  }
}
