import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, NgModuleFactoryLoader, SystemJsNgModuleLoader } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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


@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    NotfoundComponent,
    FooterComponent,
    AppleInstallPromptComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    //UIRouterModule.forRoot({ states: STATES, config: uiRouterConfig }),
    RouterModule.forRoot(APP_ROUTES, { enableTracing: true }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgxAuthFirebaseUIModule.forRoot(environment.firebase),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MomentModule,
    SharedModule
  ],
  providers: [
    { provide: NgModuleFactoryLoader, useClass: SystemJsNgModuleLoader },
    Title
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
