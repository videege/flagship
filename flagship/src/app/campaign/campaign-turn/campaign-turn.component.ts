import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { Campaign } from 'src/app/domain/campaign/campaign';
import { CampaignState } from 'src/app/domain/campaign/campaignState';
import { Faction } from 'src/app/domain/faction';
import { Phase } from 'src/app/domain/campaign/phase';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatVerticalStepper } from '@angular/material';
import { StrategyPhaseComponent } from '../strategy-phase/strategy-phase.component';
import { ManagementCompletedEvent } from '../management-phase/management-phase.component';
import { CampaignService } from 'src/app/core/services/campaign.service';

@Component({
  selector: 'flagship-campaign-turn',
  templateUrl: './campaign-turn.component.html',
  styleUrls: ['./campaign-turn.component.scss']
})
export class CampaignTurnComponent implements OnInit, OnChanges {

  @Input() campaign: Campaign;
  @ViewChild('stepper', { static: false }) stepper: MatVerticalStepper;

  factions = Faction;
  phases = Phase;

  currentState: CampaignState;
  phaseName: string;

  strategyValid = false;
  battleValid = false;
  managementValid = false;
  pbValid = false;
  currentStep = 0;

  constructor(private campaignService: CampaignService) {

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
      case Phase.PivotalBattle:
      case Phase.ClimacticBattle:
        return 3;
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
      case Phase.PivotalBattle:
        return "Pivotal Battle";
      case Phase.ClimacticBattle:
        return "Climactic Battle"; 
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
    if (event.nextPhase === Phase.Strategy) {
      this.setup();
      this.currentStep = this.phaseToStepperIndex(Phase.Strategy);
    } else {
      this.currentStep = this.phaseToStepperIndex(Phase.PivotalBattle);
    }
  }

  pbValidityChanged(valid: boolean) {
    this.pbValid = valid;
  }

  pbCompleted() {
    // Determine if the game is over
   this.currentState = this.campaign.currentState();
   if (this.currentState.phase !== Phase.Finished) {
     this.setup();
     this.currentStep = this.phaseToStepperIndex(Phase.Strategy);
   }
  }
}
