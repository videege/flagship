import { Routes, ActivatedRouteSnapshot } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DefaultToolbarComponent } from './shared/default-toolbar/default-toolbar.component';
import { NotfoundComponent } from './notfound/notfound.component';

const defaultToolbar = { path: '', outlet: 'toolbar', component: DefaultToolbarComponent };

export const APP_ROUTES: Routes = [
    { path: 'login', children: [
        { path: '', component: LoginComponent },
        defaultToolbar
    ]},
    { 
        path: 'fleets', 
        loadChildren: () => import('./fleets/fleets.module').then(m => m.FleetsModule)
    },
    // default routes
    { path: "", redirectTo: "/fleets", pathMatch: 'full' },
    { path: '**', children: [
        { path: '', component: NotfoundComponent },
        defaultToolbar
    ]},

];