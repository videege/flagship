import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { Campaign } from 'src/app/domain/campaign/campaign';
import { CampaignState } from 'src/app/domain/campaign/campaignState';
import { Faction } from 'src/app/domain/faction';
import { Phase } from 'src/app/domain/campaign/phase';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatVerticalStepper } from '@angular/material';
import { StrategyPhaseComponent } from '../strategy-phase/strategy-phase.component';
import { ManagementCompletedEvent } from '../management-phase/management-phase.component';

@Component({
  selector: 'flagship-campaign-turn',
  templateUrl: './campaign-turn.component.html',
  styleUrls: ['./campaign-turn.component.css']
})
export class CampaignTurnComponent implements OnInit, OnChanges {

  @Input() campaign: Campaign;
  @ViewChild('stepper', { static: false }) stepper: MatVerticalStepper;

  factions = Faction;
  phases = Phase;

  currentState: CampaignState;
  phaseName: string;
  teamWithInitiative: Faction;

  strategyValid = false;
  battleValid = false;
  managementValid = false;
  currentStep = 0;

  constructor() {
    
  }

  ngOnInit() {
    this.setup();
    this.currentStep = this.phaseToStepperIndex(this.currentState.phase);
  }

  ngOnChanges(changes: SimpleChanges): void {
    //)
    this.setup();
  }

  setup() {
    this.currentState = this.campaign.currentState();
    this.teamWithInitiative = this.campaign.empire.campaignPoints < this.campaign.rebels.campaignPoints
      ? Faction.Empire : Faction.Rebels;
    this.phaseName = this.getPhaseName(this.currentState.phase);
  }

  private phaseToStepperIndex(phase: Phase): number {
    switch (phase) {
      case Phase.Strategy:
        return 0;
      case Phase.Battle:
        return 1;
      case Phase.Management:
        return 2;
      default:
        return 0;
    }
  }

  private getPhaseName(phase: Phase): string {
    switch (phase) {
      case Phase.Strategy:
        return "Strategy";
      case Phase.Battle:
        return "Battle";
      case Phase.Management:
        return "Management";
      default:
        return "";
    }
  }

  strategyValidityChanged(valid: boolean) {
    this.strategyValid = valid;
  }

  strategyCompleted() {
    this.currentStep = this.phaseToStepperIndex(Phase.Battle);
  }

  battleValidityChanged(valid: boolean) {
    this.battleValid = valid;
  }

  battleCompleted() {
    this.currentStep = this.phaseToStepperIndex(Phase.Management);
  }

  managementValidityChanged(valid: boolean) {
    this.managementValid = valid;
  }

  managementCompleted(event: ManagementCompletedEvent) {
    this.currentStep = this.phaseToStepperIndex(Phase.Management);
  }
}
