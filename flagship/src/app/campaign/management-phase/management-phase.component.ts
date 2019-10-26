import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { Campaign } from 'src/app/domain/campaign/campaign';
import { indeterminateOptions } from 'src/app/shared/utils/progressButtonConfigs';
import { Phase } from 'src/app/domain/campaign/phase';
import { CampaignLocation } from 'src/app/domain/campaign/campaignLocation';
import { StrategicEffectType } from 'src/app/domain/campaign/strategicEffectType';
import { Battle } from 'src/app/domain/campaign/battle';
import { CampaignState } from 'src/app/domain/campaign/campaignState';
import { CampaignPlayer } from 'src/app/domain/campaign/campaignPlayer';
import { Issue, IssueSeverity } from 'src/app/domain/campaign/issue';
import { CampaignLocationFactory } from 'src/app/domain/factories/campaignLocationFactory';
import { Faction } from 'src/app/domain/faction';
import { LocationControlType } from 'src/app/domain/campaign/locationControlType';
import { BattleReward } from 'src/app/domain/campaign/battleReward';

export class ManagementCompletedEvent {
  nextPhase: Phase;
}

class Upkeep {
  constructor(public faction: Faction) {

  }
  eligibleBaseLocations: CampaignLocation[] = [];
  newBases: CampaignLocation[] = [];
  tokenLocations: CampaignLocation[] = [];
  tokenChoices: { [id: number]: StrategicEffectType } = {};
  currentResourceTokens: number;
}

class BattleOutcome {
  battle: Battle;
  winningFaction: Faction;
  location: CampaignLocation;
  afterLocation: CampaignLocation;
  locationChanged: boolean;
}

@Component({
  selector: 'flagship-management-phase',
  templateUrl: './management-phase.component.html',
  styleUrls: ['./management-phase.component.css']
})
export class ManagementPhaseComponent implements OnInit, OnChanges {

  @Input() campaign: Campaign;
  @Output() validityChange = new EventEmitter<boolean>();
  @Output() phaseComplete = new EventEmitter<void>();

  factions = Faction;
  currentState: CampaignState;
  players: { [id: string]: CampaignPlayer } = {};
  issues: Issue[] = [];
  
  outcomes: BattleOutcome[] = [];
  empireUpkeep = new Upkeep(Faction.Empire);
  rebelUpkeep = new Upkeep(Faction.Rebels);

  completeButtonOptions = indeterminateOptions('Finish Battle Phase');

  locationFactory = new CampaignLocationFactory();

  constructor() { }

  ngOnInit() {
    this.setup()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.currentState && changes.campaign.currentValue.currentState().turn !== this.currentState.turn)
      this.setup();
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
      .filter(x => x.controllingFaction === Faction.Empire && x.controlType === LocationControlType.Base);
    this.rebelUpkeep.tokenLocations = this.campaign.locations
      .filter(x => x.controllingFaction === Faction.Rebels && x.controlType === LocationControlType.Base);

    this.empireUpkeep.currentResourceTokens = this.campaign.empire.tokensOfType(StrategicEffectType.Resources);
    this.rebelUpkeep.currentResourceTokens = this.campaign.rebels.tokensOfType(StrategicEffectType.Resources);

    for (const battle of battles) {
      let outcome = new BattleOutcome();

      outcome.battle = battle;
      outcome.winningFaction = battle.getWinnerFaction(this.campaign.empire);
      let location = this.campaign.locations.find(x => x.id === battle.locationId);
      outcome.location = location;
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

      this.outcomes.push(outcome);
      if (outcome.winningFaction === Faction.Empire) {
        this.empireUpkeep.tokenLocations = this.empireUpkeep.tokenLocations.concat(location);
      } else {
        this.rebelUpkeep.tokenLocations = this.rebelUpkeep.tokenLocations.concat(location);
      }
    }

    this.setDefaultTokenChoices(this.empireUpkeep);
    this.setDefaultTokenChoices(this.rebelUpkeep);

    if (this.currentState.phase !== Phase.Management) {
      this.issues = [];
      this.validityChange.emit(this.isValid());
    } else {
      this.determineValidity();
      this.validityChange.emit(this.isValid());
    }
  }

  private setDefaultTokenChoices(upkeep: Upkeep) {
    for (const location of upkeep.tokenLocations) {
      if (location.strategicEffects && location.strategicEffects.length === 1) {
        upkeep.tokenChoices[location.id] = location.strategicEffects[0];
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
    // if (!this.loadedFleets) {
    //   this.issues.push({
    //     severity: IssueSeverity.Error,
    //     text: "Still loading fleets..."
    //   });
    //   return;
    // }
  }
}
