import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Campaign } from 'src/app/domain/campaign/campaign';
import { MatTableDataSource } from '@angular/material';
import { CampaignLocation } from 'src/app/domain/campaign/campaignLocation';
import { Faction } from 'src/app/domain/faction';
import { LocationControlType } from 'src/app/domain/campaign/locationControlType';
import { ObjectiveFactory } from 'src/app/domain/factories/objectiveFactory';
import { StrategicEffectType, StrategicEffects } from 'src/app/domain/campaign/strategicEffectType';
import { CampaignLocationFactory } from 'src/app/domain/factories/campaignLocationFactory';



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

  constructor() { }

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
    
  }
}
