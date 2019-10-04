import { Component, OnInit, Input } from '@angular/core';
import { Campaign } from 'src/app/domain/campaign/campaign';
import { MatTableDataSource } from '@angular/material';
import { CampaignLocation } from 'src/app/domain/campaign/campaignLocation';
import { DataSource } from '@angular/cdk/table';
import { Faction } from 'src/app/domain/faction';
import { LocationControlType } from 'src/app/domain/campaign/locationControlType';
import { ObjectiveFactory } from 'src/app/domain/factories/objectiveFactory';



@Component({
  selector: 'flagship-campaign-locations',
  templateUrl: './campaign-locations.component.html',
  styleUrls: ['./campaign-locations.component.css']
})
export class CampaignLocationsComponent implements OnInit {
  @Input() campaign: Campaign;

  displayedColumns = ['name', 'faction', 'controlType', 'objectives', 'effects', 'points'];
  
  public campaigns: Campaign[];
  public dataSource: MatTableDataSource<CampaignLocation>;
  public factions =  Faction;
  public controlTypes = LocationControlType;
  public objectiveFactory = new ObjectiveFactory();
  
  constructor() { }

  ngOnInit() {
    this.setDataSource();
  }

  public getObjectiveNames(objectives: number[]): string {
    return this.objectiveFactory.getObjectiveNamesForIds(objectives).join(', ');
  }

  public getStrategicEffects(effects: number[]): string {
    return "TODO";
  }

  private setDataSource() {
    this.dataSource = new MatTableDataSource<CampaignLocation>(this.campaign.locations);
  }

}
