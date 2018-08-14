import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { UIRouterModule } from '@uirouter/angular';
import { HomeComponent } from './home/home.component';

const STATES = [
  { name: 'home', url: '/home', component: HomeComponent }
  // { name: 'home', url: '/', component: HelloComponent },
  // { name: 'world', url: '/world', component: WorldComponent },
  // { name: 'world.nest', url: '/nest', component: NestComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UIRouterModule.forRoot({ states: STATES })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
