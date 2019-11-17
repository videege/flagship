import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { Campaign } from 'src/app/domain/campaign/campaign';
import { indeterminateOptions } from 'src/app/shared/utils/progressButtonConfigs';
import { Phase } from 'src/app/domain/campaign/phase';
import { CampaignLocation } from 'src/app/domain/campaign/campaignLocation';
import { StrategicEffectType, StrategicEffects } from 'src/app/domain/campaign/strategicEffectType';
import { Battle } from 'src/app/domain/campaign/battle';
import { CampaignState } from 'src/app/domain/campaign/campaignState';
import { CampaignPlayer } from 'src/app/domain/campaign/campaignPlayer';
import { Issue, IssueSeverity } from 'src/app/domain/campaign/issue';
import { CampaignLocationFactory } from 'src/app/domain/factories/campaignLocationFactory';
import { Faction } from 'src/app/domain/game/faction';
import { LocationControlType } from 'src/app/domain/campaign/locationControlType';
import { BattleReward } from 'src/app/domain/campaign/battleReward';
import { BattleType } from 'src/app/domain/campaign/battleType';
import { ObjectiveFactory } from 'src/app/domain/factories/objectiveFactory';
import { ObjectiveType } from 'src/app/domain/game/objective';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { FleetService } from 'src/app/core/services/fleet.service';
import { BattleState } from 'src/app/domain/campaign/battleState';
import { Condition } from 'src/app/domain/campaign/condition';
import { Team } from 'src/app/domain/campaign/team';

export class ManagementCompletedEvent {
  nextPhase: Phase;
}

class ConditionStatus {
  player: CampaignPlayer;
  condition: Condition;
  canRemoveForFree: boolean;
  willSpendToken: boolean;
  isLowMorale: boolean;
}

class Upkeep {
  constructor(public faction: Faction) {

  }
  eligibleBaseLocations: CampaignLocation[] = [];
  newBases: CampaignLocation[] = [];
  tokenLocations: CampaignLocation[] = [];
  tokenChoices: { [id: number]: StrategicEffectType } = {};
  currentResourceTokens: number;
  currentRepairTokens: number;
  currentSkilledSpacersTokens: number;
  repairTokensSpent: number = 0;
  conditionStatuses: ConditionStatus[] = [];

  public projectedSkilledSpacersTokens(): number {
    return this.currentSkilledSpacersTokens + this.projectedTokens(StrategicEffectType.SkilledSpacers);
  }

  public projectedResourceTokens(): number {
    return this.currentResourceTokens + this.projectedTokens(StrategicEffectType.Resources);
  }

  private projectedTokens(type: StrategicEffectType): number {
    let projected = 0;
    Object.keys(this.tokenChoices).forEach(id => {
      if (this.tokenChoices[id] === type) {
        projected += 1;
      }
    });
    return projected;
  }
}

class BattleOutcome {
  battle: Battle;
  winningFaction: Faction;
  winningPlayers: CampaignPlayer[] = [];
  losingPlayers: CampaignPlayer[] = [];
  location: CampaignLocation;
  afterLocation: CampaignLocation;
  locationChanged: boolean;
  rewardsCanBeUnique: boolean;
  loserFleetDifference: number = 0;
}

@Component({
  selector: 'flagship-management-phase',
  templateUrl: './management-phase.component.html',
  styleUrls: ['./management-phase.component.scss']
})
export class ManagementPhaseComponent implements OnInit, OnChanges {

  @Input() campaign: Campaign;
  @Output() validityChange = new EventEmitter<boolean>();
  @Output() phaseComplete = new EventEmitter<ManagementCompletedEvent>();

  factions = Faction;
  phases = Phase;

  effects = StrategicEffects;
  currentState: CampaignState;
  players: { [id: string]: CampaignPlayer } = {};
  issues: Issue[] = [];

  outcomes: BattleOutcome[] = [];
  empireUpkeep = new Upkeep(Faction.Empire);
  rebelUpkeep = new Upkeep(Faction.Rebels);

  completeButtonOptions = indeterminateOptions('Finish Management Phase');
  specialBattleType: BattleType = null;
  nextPhase: Phase = Phase.Strategy;
  canBeClimactic = false;
  willBeClimactic = false;
  losingFaction: Faction;

  locationFactory = new CampaignLocationFactory();

  constructor(private campaignService: CampaignService,
    private fleetService: FleetService) { }

