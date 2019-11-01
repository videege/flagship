import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { Campaign } from 'src/app/domain/campaign/campaign';
import { Issue, IssueSeverity } from 'src/app/domain/campaign/issue';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { CampaignState } from 'src/app/domain/campaign/campaignState';
import { indeterminateOptions } from 'src/app/shared/utils/progressButtonConfigs';
import { Battle, BattleResult } from 'src/app/domain/campaign/battle';
import { Phase } from 'src/app/domain/campaign/phase';
import { CampaignPlayer } from 'src/app/domain/campaign/campaignPlayer';
import { BattleParticipant } from 'src/app/domain/campaign/battleParticipant';
import { FleetService } from 'src/app/core/services/fleet.service';
import { Fleet } from 'src/app/domain/fleet';
import { Objective } from 'src/app/domain/objective';
import { ObjectiveFactory } from 'src/app/domain/factories/objectiveFactory';
import { LocationControlType } from 'src/app/domain/campaign/locationControlType';
import { BattleState } from 'src/app/domain/campaign/battleState';
import { CampaignLocation } from 'src/app/domain/campaign/campaignLocation';
import { CampaignLocationFactory } from 'src/app/domain/factories/campaignLocationFactory';
import { Ship } from 'src/app/domain/ship';
import { Squadron } from 'src/app/domain/squadron';
import { Faction } from 'src/app/domain/faction';

class FleetModification {
  eligibleShipsForScarring: Ship[] = [];
  eligibleSquadronsForScarring: Squadron[] = [];
  eligibleShipsForVeteran: Ship[] = [];
  eligibleSquadronsForVeteran: Squadron[] = [];
  maxVeterans = 1;
  scarredShipIds: number[] = [];
  scarredSquadronIds: number[] = [];
  veteranShipIds: number[] = [];
  veteranSquadronIds: number[] = [];

  tooManyVeterans(): boolean {
    return this.veteranShipIds.length + this.veteranSquadronIds.length > this.maxVeterans;
  }
}

@Component({
  selector: 'flagship-battle-phase',
  templateUrl: './battle-phase.component.html',
  styleUrls: ['./battle-phase.component.css']
})
export class BattlePhaseComponent implements OnInit, OnChanges {
  @Input() campaign: Campaign;
  @Output() validityChange = new EventEmitter<boolean>();
  @Output() phaseComplete = new EventEmitter<void>();

  public states = BattleState;

  completeButtonOptions = indeterminateOptions('Finish Battle Phase');
  objectiveFactory = new ObjectiveFactory();
  currentState: CampaignState;
  battles: Battle[];
  possibleObjectives: Objective[][] = [];
  attackerBattleResults: BattleResult[] = [];
  defenderBattleResults: BattleResult[] = [];
  battleObjectives: Objective[] = [];
  battleStates: BattleState[] = [];
  issues: Issue[] = [];
  players: { [id: string]: CampaignPlayer } = {};
  fleetMods: { [id: string]: FleetModification } = {};

  constructor(private campaignService: CampaignService,
    private fleetService: FleetService) { }

