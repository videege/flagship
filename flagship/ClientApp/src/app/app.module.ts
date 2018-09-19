import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, NgModuleFactoryLoader, SystemJsNgModuleLoader } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {FlexLayoutModule} from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { UIRouterModule, UIRouter, Transition } from '@uirouter/angular';
import { AppNavComponent } from './app-nav/app-nav.component';

import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, 
  MatGridListModule, MatCardModule, MatMenuModule, MatTableModule, MatDividerModule } from '@angular/material';

import { FleetsComponent } from './fleets/fleets.component';
import { FleetComponent } from './fleet/fleet.component';
import { FleetService } from './fleet.service';
import { ShipsModule } from './ships/ships.module';
import { NotfoundComponent } from './notfound/notfound.component';
import {trace} from "@uirouter/angular";
import { FleetToolbarComponent } from './fleet-toolbar/fleet-toolbar.component';
import { ShipDetailComponent } from './ship-detail/ship-detail.component';
import { BatteryComponent } from './battery/battery.component';
import { UpgradeSummaryComponent } from './upgrade-summary/upgrade-summary.component';
trace.enable();

const STATES = [
  { name: 'notfound',
    url: '/404',
    views: {
      'content': { component: NotfoundComponent }
    },
    data: {
      title: 'Page Not Found'
    }
  },
  { name: 'fleets',
    url: '/fleets',
    views: {
      'content': { component: FleetsComponent }
    },
    data: {
      title: 'My Fleets'
    }
  },
  { name: 'fleets.fleet',
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
    UpgradeSummaryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UIRouterModule.forRoot({ states: STATES, config: uiRouterConfig }),
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatDividerModule
  ],
  providers: [
    { provide: NgModuleFactoryLoader, useClass: SystemJsNgModuleLoader }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
