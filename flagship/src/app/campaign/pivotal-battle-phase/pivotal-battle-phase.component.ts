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
import { StrategicEffectType, StrategicEffects } from 'src/app/domain/campaign/strategicEffectType';
import { Battle } from 'src/app/domain/campaign/battle';
import { BattleType } from 'src/app/domain/campaign/battleType';

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
  flatCampaignPoints: number;
  victoryBonus: number;
  winnerCampaignPoints(isClimactic: boolean): number {
    if (isClimactic) {
      return this.flatCampaignPoints + (this.victoryBonus * 2);
    }
    return this.flatCampaignPoints + this.victoryBonus;
  }
  winningTeamXP: number;
  losingTeamXP: number;
}

class ConquestReward extends PivotalReward {
  chosenTokenIfDefendersWon: StrategicEffectType = StrategicEffectType.SkilledSpacers;
}

class DOFReward extends PivotalReward {
  eligibleAttackingVictoryLocations: CampaignLocation[] = [];
  attackingVictoryLocations: CampaignLocation[] = [];
}

class EvacuationReward extends PivotalReward {
  eligibleMoveLocations: CampaignLocation[] = [];
  chosenLocation: CampaignLocation = null;
  chosenToken: StrategicEffectType = null;
}

@Component({
  selector: 'flagship-pivotal-battle-phase',
  templateUrl: './pivotal-battle-phase.component.html',
  styleUrls: ['./pivotal-battle-phase.component.scss']
})
export class PivotalBattlePhaseComponent implements OnInit {
  @Input() campaign: Campaign;
  @Output() validityChange = new EventEmitter<boolean>();
  @Output() phaseComplete = new EventEmitter<void>();

