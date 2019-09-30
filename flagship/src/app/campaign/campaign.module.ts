import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignDashboardComponent } from './campaign-dashboard/campaign-dashboard.component';
import { MglTimelineModule } from 'angular-mgl-timeline';
import { CampaignRoutingModule, CampaignResolver } from './campaign-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CampaignEditorComponent } from './campaign-editor/campaign-editor.component';
import { AppMaterialModule } from '../app-material/app-material.module';



@NgModule({
  declarations: [CampaignListComponent, CampaignDashboardComponent, CampaignEditorComponent],
  imports: [
    CommonModule,
    SharedModule,
    CampaignRoutingModule,
    MglTimelineModule,
    AppMaterialModule
  ],
  providers: [
    CampaignResolver
  ], 
  entryComponents: [
    CampaignEditorComponent
  ]
})
export class CampaignModule { }
