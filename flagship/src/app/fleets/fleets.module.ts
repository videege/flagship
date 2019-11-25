import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FleetsRoutingModule, FleetResolver, ShipResolver } from './fleets-routing.module';
import { FleetListComponent } from './fleet-list/fleet-list.component';
import { FleetComponent } from './fleet/fleet.component';
import { FleetToolbarComponent } from './fleet-toolbar/fleet-toolbar.component';
import { ShipDetailComponent } from './ship-detail/ship-detail.component';
import { UpgradeSummaryComponent } from './upgrade-summary/upgrade-summary.component';
import { ShipEditorComponent } from './ship-editor/ship-editor.component';
import { ShipCardComponent } from './ship-card/ship-card.component';
import { UpgradeSelectorComponent } from './upgrade-selector/upgrade-selector.component';
import { ShipSelectorComponent } from './ship-selector/ship-selector.component';
import { FleetEditorComponent } from './fleet-editor/fleet-editor.component';
import { SquadronSelectorComponent } from './squadron-selector/squadron-selector.component';
import { SquadronsListComponent } from './squadrons-list/squadrons-list.component';
import { ObjectiveSelectorComponent } from './objective-selector/objective-selector.component';
import { ObjectiveComponent } from './objective/objective.component';
import { ShipStatisticsComponent } from './ship-statistics/ship-statistics.component';
import { RerollModificationComponent } from './reroll-modification/reroll-modification.component';
import { FishingCalculatorComponent } from './fishing-calculator/fishing-calculator.component';
import { MethodologyComponent } from './methodology/methodology.component';
import { AdditionModificationComponent } from './addition-modification/addition-modification.component';
import { SharedModule } from '../shared/shared.module';
import { AppMaterialModule } from '../app-material/app-material.module';
import { CustomCommanderComponent } from './custom-commander/custom-commander.component';
import { CustomAbilitySelectorComponent } from './custom-ability-selector/custom-ability-selector.component';


@NgModule({
  declarations: [
    FleetListComponent,
    FleetComponent,
    FleetToolbarComponent,
    ShipDetailComponent,
    UpgradeSummaryComponent,
    ShipEditorComponent,
    ShipCardComponent,
    UpgradeSelectorComponent,
    ShipSelectorComponent,
    FleetEditorComponent,
    SquadronSelectorComponent,
    SquadronsListComponent,
    ObjectiveSelectorComponent,
    ObjectiveComponent,
    ShipStatisticsComponent,
    RerollModificationComponent,
    AdditionModificationComponent,
    FishingCalculatorComponent,
    MethodologyComponent,
    CustomCommanderComponent,
    CustomAbilitySelectorComponent,
  ],
  imports: [
    CommonModule,
    FleetsRoutingModule,
    SharedModule,
    AppMaterialModule
  ],
  providers: [
    FleetResolver,
    ShipResolver
  ],
  entryComponents: [
    ShipCardComponent,
    ShipSelectorComponent,
    SquadronSelectorComponent,
    UpgradeSelectorComponent,
    FleetEditorComponent,
    ObjectiveSelectorComponent,
    CustomAbilitySelectorComponent
  ],
})
export class FleetsModule { }
