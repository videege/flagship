import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FleetService } from './services/fleet.service';
import { CampaignState } from '../domain/campaign/campaignState';
import { BreadcrumbService } from './services/breadcrumb.service';
import { SettingsService } from './services/settings.service';
import { UserAvatarComponent } from './user-avatar/user-avatar.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { NotesService } from './services/notes.service';
import { NotesComponent } from './notes/notes.component';



@NgModule({
  declarations: [
    UserAvatarComponent, 
    NotesComponent
  ],
  providers: [
    FleetService,
    CampaignState,
    BreadcrumbService,
    SettingsService,
    NotesService
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ], 
  exports: [
    UserAvatarComponent,
    NotesComponent
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error("Core module incorrectly imported in non-root module.");
    }
  }
 }
