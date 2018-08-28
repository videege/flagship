import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, NgModuleFactoryLoader, SystemJsNgModuleLoader } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {FlexLayoutModule} from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { UIRouterModule, UIRouter, Transition } from '@uirouter/angular';
import { AppNavComponent } from './app-nav/app-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, 
  MatGridListModule, MatCardModule, MatMenuModule, MatTableModule } from '@angular/material';
import { FleetsComponent } from './fleets/fleets.component';
import { FleetComponent } from './fleet/fleet.component';
import { FleetService } from './fleet.service';
import { ShipsModule } from './ships/ships.module';
import { NotfoundComponent } from './notfound/notfound.component';
import {trace} from "@uirouter/angular";
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
    views: {
      'content@': {
        component: FleetComponent,
        resolve: [
          {
            token: 'fleet',
            deps: [Transition, FleetService],
            resolveFn: (trans, fleetService) => {
              fleetService.getFleet(trans.params().id);
            }
          }
        ]
      }
    },
    data: {
      title: (fleet: Fleet) => fleet.name
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
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UIRouterModule.forRoot({ states: STATES, config: uiRouterConfig }),
    LayoutModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule
  ],
  providers: [
    { provide: NgModuleFactoryLoader, useClass: SystemJsNgModuleLoader }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
