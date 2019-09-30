import { Routes, ActivatedRouteSnapshot, RouterModule, Data } from '@angular/router';

import { Resolve } from '@angular/router';
import { Injectable, NgModule } from '@angular/core';
import { Fleet } from '../domain/fleet';
import { Observable } from 'rxjs';
import { Ship } from '../domain/ship';
import { map } from 'rxjs/operators';
import { DefaultToolbarComponent } from '../shared/default-toolbar/default-toolbar.component';
import { FlagshipRouteData } from "../app.route-data";
import { Campaign } from '../domain/campaign/campaign';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignDashboardComponent } from './campaign-dashboard/campaign-dashboard.component';
import { CampaignService } from '../core/services/campaign.service';

@Injectable()
export class CampaignResolver implements Resolve<Campaign> {

    constructor(private campaignService: CampaignService) {
    }

    resolve(route: ActivatedRouteSnapshot): Campaign | Observable<Campaign> {
        return this.campaignService.getCampaignForUser(route.params.id);
    }
}

const defaultToolbar = { path: '', outlet: 'toolbar', component: DefaultToolbarComponent };

const CAMPAIGN_ROUTES: Routes = [
    {
        path: '', children: [
            {
              path: '', component: CampaignListComponent,
              data: { nav: new FlagshipRouteData('My Campaigns', null, null) }
            },
            defaultToolbar
        ]
    },
    {
        path: ':id', children: [
            { path: '', component: CampaignDashboardComponent, resolve: { campaign: CampaignResolver },
              data: { nav: new FlagshipRouteData((data: Data) => {
                  return (data['campaign'] as Campaign).name;
              }, 'Campaigns', '/campaigns')}
            },
            defaultToolbar
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(CAMPAIGN_ROUTES)],
    exports: [RouterModule]
})
export class CampaignRoutingModule { }