  factions = Faction;
  objTypes = PivotalObjective;
  effects = StrategicEffectType;
  effectUtils = StrategicEffects;

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
    this.completeButtonOptions.text = `Finish ${this.label} Battle`;
    this.formChanged();
  }

  public completePhase() {
    this.completeButtonOptions.active = true;
    let winningTeam = this.campaign.getTeamForFaction(this.reward.winnerFaction);
    let losingTeam = this.campaign.getTeamForFaction(oppositeFaction(this.reward.winnerFaction));
    // XP, victory points
    winningTeam.campaignPoints += this.reward.winnerCampaignPoints(this.isClimactic);
    if (this.reward.winnerFaction === Faction.Empire) {
      this.currentState.imperialPointsScored += this.reward.winnerCampaignPoints(this.isClimactic);
    } else {
      this.currentState.rebelPointsScored += this.reward.winnerCampaignPoints(this.isClimactic);
    }
    for (const player of winningTeam.players) {
      player.recordWin(this.reward.marginOfVictory);
      let fleet = this.campaign.fleets[player.fleetId];
      if (fleet && fleet.hasCustomCommander()) {
        fleet.customCommander.addExperience(this.reward.winningTeamXP);
        this.fleetService.updateFleet(fleet).then(() => { }, (errors) => { alert(errors); });
      }
    }
    for (const player of losingTeam.players) {
      player.recordLoss(this.reward.marginOfVictory);
      let fleet = this.campaign.fleets[player.fleetId];
      if (fleet && fleet.hasCustomCommander()) {
        fleet.customCommander.addExperience(this.reward.losingTeamXP);
        this.fleetService.updateFleet(fleet).then(() => { }, (errors) => { alert(errors); });
      }
    }
    // Special effects of each objective
    if (this.pivotalObjective === PivotalObjective.Conquest) {
      let reward = <ConquestReward>this.reward;
      if (reward.attackersWon) {
        this.location.setBase(reward.winnerFaction, 301);
      } else {
        winningTeam.addToken(reward.chosenTokenIfDefendersWon);
      }
    } else if (this.pivotalObjective === PivotalObjective.DemonstrationOfForce) {
      let reward = <DOFReward>this.reward;
      if (reward.attackersWon) {
        for (const location of reward.attackingVictoryLocations) {
          location.setPresence(reward.winnerFaction);
        }
      } else {
        winningTeam.addToken(StrategicEffectType.Diplomats);
      }
    } else if (this.pivotalObjective === PivotalObjective.Evacuation) {
      let reward = <EvacuationReward>this.reward;
      if (reward.attackersWon) {
        winningTeam.addToken(StrategicEffectType.SkilledSpacers);
        winningTeam.addToken(StrategicEffectType.Resources);
        this.location.setUnoccupied();
      } else {
        let obj = this.location.chosenObjective;
        this.location.setUnoccupied();
        reward.chosenLocation.setBase(reward.winnerFaction, obj);
        if (reward.chosenToken != null) {
          winningTeam.addToken(reward.chosenToken);
        }
      }
    }

    let battle = Battle.declareBattle(null, 
      `${this.isClimactic ? 'Climactic' : 'Pivotal'} Battle at ${this.location.name}`,
      this.location, this.campaign.getTeamForFaction(this.attackerResult.faction).players,
      this.campaign.getTeamForFaction(this.defenderResult.faction).players,
      this.isClimactic ? BattleType.Climactic : BattleType.Pivotal);
    battle.pivotalObjective = this.pivotalObjective;
    battle.recordResult(this.attackerResult.fleetPoints,
      this.attackerResult.score, this.reward.attackersWon ? this.reward.winnerCampaignPoints(this.isClimactic) : 0,
      this.defenderResult.fleetPoints, this.defenderResult.score,
      !this.reward.attackersWon ? this.reward.winnerCampaignPoints(this.isClimactic) : 0);
    this.campaign.addEvent(battle);
    // Determine if the game is over
    if (this.isClimactic || this.currentState.act === 3) {
      this.campaign.completed();
    } else {
      this.campaign.goToNextAct();
    }

    this.campaignService.updateCampaign(this.campaign).then(() => {
      this.phaseComplete.emit();
    }, (errors) => {
      alert(errors);
    }).finally(() => {
      this.completeButtonOptions.active = false;
    });
  }

  objectiveChanged() {
    this.location = null;
    this.attackerResult = null;
    this.defenderResult = null;
    this.conquestObjective = null;
    this.reward = null;
    this.issues = [];

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
    this.setFleetPointTotals();
    this.formChanged();
  }

  private setFleetPointTotals() {
    for (const result of [this.attackerResult, this.defenderResult]) {
      let team = result.faction === Faction.Empire ? this.campaign.empire : this.campaign.rebels;
      let fleetIds = team.players.map(x => x.fleetId);
      let total = 0;
      for (const fleetId of fleetIds) {
        const fleet = this.campaign.fleets[fleetId];
        if (fleet) {
          total += fleet.currentPoints();
        }
      }
      result.fleetPoints = total;
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

  public locationChanged() {
    this.reward = null;
    this.formChanged();
  }

  public evacLocationChanged() {
    (<EvacuationReward>this.reward).chosenToken = null;
    this.formChanged();
  }

  private isValid() {
    let valid = this.issues.filter(x => x.severity === IssueSeverity.Error).length === 0;
    this.completeButtonOptions.disabled = !valid;
    if (valid) {
      this.determineOutcomes();
      this.validateRewards();
      valid = this.issues.filter(x => x.severity === IssueSeverity.Error).length === 0;
      this.completeButtonOptions.disabled = !valid;
    }

    return valid;
  }

  private determineOutcomes() {
    if (this.pivotalObjective === PivotalObjective.Conquest) {
      this.reward = this.determineConquestReward(!(this.reward instanceof ConquestReward));
    } else if (this.pivotalObjective === PivotalObjective.DemonstrationOfForce) {
      this.reward = this.determineDOFReward(!(this.reward instanceof DOFReward));
    } else if (this.pivotalObjective === PivotalObjective.Evacuation) {
      this.reward = this.determineEvacuationReward(!(this.reward instanceof EvacuationReward));
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

  private determineEvacuationReward(makeNew = false): PivotalReward {
    let reward = makeNew ? new EvacuationReward() : <EvacuationReward>this.reward;
    this.setRewardBasicInfo(reward);

    if (reward.attackersWon) {
      reward.flatCampaignPoints = 1;
      reward.victoryBonus = 0;
    } else {
      reward.eligibleMoveLocations = this.campaign.locations
        .filter(x => x.controlType === null || (x.controlType === LocationControlType.Presence &&
          x.controllingFaction === reward.winnerFaction));
      if (!reward.chosenLocation) {
        reward.chosenToken = null;
      }
      reward.flatCampaignPoints = 2;
      reward.victoryBonus = reward.chosenLocation ? reward.chosenLocation.baseAssaultBonus : 0;
    }
    return reward;
  }

  private determineDOFReward(makeNew = false): PivotalReward {
    let reward = makeNew ? new DOFReward() : <DOFReward>this.reward;
    this.setRewardBasicInfo(reward);

    if (reward.attackersWon) {
      reward.eligibleAttackingVictoryLocations = this.campaign.locations.filter(x =>
        x.isInSameArea(this.location) && (x.controlType === null ||
          (x.controlType === LocationControlType.Presence && x.controllingFaction === oppositeFaction(reward.winnerFaction))));

      reward.flatCampaignPoints = 2;
      reward.victoryBonus = 0;
      if (reward.attackingVictoryLocations.length) {
        for (const loc of reward.attackingVictoryLocations) {
          reward.victoryBonus += loc.baseAssaultBonus;
        }
      }
    } else {
      reward.flatCampaignPoints = 1;
      reward.victoryBonus = 0;
    }

    return reward;
  }

  private determineConquestReward(makeNew = false): PivotalReward {
    let reward = makeNew ? new ConquestReward() : <ConquestReward>this.reward;
    this.setRewardBasicInfo(reward);

    if (reward.attackersWon) {
      reward.flatCampaignPoints = 2;
      reward.victoryBonus = this.location.baseAssaultBonus;
    } else {
      reward.flatCampaignPoints = 1;
      reward.victoryBonus = 0;
    }

    return reward;
  }

  private validateRewards() {
    this.issues = [];

    if (this.pivotalObjective === PivotalObjective.Conquest) {
      return; // nothing to validate
    } else if (this.pivotalObjective === PivotalObjective.DemonstrationOfForce) {
      let reward = <DOFReward>this.reward;
      if (reward.attackingVictoryLocations.length < Math.min(2, reward.eligibleAttackingVictoryLocations.length)) {
        this.issues.push({
          severity: IssueSeverity.Warning,
          text: `You haven't selected the all the locations allotted to the winning team.`
        });
        return;
      }
    } else if (this.pivotalObjective === PivotalObjective.Evacuation) {
      let reward = <EvacuationReward>this.reward;
      if (!reward.chosenLocation) {
        this.issues.push({
          severity: IssueSeverity.Error,
          text: `You haven't selected the new location for the winning team's base.`
        });
        return;
      }
      if (reward.chosenLocation.hasEffects() && reward.chosenToken === null) {
        this.issues.push({
          severity: IssueSeverity.Warning,
          text: `You haven't selected the a token for the new location.`
        });
        return;
      }
    }
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

    if (this.pivotalObjective === PivotalObjective.Evacuation &&
      Math.abs(this.campaign.empire.campaignPoints - this.campaign.rebels.campaignPoints) < 3) {
      this.issues.push({
        severity: IssueSeverity.Error,
        text: `The Evacuation objective may only be chosen if the difference between the team's scores is greater than or equal to three campaign points.`
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
          text: `You must specify each team's total fleet points.`
        });
        return;
      }
      if (outcome.score === null || outcome.score < 0) {
        this.issues.push({
          severity: IssueSeverity.Error,
          text: `You must specify each team's total score.`
        });
        return;
      }
    }
  }

}
