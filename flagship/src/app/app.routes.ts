import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DefaultToolbarComponent } from './shared/default-toolbar/default-toolbar.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoggedInGuard } from 'ngx-auth-firebaseui';
import { FlagshipRouteData } from './app.route-data';

const defaultToolbar = { path: '', outlet: 'toolbar', component: DefaultToolbarComponent };

export const APP_ROUTES: Routes = [
    { path: 'login', children: [
        { path: '', component: LoginComponent, data: {
            nav: new FlagshipRouteData('Login', null, null)
        } },
        defaultToolbar
    ]},
    { 
        path: 'fleets', 
        loadChildren: () => import('./fleets/fleets.module').then(m => m.FleetsModule),
        canActivate: [LoggedInGuard]
    },
    // default routes
    { path: "", redirectTo: "/fleets", pathMatch: 'full' },
    { path: '**', children: [
        { path: '', component: NotfoundComponent },
        defaultToolbar
    ]},

];