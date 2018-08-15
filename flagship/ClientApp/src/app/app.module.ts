import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {FlexLayoutModule} from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { UIRouterModule, UIRouter } from '@uirouter/angular';
import { AppNavComponent } from './app-nav/app-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, 
  MatGridListModule, MatCardModule, MatMenuModule } from '@angular/material';
import { FleetsComponent } from './fleets/fleets.component';

const STATES = [
  //{ name: '', url: '/', component: AppNavComponent },
  { name: 'fleets', url: '/fleets', component: FleetsComponent }
];

export function uiRouterConfig(router: UIRouter, injector: Injector) {
  router.urlService.rules.otherwise({ state: 'fleets' });
}

@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    FleetsComponent
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
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
