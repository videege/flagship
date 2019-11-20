import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Campaign } from 'src/app/domain/campaign/campaign';
import { MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { CampaignLocation } from 'src/app/domain/campaign/campaignLocation';
import { Faction } from 'src/app/domain/game/faction';
import { LocationControlType } from 'src/app/domain/campaign/locationControlType';
import { ObjectiveFactory } from 'src/app/domain/factories/objectiveFactory';
import { StrategicEffectType, StrategicEffects } from 'src/app/domain/campaign/strategicEffectType';
import { CampaignLocationFactory } from 'src/app/domain/factories/campaignLocationFactory';
import { LocationControlDialogComponent, LocationControlDialogData } from '../location-control-dialog/location-control-dialog.component';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { CampaignEvent, CampaignEventType } from 'src/app/domain/campaign/campaignEvent';
import { AngularFireAuth } from '@angular/fire/auth';
import { Phase } from 'src/app/domain/campaign/phase';



@Component({
  selector: 'flagship-campaign-locations',
  templateUrl: './campaign-locations.component.html',
  styleUrls: ['./campaign-locations.component.scss']
})
export class CampaignLocationsComponent implements OnInit, OnChanges {

  @Input() campaign: Campaign;

  public campaigns: Campaign[];
  public factions = Faction;
  public controlTypes = LocationControlType;
  public objectiveFactory = new ObjectiveFactory();
  public canModify = false;
  public viewableFactions: Faction[] = [];
  user: firebase.User;

  constructor(private campaignService: CampaignService,
    private snackbar: MatSnackBar, private dialog: MatDialog,
    private afAuth: AngularFireAuth) {

  }

  ngOnInit() {
    this.afAuth.user.subscribe(user => {
      this.user = user;
      this.setup();
    });
    this.setup();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setup();
  }

  private setup() {
    this.canModify = this.campaign.currentState().phase !== Phase.Finished;
    if (this.user)
      this.viewableFactions = this.campaign.getPlayers().filter(p => p.playerUid == this.user.uid)
        .map(p => this.campaign.getFactionOfPlayer(p.id));
  }



  public getObjectiveNames(objectives: number[]): string {
    if (!objectives) return 'None';

    return this.objectiveFactory.getObjectiveNamesForIds(objectives).join(', ');
  }

  public getStrategicEffects(effects: StrategicEffectType[]): string {
    if (!effects) return 'None';

    return effects.map(x => StrategicEffects.effectName(x)).join(', ');
  }

  public setLocationControl(location: CampaignLocation) {
    let ref = this.dialog.open(LocationControlDialogComponent, {
      width: '450px',
      data: new LocationControlDialogData(location)
    });
    ref.afterClosed().subscribe((data: LocationControlDialogData) => {
      if (data) {
        let change = null;
        if (data.faction !== Faction.Empire && data.faction !== Faction.Rebels) {
          if (location.controllingFaction != null) {
            location.setUnoccupied();
            change = 'unoccupied';
          }
        } else {
          if (data.controlType === LocationControlType.Presence) {
            if (location.controllingFaction != data.faction ||
              location.controlType != LocationControlType.Presence) {
              location.setPresence(data.faction);
              change = `${data.faction === Faction.Empire ? "Imperial presence" : "Rebel presence"}`;
            }
          } else {
            if (location.controllingFaction != data.faction ||
              location.controlType != LocationControlType.Base ||
              location.chosenObjective != data.chosenObjective) {
              location.setBase(data.faction, data.chosenObjective);
              change = `${data.faction === Faction.Empire ? "Imperial base" : "Rebel base"}`;
            }
          }
        }
        if (change == null)
          return;

        this.campaign.addEvent(new CampaignEvent(CampaignEventType.ManualLocationChange,
          `${location.name} was set to ${change}.`,
          this.user.uid));
        this.campaignService.updateCampaign(this.campaign).then(() => {
          this.snackbar.open(`${location.name} successfully updated.`, 'OK', {
            duration: 1500
          });
        });
      }
    });
  }
}