  ngOnInit() {
    this.setup()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.currentState && changes.campaign.currentValue.currentState().turn !== this.currentState.turn)
      this.setup();
  }

  public getUnscarringLimit(upkeep: Upkeep): string {
    let bases = this.campaign.locations.filter(x => x.controllingFaction === upkeep.faction &&
      x.controlType === LocationControlType.Base).length;
    let newBases = upkeep.newBases.length;
    let repairYards = upkeep.repairTokensSpent;
    let total = bases + newBases + repairYards;
    return `${total} (${bases} bases + ${newBases} new bases + ${repairYards} Repair Yard Tokens)`;
  }

  completePhase() {
    this.completeButtonOptions.active = true;

    for (const outcome of this.outcomes) {
      if (outcome.locationChanged) {
        let location = this.campaign.locations.find(x => x.id === outcome.location.id);
        location.setPresence(outcome.afterLocation.controllingFaction);

      }
    }

    for (const upkeep of [this.empireUpkeep, this.rebelUpkeep]) {
      let team = upkeep.faction === Faction.Empire ? this.campaign.empire : this.campaign.rebels;
      for (const base of upkeep.newBases) {
        let location = this.campaign.locations.find(x => x.id === base.id);
        location.setBase(upkeep.faction, 301); //todo fix?
        team.removeToken(StrategicEffectType.Resources, 2);
      }

      if (upkeep.repairTokensSpent > 0) {
        team.removeToken(StrategicEffectType.RepairYards, upkeep.repairTokensSpent);
      }

      for (const tokenLocation of upkeep.tokenLocations) {
        const effect = upkeep.tokenChoices[tokenLocation.id];
        team.addToken(effect, 1);
      }

      for (const condition of upkeep.conditionStatuses) {
        if (condition.canRemoveForFree) {
          condition.player.clearCondition();
        } else if (condition.willSpendToken) {
          team.removeToken(condition.isLowMorale ? StrategicEffectType.SkilledSpacers : StrategicEffectType.Resources, 1);
          condition.player.clearCondition();
        }
      }
    }

    if (this.nextPhase === Phase.Strategy) {
      //create a new turn
      this.campaign.goToNextTurn();
    } else if (this.nextPhase === Phase.PivotalBattle) {
      this.campaign.currentState().setPhase(this.willBeClimactic ? Phase.ClimacticBattle : Phase.PivotalBattle);
    }
    this.campaignService.updateCampaign(this.campaign).then(() => {
      this.phaseComplete.emit({
        nextPhase: this.willBeClimactic ? Phase.ClimacticBattle : this.nextPhase
      });
    }, (errors) => {
      alert(errors);
    }).finally(() => {
      this.completeButtonOptions.active = false;
    })
  }

  private determineNextPhase() {
    this.nextPhase = Phase.Strategy;
    this.specialBattleType = null;

    if (this.currentState.actShouldEnd(this.campaign.numberOfPlayers())) {
      this.nextPhase = Phase.PivotalBattle;
      this.canBeClimactic = Math.abs(this.campaign.empire.campaignPoints - this.campaign.rebels.campaignPoints) >= 5;
      this.losingFaction = this.campaign.getLosingFaction();
    }
  }

  private setup() {
    this.currentState = this.campaign.currentState();
    let battles = this.currentState.getBattles();
    this.players = this.campaign.getPlayersMap();

    // Set eligible base locations (eligible locations do not include locations won this turn)
    this.empireUpkeep.eligibleBaseLocations = this.campaign.locations
      .filter(x => x.controllingFaction === Faction.Empire && x.controlType === LocationControlType.Presence);
    this.rebelUpkeep.eligibleBaseLocations = this.campaign.locations
      .filter(x => x.controllingFaction === Faction.Rebels && x.controlType === LocationControlType.Presence);

    this.empireUpkeep.tokenLocations = this.campaign.locations
      .filter(x => x.controllingFaction === Faction.Empire && x.controlType === LocationControlType.Base &&
        x.hasEffects());
    this.rebelUpkeep.tokenLocations = this.campaign.locations
      .filter(x => x.controllingFaction === Faction.Rebels && x.controlType === LocationControlType.Base &&
        x.hasEffects());

    this.empireUpkeep.currentResourceTokens = this.campaign.empire.tokensOfType(StrategicEffectType.Resources);
    this.empireUpkeep.currentRepairTokens = this.campaign.empire.tokensOfType(StrategicEffectType.RepairYards);
    this.empireUpkeep.currentSkilledSpacersTokens = this.campaign.empire.tokensOfType(StrategicEffectType.SkilledSpacers);
    this.rebelUpkeep.currentResourceTokens = this.campaign.rebels.tokensOfType(StrategicEffectType.Resources);
    this.rebelUpkeep.currentRepairTokens = this.campaign.rebels.tokensOfType(StrategicEffectType.RepairYards);
    this.rebelUpkeep.currentSkilledSpacersTokens = this.campaign.rebels.tokensOfType(StrategicEffectType.SkilledSpacers);

    let objectiveFactory = new ObjectiveFactory();
    for (const battle of battles) {
      let outcome = new BattleOutcome();

      outcome.battle = battle;
      outcome.winningFaction = battle.getWinnerFaction(this.campaign.empire);
      let location = this.campaign.locations.find(x => x.id === battle.locationId);
      outcome.location = location;
      let objective = objectiveFactory.getObjective(outcome.battle.objectiveId);
      outcome.rewardsCanBeUnique = objective.type === ObjectiveType.Campaign || objective.type === ObjectiveType.Special;

      let afterLocation = CampaignLocation.newLocation(location.id, location.name,
        location.objectives, location.strategicEffects, location.baseAssaultBonus, location.sectors,
        location.rewards, location.controllingFaction, location.controlType, location.chosenObjective);
      if (outcome.winningFaction !== location.controllingFaction) {
        afterLocation.setPresence(outcome.winningFaction);
        outcome.locationChanged = true;
      } else {
        outcome.locationChanged = false;
      }
      outcome.afterLocation = afterLocation;
      outcome.loserFleetDifference = outcome.battle.state === BattleState.AttackersWon
        ? outcome.battle.attackerResult.fleetPoints - outcome.battle.defenderResult.fleetPoints
        : outcome.battle.defenderResult.fleetPoints - outcome.battle.attackerResult.fleetPoints;
      for (const participant of [...battle.attackingPlayers, ...battle.defendingPlayers]) {
        let player = this.players[participant.playerId];
        if (this.campaign.getFactionOfPlayer(player.id) === outcome.winningFaction) {
          outcome.winningPlayers.push(player);
        } else {
          outcome.losingPlayers.push(player);
        }
      }

      this.outcomes.push(outcome);
      if (location.hasEffects()) {
        if (outcome.winningFaction === Faction.Empire) {
          this.empireUpkeep.tokenLocations = this.empireUpkeep.tokenLocations.concat(location);
        } else {
          this.rebelUpkeep.tokenLocations = this.rebelUpkeep.tokenLocations.concat(location);
        }
      }
    }

    this.setDefaultTokenChoices(this.empireUpkeep);
    this.setDefaultTokenChoices(this.rebelUpkeep);

    this.setupConditionStatuses(this.empireUpkeep, this.campaign.empire);
    this.setupConditionStatuses(this.rebelUpkeep, this.campaign.rebels);

    this.determineNextPhase();

    if (this.currentState.phase !== Phase.Management) {
      this.issues = [];
      this.validityChange.emit(this.isValid());
    } else {
      this.determineValidity();
      this.validityChange.emit(this.isValid());
    }
  }

  private setupConditionStatuses(upkeep: Upkeep, team: Team) {
    upkeep.conditionStatuses = team.players.filter(x => x.condition !== null)
      .map(p => {
        let status = new ConditionStatus();
        status.player = p;
        status.condition = p.condition;
        let outcome = this.outcomes.find(x => x.battle.playerIsParticipant(p.id));
        if (p.condition === Condition.LowMorale &&
          outcome.battle.objectiveId === 309) { //recruit allies 
          status.canRemoveForFree = true;
        } else if ((p.condition === Condition.LowFuel || p.condition === Condition.LowSupplies) &&
          outcome.battle.objectiveId === 310) { //steal supplies
          status.canRemoveForFree = true;
        }
        status.isLowMorale = p.condition === Condition.LowMorale;
        status.willSpendToken = false;
        return status;
      });
  }

  private setDefaultTokenChoices(upkeep: Upkeep) {
    for (const location of upkeep.tokenLocations) {
      if (location.strategicEffects && location.strategicEffects.length === 1) {
        upkeep.tokenChoices[location.id] = location.strategicEffects[0];
      } else {
        upkeep.tokenChoices[location.id] = null;
      }
    }
  }

  public formChanged() {
    this.determineValidity();
    this.validityChange.emit(this.isValid());
  }

  private isValid() {
    let valid = this.issues.filter(x => x.severity === IssueSeverity.Error).length === 0;
    this.completeButtonOptions.disabled = !valid;
    // this.determineResults();
    return valid;
  }

  private determineValidity() {
    this.issues = [];

    for (const upkeep of [this.empireUpkeep, this.rebelUpkeep]) {
      const factionName = upkeep.faction === Faction.Empire ? 'Imperials' : 'Rebels';
      let resources = upkeep.currentResourceTokens;
      let projectedResourceTokens = upkeep.projectedResourceTokens();
      for (const newBase of upkeep.newBases) {
        resources -= 2;
        projectedResourceTokens -= 2;
        if (resources < 0) {
          this.issues.push({
            severity: IssueSeverity.Error,
            text: `${factionName} do not have enough resource tokens to build a new base at ${newBase.name}.`
          });
        }
      }

      for (const tokenLocation of upkeep.tokenLocations) {
        if (upkeep.tokenChoices[tokenLocation.id] === null) {
          this.issues.push({
            severity: IssueSeverity.Error,
            text: `${factionName} must choose a strategic effect token for ${tokenLocation.name}.`
          });
        }
      }

      let projectedSkilledSpacersTokens = upkeep.projectedSkilledSpacersTokens();
      for (const condition of upkeep.conditionStatuses) {
        if (condition.isLowMorale && condition.willSpendToken) {
          projectedSkilledSpacersTokens -= 1;
          if (projectedSkilledSpacersTokens < 0) {
            this.issues.push({
              severity: IssueSeverity.Error,
              text: `${factionName} do not have enough projected Skilled Spacers tokens to remove the Low Morale condition from ${condition.player.name}.`
            });
          }
        } else if (condition.willSpendToken) {
          projectedResourceTokens -= 1;
          if (projectedResourceTokens < 0) {
            this.issues.push({
              severity: IssueSeverity.Error,
              text: `${factionName} do not have enough projected Resource tokens to remove the ${condition.condition} condition from ${condition.player.name}.`
            });
          }
        }
      }
    }
  }
}
