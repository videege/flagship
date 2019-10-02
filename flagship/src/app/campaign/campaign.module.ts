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



@NgModule({
  declarations: [CampaignListComponent, CampaignDashboardComponent, CampaignEditorComponent, CampaignTeamComponent, PlayerCreatorDialogComponent, InviteComponent],
  imports: [
    CommonModule,
    SharedModule,
    CampaignRoutingModule,
    MglTimelineModule,
    AppMaterialModule
  ],
  providers: [
    CampaignResolver,
    InviteResolver
  ], 
  entryComponents: [
    CampaignEditorComponent,
    PlayerCreatorDialogComponent
  ]
})
export class CampaignModule { }
