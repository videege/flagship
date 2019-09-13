import { NotfoundComponent } from './notfound/notfound.component';
import { FleetsComponent } from './fleets/fleets.component';
import { Transition } from '@uirouter/core';
import { FleetService } from './fleet.service';
import { FleetComponent } from './fleet/fleet.component';
import { FleetToolbarComponent } from './fleet-toolbar/fleet-toolbar.component';
import { Fleet } from './domain/fleet';
import { ShipEditorComponent } from './ship-editor/ship-editor.component';
import { ShipStatisticsComponent } from './ship-statistics/ship-statistics.component';

export const STATES = [
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
                resolveFn: fleetResolver
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
                resolveFn: shipResolver
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

export function shipResolver(trans, fleet: Fleet) {
        return fleet.ships[trans.params().shipId]; 
}

export function fleetResolver(trans, fleetService) {
    
        return fleetService.getFleet(trans.params().id).toPromise();

}
