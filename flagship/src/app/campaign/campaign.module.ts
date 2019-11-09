import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignDashboardComponent } from './campaign-dashboard/campaign-dashboard.component';
import { MglTimelineModule } from 'angular-mgl-timeline';
import { CampaignRoutingModule, CampaignResolver, InviteResolver } from './campaign-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CampaignEditorComponent } from './campaign-editor/campaign-editor.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { CampaignTeamComponent } from './campaign-team/campaign-team.component';
import { PlayerCreatorDialogComponent } from './player-creator-dialog/player-creator-dialog.component';
import { InviteComponent } from './invite/invite.component';
import { MatProgressButtonsModule } from 'mat-progress-buttons';
import { CampaignLocationsComponent } from './campaign-locations/campaign-locations.component';
import { CampaignSetupDialogComponent } from './campaign-setup-dialog/campaign-setup-dialog.component';
import { IssuesListComponent } from './issues-list/issues-list.component';
import { LocationControlDialogComponent } from './location-control-dialog/location-control-dialog.component';
import { EventTimelineComponent } from './event-timeline/event-timeline.component';
import { EventComponent } from './event/event.component';
import { CampaignInfoComponent } from './campaign-info/campaign-info.component';
import { CampaignSetupComponent } from './campaign-setup/campaign-setup.component';
import { CampaignTurnComponent } from './campaign-turn/campaign-turn.component';
import { StrategyPhaseComponent } from './strategy-phase/strategy-phase.component';
import { BattlePhaseComponent } from './battle-phase/battle-phase.component';
import { ManagementPhaseComponent } from './management-phase/management-phase.component';
import { PivotalBattlePhaseComponent } from './pivotal-battle-phase/pivotal-battle-phase.component';
import { FinishedCampaignComponent } from './finished-campaign/finished-campaign.component';


@NgModule({
  declarations: [CampaignListComponent, CampaignDashboardComponent, CampaignEditorComponent, CampaignTeamComponent, PlayerCreatorDialogComponent, InviteComponent, CampaignLocationsComponent, CampaignSetupDialogComponent, IssuesListComponent, LocationControlDialogComponent, EventTimelineComponent, EventComponent, CampaignInfoComponent, CampaignSetupComponent, CampaignTurnComponent, StrategyPhaseComponent, BattlePhaseComponent, ManagementPhaseComponent, PivotalBattlePhaseComponent, FinishedCampaignComponent],
  imports: [
    CommonModule,
    SharedModule,
    CampaignRoutingModule,
    MglTimelineModule,
    AppMaterialModule,
    MatProgressButtonsModule
  ],
  providers: [
    CampaignResolver,
    InviteResolver
  ], 
  entryComponents: [
    CampaignEditorComponent,
    PlayerCreatorDialogComponent,
    CampaignSetupDialogComponent,
    LocationControlDialogComponent
  ]
})
export class CampaignModule { }
