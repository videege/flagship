import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FleetService } from './services/fleet.service';



@NgModule({
  declarations: [],
  providers: [
    FleetService
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error("Core module incorrectly imported in non-root module.");
    }
  }
 }
