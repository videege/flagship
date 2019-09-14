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

export const APP_ROUTES: Routes = [
    { path: "login", component: LoginComponent },
    { path: 'fleets', component: FleetsComponent },
    { path: 'fleets/:id', component: FleetComponent, resolve: { fleet: FleetResolver } },
    { path: 'fleets/:id/ships/:shipId', component: ShipEditorComponent, resolve: { ship: ShipResolver } },
    { path: 'fleets/:id/ships/:shipId/statistics', component: ShipStatisticsComponent, resolve: { ship: ShipResolver }},
    { path: "", redirectTo: "/fleets", pathMatch: 'full' },
    { path: "**", component: NotfoundComponent }
];