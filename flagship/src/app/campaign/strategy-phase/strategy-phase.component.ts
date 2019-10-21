import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { Campaign } from 'src/app/domain/campaign/campaign';
import { BehaviorSubject } from 'rxjs';
import { CampaignState } from 'src/app/domain/campaign/campaignState';
import { Phase } from 'src/app/domain/campaign/phase';
import { CampaignEventType } from 'src/app/domain/campaign/campaignEvent';
import { Battle } from 'src/app/domain/campaign/battle';
import { Faction } from 'src/app/domain/faction';
import { CampaignLocation } from 'src/app/domain/campaign/campaignLocation';
import { CampaignPlayer } from 'src/app/domain/campaign/campaignPlayer';
import { Condition } from 'src/app/domain/campaign/condition';
import { LocationControlType } from 'src/app/domain/campaign/locationControlType';
import { Issue, IssueSeverity } from 'src/app/domain/campaign/issue';
import { CampaignLocationFactory } from 'src/app/domain/factories/campaignLocationFactory';

class DeclaredBattle {
  location: CampaignLocation = null;
  attackingPlayer: CampaignPlayer = null;
  defendingPlayer: CampaignPlayer = null;

  attackingConditions: Condition[] = [];
  defendingConditions: Condition[] = [];
}

@Component({
  selector: 'flagship-strategy-phase',
  templateUrl: './strategy-phase.component.html',
  styleUrls: ['./strategy-phase.component.css']
})
export class StrategyPhaseComponent implements OnInit, OnChanges {

  @Input() campaign: Campaign;
  @Input() initiativeFaction: Faction;
  @Output() validityChange = new EventEmitter<boolean>();

  currentState: CampaignState;
  battles: DeclaredBattle[];
  numberOfBattlesRequired: number;

  availableInitiativePlayers: CampaignPlayer[] = [];
  availableNonInitiativePlayers: CampaignPlayer[] = [];
  availableInitiativeLocations: CampaignLocation[] = [];
  availableNonInitiativeLocations: CampaignLocation[] = [];
  initiativeTeamLabel: string;
  nonInitiativeTeamLabel: string;

  issues: Issue[] = [];

  constructor() { }

  ngOnInit() {
    this.numberOfBattlesRequired = this.campaign.empire.numberOfPlayers();
    this.setup()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.currentState && changes.campaign.currentValue.currentState().turn !== this.currentState.turn)
      this.setup();
  }

  private setup() {
    this.currentState = this.campaign.currentState();
    this.battles = [];
    for (let i = 0; i < this.numberOfBattlesRequired; i++) {
      this.battles.push(new DeclaredBattle());
    }
    let isEmpire = this.initiativeFaction === Faction.Empire;

    this.availableInitiativePlayers = [].concat(isEmpire ? this.campaign.empire.players : this.campaign.rebels.players);
    this.availableNonInitiativePlayers = [].concat(isEmpire ? this.campaign.rebels.players : this.campaign.empire.players);
    this.availableInitiativeLocations = [].concat(this.campaign.locations.filter(x => x.controllingFaction !== (isEmpire ? Faction.Empire : Faction.Rebels)));
    this.availableNonInitiativeLocations = [].concat(this.campaign.locations.filter(x => x.controllingFaction !== (isEmpire ? Faction.Rebels : Faction.Empire)));
    this.initiativeTeamLabel = isEmpire ? "Imperial" : "Rebel";
    this.nonInitiativeTeamLabel = isEmpire ? "Rebel" : "Imperial";
    if (this.currentState.phase !== Phase.Strategy) {
      this.issues = [];
      this.validityChange.emit(this.isValid());
    } else {
      this.determineValidity();
      this.validityChange.emit(this.isValid());
    }
  }

  private isValid() {
    return this.issues.filter(x => x.severity === IssueSeverity.Error).length === 0;
  }

  public formChanged() {
    this.determineValidity();
    this.validityChange.emit(this.isValid());
  }

  private determineValidity(): void {
    this.issues = [];
    // the strategy phase is valid if all players are involved in a declared assault
    if (this.battles.length != this.numberOfBattlesRequired) {
      this.issues.push({ severity: IssueSeverity.Error, text: "Phase has an incorrect number of battles." });
      return;
    }

    let seenPlayers = [];
    let seenLocations = [];
    let baseAssaultLocation: { [faction: number]: CampaignLocation } = {};
    for (const battle of this.battles) {
      if (!battle.attackingPlayer || !battle.defendingPlayer || !battle.location) {
        this.issues.push({
          severity: IssueSeverity.Error,
          text: "You must specify the attacking and defending player and the location for each battle"
        });
        return;
      }
      if (seenPlayers.indexOf(battle.attackingPlayer.id) === -1) seenPlayers.push(battle.attackingPlayer.id);
      if (seenPlayers.indexOf(battle.defendingPlayer.id) === -1) seenPlayers.push(battle.defendingPlayer.id);

      if (seenLocations.indexOf(battle.location.id) === -1) {
        seenLocations.push(battle.location.id);
        if (battle.location.controlType === LocationControlType.Base) {
          let existingAssault = baseAssaultLocation[battle.location.controllingFaction]
          if (existingAssault) {
            this.issues.push({
              severity: IssueSeverity.Error,
              text: `${existingAssault.name} and ${battle.location.name} cannot both be attacked because a team can only attack one base per turn.`
            });
            return;
          } else {
            baseAssaultLocation[battle.location.controllingFaction] = battle.location;
          }
        }
      } else {
        this.issues.push({
          severity: IssueSeverity.Error,
          text: `${battle.location.name} cannot be specified as the location of more than one battle.`
        });
        return;
      }
    }
    if (seenPlayers.length !== this.campaign.numberOfPlayers()) {
      this.issues.push({
        severity: IssueSeverity.Error,
        text: `One or more players are not specified as attackers or defenders.  Each player must participate in a single battle.`
      });
      return;
    }
  }


}
