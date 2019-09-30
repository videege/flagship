import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, NgModuleFactoryLoader, SystemJsNgModuleLoader } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MglTimelineModule } from 'angular-mgl-timeline';

import { AppComponent } from './app.component';
//import { UIRouterModule, UIRouter, Transition } from '@uirouter/angular';
import { RouterModule } from '@angular/router';
import { AppNavComponent } from './app-nav/app-nav.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { FooterComponent } from './footer/footer.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MomentModule } from 'ngx-moment';
import { AppleInstallPromptComponent } from './apple-install-prompt/apple-install-prompt.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { LoginComponent } from './login/login.component';
import { APP_ROUTES } from './app.routes';
import { SharedModule } from './shared/shared.module';
import { AppMaterialModule } from './app-material/app-material.module';
import { CoreModule } from './core/core.module';
import { UpdatePromptComponent } from './update-prompt/update-prompt.component';

export function appNameFactory() {
  return 'flagship-armada';
}

@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    NotfoundComponent,
    FooterComponent,
    AppleInstallPromptComponent,
    LoginComponent,
    UpdatePromptComponent
  ],
  entryComponents: [
    AppleInstallPromptComponent,
    UpdatePromptComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    //UIRouterModule.forRoot({ states: STATES, config: uiRouterConfig }),
    RouterModule.forRoot(APP_ROUTES, { enableTracing: true }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    NgxAuthFirebaseUIModule.forRoot(environment.firebase, appNameFactory,
      {
        enableFirestoreSync: true, // enable/disable autosync users with firestore
        toastMessageOnAuthSuccess: true, // whether to open/show a snackbar message on auth success - default : true
        toastMessageOnAuthError: true, // whether to open/show a snackbar message on auth error - default : true
        authGuardFallbackURL: '/login', // url for unauthenticated users - to use in combination with canActivate feature on a route
        authGuardLoggedInURL: '/loggedin', // url for authenticated users - to use in combination with canActivate feature on a route
        passwordMaxLength: 60, // `min/max` input parameters in components should be within this range.
        passwordMinLength: 8, // Password length min/max in forms independently of each componenet min/max.
        // Same as password but for the name
        nameMaxLength: 50,
        nameMinLength: 2,
        // If set, sign-in/up form is not available until email has been verified.
        // Plus protected routes are still protected even though user is connected.
        guardProtectedRoutesUntilEmailIsVerified: false
      }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MomentModule,
    CoreModule,
    SharedModule
  ],
  providers: [
    { provide: NgModuleFactoryLoader, useClass: SystemJsNgModuleLoader },
    Title
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
