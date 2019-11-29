import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DefaultToolbarComponent } from '../shared/default-toolbar/default-toolbar.component';
import { FlagshipRouteData } from "../app.route-data";
import { FleetSearchComponent } from './fleet-search/fleet-search.component';

const defaultToolbar = { path: '', outlet: 'toolbar', component: DefaultToolbarComponent };

const SEARCH_ROUTES: Routes = [
    {
        path: '', children: [
            {
                path: '', component: FleetSearchComponent,
                data: { nav: new FlagshipRouteData('Search Fleets', null, null) }
            },
            defaultToolbar
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(SEARCH_ROUTES)],
    exports: [RouterModule]
})
export class SearchRoutingModule { }
