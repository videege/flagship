import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, NgModuleFactoryLoader, SystemJsNgModuleLoader } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { of } from 'rxjs';
import { map, first } from 'rxjs/operators';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { UIRouterModule, UIRouter, Transition } from '@uirouter/angular';
import { AppNavComponent } from './app-nav/app-nav.component';

import {
  MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule,
  MatGridListModule, MatCardModule, MatMenuModule, MatTableModule, MatDividerModule,
  MatDialogModule,
  MatRadioModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatExpansionModule,
  MatTooltipModule,
  MatButtonToggleModule,
  MatSlideToggle,
  MatSlideToggleModule,
  MatCheckboxModule
} from '@angular/material';

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

//trace.enable();

const STATES = [
  {
    name: 'notfound',
    url: '/404',
    views: {
      'content': { component: NotfoundComponent }
    },
    data: {
      title: 'Page Not Found'
    }
  },
  {
    name: 'fleets',
    url: '/fleets',
    views: {
      'content': { component: FleetsComponent }
    },
    data: {
      title: 'My Fleets'
    }
  },
  {
    name: 'fleets.fleet',
    url: '/:id',
    resolve: [
      {
        token: 'fleet',
        deps: [Transition, FleetService],
        resolveFn: (trans, fleetService) => {
          return fleetService.getFleet(trans.params().id).toPromise();
        }
      }
    ],
    views: {
      'content@': { component: FleetComponent },
      'toolbar@': { component: FleetToolbarComponent }
    },
    data: {
      title: null
    }
  },
  {
    name: 'fleets.fleet.ship',
    url: '/:shipId',
    resolve: [
      {
        token: 'ship',
        deps: [Transition, 'fleet'],
        resolveFn: (trans, fleet: Fleet) => {
          return fleet.ships[trans.params().shipId];
        }
      }
    ],
    views: {
      'content@': { component: ShipEditorComponent }
    },
    data: {
      title: null
    }
  },
  {
    name: 'fleets.fleet.ship.statistics',
    url: '/statistics',
    views: {
      'content@': { component: ShipStatisticsComponent }
    },
    data: {
      title: 'Statistics'
    }
  },
  { name: 'ships.**', url: '/ships', loadChildren: './ships/ships.module#ShipsModule' }
];

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
    ShipStatisticsComponent
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
    NgxChartsModule
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
