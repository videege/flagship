import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Campaign } from 'src/app/domain/campaign/campaign';
import { indeterminateOptions } from 'src/app/shared/utils/progressButtonConfigs';
import { ObjectiveFactory } from 'src/app/domain/factories/objectiveFactory';
import { CampaignState } from 'src/app/domain/campaign/campaignState';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { FleetService } from 'src/app/core/services/fleet.service';
import { PivotalObjective } from 'src/app/domain/campaign/pivotalObjective';
import { CampaignLocation } from 'src/app/domain/campaign/campaignLocation';
import { Faction, oppositeFaction } from 'src/app/domain/faction';
import { Phase } from 'src/app/domain/campaign/phase';
import { LocationControlType } from 'src/app/domain/campaign/locationControlType';
import { Issue, IssueSeverity } from 'src/app/domain/campaign/issue';

class Outcome {
  constructor(public faction: Faction) {

  }

  fleetPoints: number;
  score: number;
  campaignPoints: number = 0;

}


@Component({
  selector: 'flagship-pivotal-battle-phase',
  templateUrl: './pivotal-battle-phase.component.html',
  styleUrls: ['./pivotal-battle-phase.component.css']
})
export class PivotalBattlePhaseComponent implements OnInit {
  @Input() campaign: Campaign;
  @Output() validityChange = new EventEmitter<boolean>();
  @Output() phaseComplete = new EventEmitter<void>();

  factions = Faction;

  completeButtonOptions = indeterminateOptions('Finish Pivotal Battle');
  isClimactic = false;
  label = 'Pivotal';
  objectiveFactory = new ObjectiveFactory();
  currentState: CampaignState;
  pivotalObjective: PivotalObjective = null;
  pivotalObjectives = [
    PivotalObjective.Conquest,
    PivotalObjective.DemonstrationOfForce,
    PivotalObjective.Evacuation
  ];
  location: CampaignLocation;
  eligibleLocations: CampaignLocation[] = [];
  declaringFaction: Faction;
  attackerResult: Outcome;
  defenderResult: Outcome;

  issues: Issue[] = [];

  constructor(private campaignService: CampaignService,
    private fleetService: FleetService) { }

  ngOnInit() {
    this.setup()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.currentState && changes.campaign.currentValue.currentState().turn !== this.currentState.turn)
      this.setup();
  }

  private setup() {
    this.currentState = this.campaign.currentState();
    this.declaringFaction = this.campaign.getLosingFaction();
    this.isClimactic = this.currentState.phase === Phase.ClimacticBattle;
    this.label = this.isClimactic ? 'Climactic' : 'Pivotal';
  }

  objectiveChanged() {
    this.location = null;
    this.attackerResult = null;
    this.defenderResult = null;

    switch (this.pivotalObjective) {
      case PivotalObjective.Conquest:
        this.eligibleLocations = this.campaign.locations.filter(x => x.controlType === LocationControlType.Base &&
          x.controllingFaction === oppositeFaction(this.declaringFaction));
        this.attackerResult = new Outcome(this.declaringFaction);
        this.defenderResult = new Outcome(oppositeFaction(this.declaringFaction));
        break;
      case PivotalObjective.DemonstrationOfForce:
        this.eligibleLocations = this.campaign.locations;
        this.attackerResult = new Outcome(this.declaringFaction);
        this.defenderResult = new Outcome(oppositeFaction(this.declaringFaction));
        break;
      case PivotalObjective.Evacuation:
        this.eligibleLocations = this.campaign.locations.filter(x => x.controlType === LocationControlType.Base &&
          x.controllingFaction === this.declaringFaction);
        this.attackerResult = new Outcome(oppositeFaction(this.declaringFaction));
        this.defenderResult = new Outcome(this.declaringFaction);
        break;
    }
    
  }

  public formChanged() {
    this.determineValidity();
    this.validityChange.emit(this.isValid());
  }

  private isValid() {
    let valid = this.issues.filter(x => x.severity === IssueSeverity.Error).length === 0;
    this.completeButtonOptions.disabled = !valid;
    return valid;
  }

  private determineValidity() {
    this.issues = [];
  }

}
