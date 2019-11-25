import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FleetService } from './services/fleet.service';
import { CampaignState } from '../domain/campaign/campaignState';
import { BreadcrumbService } from './services/breadcrumb.service';
import { SettingsService } from './services/settings.service';
import { UserAvatarComponent } from './user-avatar/user-avatar.component';
import { AppMaterialModule } from '../app-material/app-material.module';



@NgModule({
  declarations: [UserAvatarComponent],
  providers: [
    FleetService,
    CampaignState,
    BreadcrumbService,
    SettingsService
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ], 
  exports: [
    UserAvatarComponent
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error("Core module incorrectly imported in non-root module.");
    }
  }
 }
