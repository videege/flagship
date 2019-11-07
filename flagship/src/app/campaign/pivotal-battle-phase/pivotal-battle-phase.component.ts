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
import { Objective } from 'src/app/domain/objective';
import { StrategicEffectType } from 'src/app/domain/campaign/strategicEffectType';

class Outcome {
  constructor(public faction: Faction) {

  }

  fleetPoints: number = null;
  score: number = null;
}

class PivotalReward {
  winnerFaction: Faction;
  attackersWon: boolean;
  marginOfVictory: number;
  winnerCampaignPoints: number;
  winningTeamXP: number;
  losingTeamXP: number;
}

class ConquestReward extends PivotalReward {
  chosenTokenIfDefendersWon: StrategicEffectType;
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
  conquestObjective: Objective = null;
  location: CampaignLocation;
  eligibleLocations: CampaignLocation[] = [];
  declaringFaction: Faction;
  attackerResult: Outcome;
  defenderResult: Outcome;

  reward: PivotalReward = null;

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
    this.conquestObjective = null;

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
    if (this.pivotalObjective === PivotalObjective.Conquest && this.location) {
      this.conquestObjective = this.objectiveFactory.getObjective(this.location.chosenObjective);
    } else {
      this.conquestObjective = null;
    }
    this.determineValidity();
    this.validityChange.emit(this.isValid());
  }

  private isValid() {
    let valid = this.issues.filter(x => x.severity === IssueSeverity.Error).length === 0;
    this.completeButtonOptions.disabled = !valid;
    this.resetOutcomes();
    if (valid) {
      this.determineOutcomes();
    }
    return valid;
  }

  private resetOutcomes() {
    this.reward = null;
  }

  private determineOutcomes() {
    if (this.pivotalObjective === PivotalObjective.Conquest) {
      this.reward = this.determineConquestReward();
    }

  }

  private setRewardBasicInfo(reward: PivotalReward) {
    reward.attackersWon = this.attackerResult.score > this.defenderResult.score;
    reward.winnerFaction = reward.attackersWon ? this.attackerResult.faction : this.defenderResult.faction;
    reward.marginOfVictory = Math.abs(this.attackerResult.score - this.defenderResult.score);
    reward.winningTeamXP = 1 + Math.floor(reward.marginOfVictory / 75);
    reward.losingTeamXP = 2;
    let understrengthBonus = Math.floor(Math.abs(this.attackerResult.fleetPoints - this.defenderResult.fleetPoints) / 25);
    if (reward.attackersWon) {
      if (this.attackerResult.fleetPoints < this.defenderResult.fleetPoints) {
        reward.winningTeamXP += understrengthBonus;
      } else {
        reward.losingTeamXP += understrengthBonus;
      }
    } else {
      if (this.attackerResult.fleetPoints < this.defenderResult.fleetPoints) {
        reward.losingTeamXP += understrengthBonus;
      } else {
        reward.winningTeamXP += understrengthBonus;
      }
    }
  }

  private determineConquestReward() : PivotalReward{
    let reward = new ConquestReward();
    this.setRewardBasicInfo(reward);

    if (reward.attackersWon) {
      reward.winnerCampaignPoints = 2 + this.location.baseAssaultBonus;
    } else {
      reward.winnerCampaignPoints = 1;
    }
    return reward;
  }

  private determineValidity() {
    this.issues = [];

    if (this.pivotalObjective === null) {
      this.issues.push({
        severity: IssueSeverity.Error,
        text: `You must specify the battle's special objective.`
      });
      return;
    }

    if (!this.location) {
      this.issues.push({
        severity: IssueSeverity.Error,
        text: `You must specify the battle's location.`
      });
      return;
    }

    for (const outcome of [this.attackerResult, this.defenderResult]) {
      if (!outcome.fleetPoints || outcome.fleetPoints <= 0) {
        this.issues.push({
          severity: IssueSeverity.Error,
          text: `You must each team's total fleet points.`
        });
        return;
      }
      if (outcome.score === null || outcome.score < 0) {
        this.issues.push({
          severity: IssueSeverity.Error,
          text: `You must each team's total score.`
        });
        return;
      }
    }
  }

}
