import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultToolbarComponent } from './default-toolbar/default-toolbar.component';
import { AlertComponent } from './alert/alert.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { BatteryComponent } from './battery/battery.component';
import { ShipIconComponent } from './ship-icon/ship-icon.component';



@NgModule({
  declarations: [
    DefaultToolbarComponent,
    AlertComponent,
    BatteryComponent,
    ShipIconComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports: [
    DefaultToolbarComponent,
    AlertComponent,
    BatteryComponent,
    ShipIconComponent
  ]
})
export class SharedModule { }
