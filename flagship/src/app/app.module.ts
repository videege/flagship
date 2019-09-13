import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, NgModuleFactoryLoader, SystemJsNgModuleLoader } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { UIRouterModule, UIRouter, Transition } from '@uirouter/angular';
import { AppNavComponent } from './app-nav/app-nav.component';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggle, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';

import { FleetsComponent } from './fleets/fleets.component';
import { FleetComponent } from './fleet/fleet.component';
import { FleetService } from './fleet.service';
import { ShipsModule } from './ships/ships.module';
import { NotfoundComponent } from './notfound/notfound.component';
import { trace } from "@uirouter/angular";
import { FleetToolbarComponent } from './fleet-toolbar/fleet-toolbar.component';
import { ShipDetailComponent } from './ship-detail/ship-detail.component';
import { BatteryComponent } from './battery/battery.component';
import { UpgradeSummaryComponent } from './upgrade-summary/upgrade-summary.component';
import { ShipEditorComponent } from './ship-editor/ship-editor.component';
import { ShipCardComponent } from './ship-card/ship-card.component';
import { UpgradeSelectorComponent } from './upgrade-selector/upgrade-selector.component';
import { UpgradeIconDirective } from './upgrade-icon.directive';
import { ShipSelectorComponent } from './ship-selector/ship-selector.component';
import { Fleet } from './domain/fleet';
import { FleetEditorComponent } from './fleet-editor/fleet-editor.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SquadronSelectorComponent } from './squadron-selector/squadron-selector.component';
import { SquadronDetailComponent } from './squadron-detail/squadron-detail.component';
import { SquadronsListComponent } from './squadrons-list/squadrons-list.component';
import { AlertComponent } from './alert/alert.component';
import { ObjectiveSelectorComponent } from './objective-selector/objective-selector.component';
import { ObjectiveComponent } from './objective/objective.component';
import { ShipStatisticsComponent } from './ship-statistics/ship-statistics.component';
import { RerollModificationComponent } from './reroll-modification/reroll-modification.component';
import { AdditionModificationComponent } from './addition-modification/addition-modification.component';
import { FishingCalculatorComponent } from './fishing-calculator/fishing-calculator.component';
import { MethodologyComponent } from './methodology/methodology.component';
import { STATES } from './app.states';
import { FooterComponent } from './footer/footer.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MomentModule } from 'ngx-moment';
import { AppleInstallPromptComponent } from './apple-install-prompt/apple-install-prompt.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { AngularFireAuthModule } from '@angular/fire/auth';

//trace.enable();

export function uiRouterConfig(router: UIRouter, injector: Injector) {
  router.urlService.rules.initial({ state: 'fleets' });
  router.urlService.rules.otherwise({ state: 'notfound' });
}

@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    FleetsComponent,
    FleetComponent,
    NotfoundComponent,
    FleetToolbarComponent,
    ShipDetailComponent,
    BatteryComponent,
    UpgradeSummaryComponent,
    ShipEditorComponent,
    ShipCardComponent,
    UpgradeSelectorComponent,
    UpgradeIconDirective,
    ShipSelectorComponent,
    FleetEditorComponent,
    SquadronSelectorComponent,
    SquadronDetailComponent,
    SquadronsListComponent,
    AlertComponent,
    ObjectiveSelectorComponent,
    ObjectiveComponent,
    ShipStatisticsComponent,
    RerollModificationComponent,
    AdditionModificationComponent,
    FishingCalculatorComponent,
    MethodologyComponent,
    FooterComponent,
    AppleInstallPromptComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UIRouterModule.forRoot({ states: STATES, config: uiRouterConfig }),
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatDividerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatRadioModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    EcoFabSpeedDialModule,
    MatBottomSheetModule,
    NgxChartsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MomentModule
  ],
  providers: [
    { provide: NgModuleFactoryLoader, useClass: SystemJsNgModuleLoader }
  ],
  entryComponents: [
    ShipCardComponent,
    ShipSelectorComponent,
    SquadronSelectorComponent,
    UpgradeSelectorComponent,
    FleetEditorComponent,
    ObjectiveSelectorComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
