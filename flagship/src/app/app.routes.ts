import { Routes, ActivatedRouteSnapshot } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
import { FleetsComponent } from './fleets/fleets.component';
import { FleetComponent } from './fleet/fleet.component';
import { ShipEditorComponent } from './ship-editor/ship-editor.component';
import { ShipStatisticsComponent } from './ship-statistics/ship-statistics.component';
import { LoginComponent } from './login/login.component';

import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Fleet } from './domain/fleet';
import { Observable } from 'rxjs';
import { FleetService } from './fleet.service';
import { Ship } from './domain/ship';
import { map } from 'rxjs/operators';
import { DefaultToolbarComponent } from './default-toolbar/default-toolbar.component';
import { FleetToolbarComponent } from './fleet-toolbar/fleet-toolbar.component';

@Injectable()
export class FleetResolver implements Resolve<Fleet> {

    constructor(private fleetService: FleetService) {
    }

    resolve(route: ActivatedRouteSnapshot): Fleet | Observable<Fleet> {
       return this.fleetService.getFleet(route.params.id);
    }
}

@Injectable()
export class ShipResolver implements Resolve<Ship> {
    constructor(private fleetService: FleetService) {
    }

    resolve(route: ActivatedRouteSnapshot): Ship | Observable<Ship> {
        return this.fleetService.getFleet(route.params.id)
            .pipe(
                map(f => f.ships[route.params.shipId])
            );
    }
}

const defaultToolbar = { path: '', outlet: 'toolbar', component: DefaultToolbarComponent };
const fleetToolbar = { path: '', outlet: 'toolbar', component: FleetToolbarComponent, resolve: {fleet: FleetResolver}};


export const APP_ROUTES: Routes = [
    { path: 'login', children: [
        { path: '', component: LoginComponent },
        defaultToolbar
    ]},
    { path: 'fleets', children: [
        { path: '', component: FleetsComponent },
        defaultToolbar
    ]},
    { path: 'fleets/:id', children: [
        { path: '', component: FleetComponent, resolve: { fleet: FleetResolver } },
        fleetToolbar
    ]},
    { path: 'fleets/:id/ships/:shipId', children: [
        { path: '', component: ShipEditorComponent, resolve: { ship: ShipResolver } },
        fleetToolbar
    ]},
    { path: 'fleets/:id/ships/:shipId/statistics', children: [
        { path: '', component: ShipStatisticsComponent, resolve: { ship: ShipResolver } },
        fleetToolbar
    ]},
    // default routes
    { path: "", redirectTo: "/fleets", pathMatch: 'full' },
    { path: '**', children: [
        { path: '', component: NotfoundComponent },
        defaultToolbar
    ]},

];