import { Component, OnInit, Input } from '@angular/core';
import { Fleet } from '../../domain/game/fleet';
import { ShipSelectorComponent, ShipSelectorData } from '../ship-selector/ship-selector.component';
import { MatDialog } from '@angular/material/dialog';
import { Ship } from '../../domain/game/ship';
import { ActivatedRoute, Router } from '@angular/router';
import { FleetService } from 'src/app/core/services/fleet.service';
import { MatSnackBar } from '@angular/material';
import { ConfirmDialogComponent, ConfirmDialogData } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'flagship-fleet-toolbar',
  templateUrl: './fleet-toolbar.component.html',
  styleUrls: ['./fleet-toolbar.component.scss']
})
export class FleetToolbarComponent implements OnInit {

  public fleet: Fleet;

  showEditButtons = true;

  constructor(private dialog: MatDialog, private route: ActivatedRoute,
    private fleetService: FleetService, private router: Router,
    private snackbar: MatSnackBar) {
   
  }

  ngOnInit() {
    this.fleet = this.route.snapshot.data.fleet;
  }

  clone() {
    this.fleetService.cloneFleet(this.fleet).then((clonedFleet: Fleet) => {
      this.snackbar.open('Successfully copied fleet.', 'OK', { duration: 1500 });
      this.router.navigate(['fleets']);
    });
  }

  delete() {
    let ref = this.dialog.open(ConfirmDialogComponent, {
      data: ConfirmDialogData.warn('Are you sure you want to delete this fleet? This action cannot be undone.',
        'Delete Fleet', 'Cancel')
    });
    ref.afterClosed().subscribe((confirmed: boolean) => { 
      if (!confirmed) return;

      this.fleetService.deleteFleetById(this.fleet.id).then(() => {
        this.snackbar.open(`Successfully deleted fleet '${this.fleet.name}'.`, 'OK', { duration: 1500 });
        this.router.navigate(['fleets']);
      })
    });
  }
}
