import { Component, OnInit } from '@angular/core';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Campaign } from 'src/app/domain/campaign/campaign';
import { CampaignEditorComponent, CampaignEditorData } from '../campaign-editor/campaign-editor.component';
import { CampaignType } from 'src/app/domain/campaign/campaignType';
import { ConfirmDialogComponent, ConfirmDialogData } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { FleetService } from 'src/app/core/services/fleet.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { forkJoin, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CampaignEra } from 'src/app/domain/campaign/campaignEra';

@Component({
  selector: 'flagship-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.scss']
})
export class CampaignListComponent implements OnInit {

  displayedColumns = ['name', 'type', 'turn', 'players', 'actions'];

  public campaigns: Campaign[];
  public dataSource: MatTableDataSource<Campaign>;
  user: firebase.User;

  constructor(private campaignService: CampaignService,
    private fleetService: FleetService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private afAuth: AngularFireAuth) {
    this.afAuth.user.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
    this.campaigns = [];
    this.campaignService.getCampaignsForUser().subscribe((campaigns: Campaign[]) => {
      this.campaigns = campaigns;
      this.dataSource = new MatTableDataSource<Campaign>(this.campaigns);
    });
  }

  deleteCampaign(campaign: Campaign) {
    let ref = this.dialog.open(ConfirmDialogComponent, {
      data: ConfirmDialogData.warn('Are you sure you want to delete this campaign and all associated fleets? This action cannot be undone.',
        'Delete Campaign', 'Cancel')
    });
    ref.afterClosed().subscribe((confirmed: boolean) => {
      if (!confirmed) return;

      let players = campaign.getPlayers();
      let fleetDeletions = players.length
        ? players.map(x => this.fleetService.deleteFleetById(x.fleetId))
        : [of(null)];
      forkJoin(fleetDeletions).subscribe(() => {
        this.campaignService.deleteCampaign(campaign).then(() => {
          this.snackbar.open(`${campaign.name} deleted.`, 'OK', { duration: 1500 });
        });
      });
    });
  }

  newCampaign() {
    let ref = this.dialog.open(CampaignEditorComponent, {
      width: '450px',
      data: <CampaignEditorData>{
        name: null,
        type: CampaignType.RITR,
        era: CampaignEra.CivilWar
      }
    });
    ref.afterClosed().subscribe((data: CampaignEditorData) => {
      if (data) {
        this.campaignService.createCampaign(data.name, data.type, data.era)
          .then(() => {
            this.snackbar.open(`${data.name} created.`, 'OK', { duration: 1500 });
          });
      }
    });
  }

}
