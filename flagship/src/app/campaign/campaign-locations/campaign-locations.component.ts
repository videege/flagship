import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Campaign } from 'src/app/domain/campaign/campaign';
import { MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { CampaignLocation } from 'src/app/domain/campaign/campaignLocation';
import { Faction } from 'src/app/domain/faction';
import { LocationControlType } from 'src/app/domain/campaign/locationControlType';
import { ObjectiveFactory } from 'src/app/domain/factories/objectiveFactory';
import { StrategicEffectType, StrategicEffects } from 'src/app/domain/campaign/strategicEffectType';
import { CampaignLocationFactory } from 'src/app/domain/factories/campaignLocationFactory';
import { LocationControlDialogComponent, LocationControlDialogData } from '../location-control-dialog/location-control-dialog.component';
import { CampaignService } from 'src/app/core/services/campaign.service';



@Component({
  selector: 'flagship-campaign-locations',
  templateUrl: './campaign-locations.component.html',
  styleUrls: ['./campaign-locations.component.css']
})
export class CampaignLocationsComponent implements OnInit {
  @Input() campaign: Campaign;

  public campaigns: Campaign[];
  public factions = Faction;
  public controlTypes = LocationControlType;
  public objectiveFactory = new ObjectiveFactory();

  constructor(private campaignService: CampaignService,
    private snackbar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
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
        if (data.faction !== Faction.Empire && data.faction !== Faction.Rebels) {
          location.setUnoccupied();
        } else {
          if (data.controlType === LocationControlType.Presence) {
            location.setPresence(data.faction);
          } else {
            location.setBase(data.faction, data.chosenObjective);
          }
        }

        this.campaignService.updateCampaign(this.campaign).then(() => {
          this.snackbar.open(`${location.name} successfully updated.`, 'OK', {
            duration: 1500
          });
        });
      }
    });
  }
}
