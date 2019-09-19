import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultToolbarComponent } from './default-toolbar/default-toolbar.component';
import { AlertComponent } from './alert/alert.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { BatteryComponent } from './battery/battery.component';



@NgModule({
  declarations: [
    DefaultToolbarComponent,
    AlertComponent,
    BatteryComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports: [
    DefaultToolbarComponent,
    AlertComponent,
    BatteryComponent
  ]
})
export class SharedModule { }
