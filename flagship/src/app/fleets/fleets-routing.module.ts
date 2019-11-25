import { Routes, ActivatedRouteSnapshot, RouterModule, Data } from '@angular/router';
import { FleetListComponent } from './fleet-list/fleet-list.component';
import { FleetComponent } from './fleet/fleet.component';
import { ShipEditorComponent } from './ship-editor/ship-editor.component';
import { ShipStatisticsComponent } from './ship-statistics/ship-statistics.component';

import { Resolve } from '@angular/router';
import { Injectable, NgModule } from '@angular/core';
import { Fleet } from '../domain/game/fleet';
import { Observable } from 'rxjs';
import { FleetService } from '../core/services/fleet.service';
import { Ship } from '../domain/game/ship';
import { map } from 'rxjs/operators';
import { DefaultToolbarComponent } from '../shared/default-toolbar/default-toolbar.component';
import { FleetToolbarComponent } from './fleet-toolbar/fleet-toolbar.component';
import { FlagshipRouteData } from "../app.route-data";

@Injectable()
export class FleetResolver implements Resolve<Fleet> {

    constructor(private fleetService: FleetService) {
    }

    resolve(route: ActivatedRouteSnapshot): Fleet | Observable<Fleet> {
        return this.fleetService.getFleetForUser(route.params.id);
    }
}

@Injectable()
export class ShipResolver implements Resolve<Ship> {
    constructor(private fleetService: FleetService) {
    }

    resolve(route: ActivatedRouteSnapshot): Ship | Observable<Ship> {
        return this.fleetService.getFleetForUser(route.params.id)
            .pipe(
                map(f => f.ships.find(x => x.uid === route.params.shipId))
            );
    }
}

const defaultToolbar = { path: '', outlet: 'toolbar', component: DefaultToolbarComponent };
const fleetToolbar = { path: '', outlet: 'toolbar', component: FleetToolbarComponent, resolve: { fleet: FleetResolver } };


const FLEET_ROUTES: Routes = [
    {
        path: '', children: [
            {
              path: '', component: FleetListComponent,
              data: { nav: new FlagshipRouteData('My Fleets', null, null) }
            },
            defaultToolbar
        ]
    },
    {
        path: ':id', children: [
            { path: '', component: FleetComponent, resolve: { fleet: FleetResolver },
              data: { nav: new FlagshipRouteData((data: Data) => {
                  return (data['fleet'] as Fleet).name;
              }, 'Fleets', '/fleets')}
            },
            fleetToolbar
        ]
    },
    {
        path: ':id/ships/:shipId', children: [
            { 
                path: '', component: ShipEditorComponent, resolve: { ship: ShipResolver },
                data: { nav: new FlagshipRouteData('Ship', (data: Data) => {
                    return (data['ship'] as Ship).fleet.name;
                }, (data: Data) => {
                    let ship = data['ship'] as Ship;
                    return `/fleets/${ship.fleet.id}`;
                }) }
            },
            fleetToolbar
        ]
    },
    {
        path: ':id/ships/:shipId/statistics', children: [
            { 
                path: '', component: ShipStatisticsComponent, resolve: { ship: ShipResolver },
                data: { nav: new FlagshipRouteData('Statistics', 'Ship', (data: Data) => {
                    let ship = data['ship'] as Ship;
                    let shipId = ship.uid;
                    return `/fleets/${ship.fleet.id}/ships/${shipId}`;
                }) }
            },
            fleetToolbar
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(FLEET_ROUTES)],
    exports: [RouterModule]
})
export class FleetsRoutingModule { }