  ngOnInit() {
    this.setup()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.currentState && changes.campaign.currentValue.currentState().turn !== this.currentState.turn)
      this.setup();
  }

  getParticipantNames(participants: BattleParticipant[]): string {
    let names = participants.map(x => this.players[x.playerId].name);
    return names.join(", ");
  }

  public completePhase() {
    this.completeButtonOptions.active = true;
    for (let i = 0; i < this.battles.length; i++) {
      let battle = this.battles[i];
      battle.objectiveId = this.battleObjectives[i].id;
      battle.recordResult(this.attackerBattleResults[i].fleetPoints,
        this.attackerBattleResults[i].score, this.attackerBattleResults[i].earnedPoints,
        this.defenderBattleResults[i].fleetPoints, this.defenderBattleResults[i].score,
        this.defenderBattleResults[i].earnedPoints);
      // Record the overall results in the state and rosters
      this.campaign.applyBattleResults(battle);
      let winningFleets = battle.attackersWon()
        ? battle.attackingPlayers.map(p => this.campaign.fleets[p.fleetId])
        : battle.defendingPlayers.map(p => this.campaign.fleets[p.fleetId]);
      let losingFleets = battle.attackersWon()
        ? battle.defendingPlayers.map(p => this.campaign.fleets[p.fleetId])
        : battle.attackingPlayers.map(p => this.campaign.fleets[p.fleetId]);
      for (const fleet of winningFleets) {
        fleet.customCommander.addExperience(battle.attackersWon()
          ? battle.attackerResult.earnedXP : battle.defenderResult.earnedXP);
        this.applyFleetMods(fleet);
        this.fleetService.updateFleet(fleet).then(() => { }, (errors) => { alert(errors); });
      }
      for (const fleet of losingFleets) {
        fleet.customCommander.addExperience(battle.attackersWon()
          ? battle.defenderResult.earnedXP : battle.attackerResult.earnedXP);
        this.applyFleetMods(fleet);
        this.fleetService.updateFleet(fleet).then(() => { }, (errors) => { alert(errors); });
      }
    }
    this.currentState.setPhase(Phase.Management);
    this.campaignService.updateCampaign(this.campaign).then(() => {
      this.phaseComplete.emit();
    }, (errors) => {
      alert(errors);
    }).finally(() => {
      this.completeButtonOptions.active = false;
    });
  }

  private applyFleetMods(fleet: Fleet) {
    let mod = this.fleetMods[fleet.id];
    for (const shipId of mod.scarredShipIds) {
      let ship = fleet.ships.find(x => x.id === shipId);
      if (ship) {
        ship.setIsScarred(true);
      }
    }
    for (const shipId of mod.veteranShipIds) {
      let ship = fleet.ships.find(x => x.id === shipId);
      if (ship) {
        ship.setIsVeteran(true);
      }
    }
    for (const squadronId of mod.scarredSquadronIds) {
      let squad = fleet.squadrons.find(x => x.id === squadronId);
      if (squad) {
        squad.setIsScarred(true);
      }
    }
    for (const squadronId of mod.veteranSquadronIds) {
      let squad = fleet.squadrons.find(x => x.id === squadronId);
      if (squad) {
        squad.setIsVeteran(true);
      }
    }
  }

  private setup() {
    this.currentState = this.campaign.currentState();
    this.battles = this.currentState.getBattles();
    this.players = this.campaign.getPlayersMap();

    for (let i = 0; i < this.battles.length; i++) {
      let battle = this.battles[i];
      for (let participant of [...battle.attackingPlayers, ...battle.defendingPlayers]) {
        let mod = new FleetModification();
        let fleet = this.campaign.fleets[participant.fleetId];
        mod.eligibleShipsForScarring = fleet.ships.filter(x => !x.isScarred);
        mod.eligibleSquadronsForScarring = fleet.squadrons.filter(x => !x.isScarred && x.unique);
        mod.eligibleShipsForVeteran = fleet.ships.filter(x => !x.isVeteran);
        mod.eligibleSquadronsForVeteran = fleet.squadrons.filter(x => !x.isVeteran && x.unique);
        mod.maxVeterans = 1 + (this.campaign.getFactionOfPlayer(participant.playerId) === Faction.Empire
          ? this.currentState.imperialSkilledSpacersSpent
          : this.currentState.rebelSkilledSpacersSpent);
        this.fleetMods[participant.fleetId] = mod;
      }
      this.attackerBattleResults.push({
        fleetPoints: battle.attackingPlayers
          .map(x => this.campaign.fleets[x.fleetId].currentPoints())
          .reduce((sum, val) => sum + val),
        score: null,
        earnedXP: null,
        earnedPoints: null
      });
      this.defenderBattleResults.push({
        fleetPoints: battle.defendingPlayers
          .map(x => this.campaign.fleets[x.fleetId].currentPoints())
          .reduce((sum, val) => sum + val),
        score: null,
        earnedXP: null,
        earnedPoints: null
      });
      this.possibleObjectives.push(this.getPossibleObjectives(this.battles[i]));
      this.battleObjectives.push(null);
      this.battleStates.push(BattleState.Declared);
    }

    if (this.currentState.phase !== Phase.Battle) {
      this.issues = [];
      this.validityChange.emit(this.isValid());
    } else {
      this.determineValidity();
      this.validityChange.emit(this.isValid());
    }
  }

  getPossibleObjectives(battle: Battle): Objective[] {
    let location = this.campaign.locations.find(x => x.id === battle.locationId);
    let objectiveIds = [];
    if (location.controlType === LocationControlType.Base) {
      objectiveIds.push(location.chosenObjective);
      return this.objectiveFactory.getObjectivesByIds(objectiveIds);
    }
    objectiveIds = objectiveIds.concat(location.objectives);
    let objectives = this.objectiveFactory.getObjectivesByIds(objectiveIds);
    let defenderObjectives = this.campaign.fleets[battle.defendingPlayers[0].fleetId].objectives;
    for (const objective of defenderObjectives) {
      if (objectives.find(o => o.type === objective.type))
        continue;
      objectives.push(objective);
    }
    return objectives;
  }

  public formChanged() {
    this.determineValidity();
    this.validityChange.emit(this.isValid());
  }

  private isValid() {
    let valid = this.issues.filter(x => x.severity === IssueSeverity.Error).length === 0;
    this.completeButtonOptions.disabled = !valid;
    this.determineResults();
    return valid;
  }

  private isBaseObjective(objective: Objective): boolean {
    return [301, 302, 303].includes(objective.id);
  }

  private getFleetsInBattle(battle: Battle): Fleet[] {
    return battle.attackingPlayers.map(x => x.fleetId).concat(battle.defendingPlayers.map(x => x.fleetId))
      .map(x => this.campaign.fleets[x]);
  }

  private determineResults() {

    for (let i = 0; i < this.battles.length; i++) {
      const battle = this.battles[i];
      if (this.attackerBattleResults[i].score >= 0 && this.attackerBattleResults[i].score !== null &&
        this.defenderBattleResults[i].score >= 0 && this.defenderBattleResults[i].score !== null &&
        this.attackerBattleResults[i].fleetPoints >= 0 &&
        this.defenderBattleResults[i].fleetPoints >= 0 &&
        this.battleObjectives[i] !== null) {
        let isBaseObjective = this.isBaseObjective(this.battleObjectives[i]);
        this.battleStates[i] = this.attackerBattleResults[i].score > this.defenderBattleResults[i].score
          ? BattleState.AttackersWon : BattleState.DefendersWon;
        if (this.battleStates[i] === BattleState.AttackersWon) {
          this.calculateBattleResults(this.attackerBattleResults[i], this.defenderBattleResults[i],
            isBaseObjective, this.campaign.locations.find(l => l.id === this.battles[i].locationId).baseAssaultBonus, true);
        } else {
          this.calculateBattleResults(this.defenderBattleResults[i], this.attackerBattleResults[i],
            isBaseObjective, this.campaign.locations.find(l => l.id === this.battles[i].locationId).baseAssaultBonus, false);
        }
      } else {
        this.attackerBattleResults[i].earnedPoints = null;
        this.attackerBattleResults[i].earnedXP = null;
        this.defenderBattleResults[i].earnedPoints = null;
        this.defenderBattleResults[i].earnedXP = null;
        this.battleStates[i] = BattleState.Declared;
      }
    }
  }

  private calculateBattleResults(winner: BattleResult, loser: BattleResult, isBaseObjective: boolean,
    baseAssaultBonus: number, winnerIsAttacker: boolean) {
    let mov = winner.score - loser.score;
    let winnerXP = 1;
    let loserXP = 2;

    // Winner gets 1 extra for every full 75 points in their MOV
    winnerXP += Math.floor(mov / 75);

    winner.earnedXP = winnerXP;
    loser.earnedXP = loserXP;

    if (winner.fleetPoints > loser.fleetPoints) {
      loser.earnedXP += Math.floor((winner.fleetPoints - loser.fleetPoints) / 25);
    } else if (loser.fleetPoints > winner.fleetPoints) {
      winner.earnedXP += Math.floor((loser.fleetPoints - winner.fleetPoints) / 25);
    }

    // Campaign points
    loser.earnedPoints = 0;
    winner.earnedPoints = !isBaseObjective ? 1 : (winnerIsAttacker ? 1 + baseAssaultBonus : 2);
  }

  private determineValidity() {
    this.issues = [];
    if (!this.campaign.fleets) {
      this.issues.push({
        severity: IssueSeverity.Error,
        text: "Still loading fleets..."
      });
      return;
    }

    for (let i = 0; i < this.battles.length; i++) {
      const battle = this.battles[i];
      if (this.attackerBattleResults[i].fleetPoints < 0) {
        this.issues.push({
          severity: IssueSeverity.Error,
          text: `${battle.title}: Attacker(s) total fleet points are incorrect.`
        });
        return;
      }
      if (this.defenderBattleResults[i].fleetPoints < 0) {
        this.issues.push({
          severity: IssueSeverity.Error,
          text: `${battle.title}: Defender(s) total fleet points are incorrect.`
        });
        return;
      }
      if (this.attackerBattleResults[i].score === null || this.attackerBattleResults[i].score < 0 ||
        this.attackerBattleResults[i].score > Math.max(200, this.defenderBattleResults[i].fleetPoints)) {
        this.issues.push({
          severity: IssueSeverity.Error,
          text: `${battle.title}: Attacker(s) score must be between 0 and 200 (or the defender's fleet point total).`
        });
        return;
      }
      if (this.defenderBattleResults[i].score === null || this.defenderBattleResults[i].score < 0 ||
        this.defenderBattleResults[i].score > Math.max(200, this.attackerBattleResults[i].fleetPoints)) {
        this.issues.push({
          severity: IssueSeverity.Error,
          text: `${battle.title}: Defender(s) score must be between 0 and 200 (or the defender's fleet point total).`
        });
        return;
      }
      if (!this.battleObjectives[i]) {
        this.issues.push({
          severity: IssueSeverity.Error,
          text: `${battle.title}: No objective has been chosen.`
        });
        return;
      }
    }
    for (const fleetId of Object.keys(this.fleetMods)) {
      const fleetMod = this.fleetMods[fleetId];
      if (fleetMod.tooManyVeterans()) {
        this.issues.push({
          severity: IssueSeverity.Error,
          text: `${this.campaign.fleets[fleetId].name} has selected too many ships/squadrons as veterans.`
        });
      }
    }
  }
}
