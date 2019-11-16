import { DefaultToolbarComponent } from '../shared/default-toolbar/default-toolbar.component';
import { Routes, RouterModule } from '@angular/router';
import { FlagshipRouteData } from '../app.route-data';
import { NgModule } from '@angular/core';
import { SettingsComponent } from './settings/settings.component';


const defaultToolbar = { path: '', outlet: 'toolbar', component: DefaultToolbarComponent };

const SETTINGS_ROUTES: Routes = [
    {
        path: '', children: [
            {
              path: '', component: SettingsComponent,
              data: { nav: new FlagshipRouteData('Settings', null, null) }
            },
            defaultToolbar
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(SETTINGS_ROUTES)],
    exports: [RouterModule]
})
export class SettingsRoutingModule { }