import { Routes, ActivatedRouteSnapshot, RouterModule } from '@angular/router';
import { FleetListComponent } from './fleet-list/fleet-list.component';
import { FleetComponent } from './fleet/fleet.component';
import { ShipEditorComponent } from './ship-editor/ship-editor.component';
import { ShipStatisticsComponent } from './ship-statistics/ship-statistics.component';

import { Resolve } from '@angular/router';
import { Injectable, NgModule } from '@angular/core';
import { Fleet } from '../domain/fleet';
import { Observable } from 'rxjs';
import { FleetService } from '../fleet.service';
import { Ship } from '../domain/ship';
import { map } from 'rxjs/operators';
import { DefaultToolbarComponent } from '../shared/default-toolbar/default-toolbar.component';
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
const fleetToolbar = { path: '', outlet: 'toolbar', component: FleetToolbarComponent, resolve: { fleet: FleetResolver } };


const FLEET_ROUTES: Routes = [
    {
        path: '', children: [
            { path: '', component: FleetListComponent, data: { title: 'My Fleets' } },
            defaultToolbar
        ], data: { title: 'My Fleets' }
    },
    {
        path: ':id', children: [
            { path: '', component: FleetComponent, resolve: { fleet: FleetResolver } },
            fleetToolbar
        ]
    },
    {
        path: ':id/ships/:shipId', children: [
            { path: '', component: ShipEditorComponent, resolve: { ship: ShipResolver } },
            fleetToolbar
        ]
    },
    {
        path: ':id/ships/:shipId/statistics', children: [
            { path: '', component: ShipStatisticsComponent, resolve: { ship: ShipResolver } },
            fleetToolbar
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(FLEET_ROUTES)],
    exports: [RouterModule]
})
export class FleetsRoutingModule { }