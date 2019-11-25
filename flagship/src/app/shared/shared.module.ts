import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultToolbarComponent } from './default-toolbar/default-toolbar.component';
import { AlertComponent } from './alert/alert.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { BatteryComponent } from './battery/battery.component';
import { ShipIconComponent } from './ship-icon/ship-icon.component';
import { UpgradeIconDirective } from './upgrade-icon/upgrade-icon.directive';
import { NumeralsPipe } from './pipes/numerals/numerals.pipe';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DefenseTokenComponent } from './defense-token/defense-token.component';
import { IssuesListComponent } from './issues-list/issues-list.component';

@NgModule({
  declarations: [
    DefaultToolbarComponent,
    AlertComponent,
    BatteryComponent,
    ShipIconComponent,
    UpgradeIconDirective,
    NumeralsPipe,
    ConfirmDialogComponent,
    DefenseTokenComponent,
    IssuesListComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports: [
    DefaultToolbarComponent,
    AlertComponent,
    BatteryComponent,
    ShipIconComponent,
    UpgradeIconDirective,
    NumeralsPipe,
    ConfirmDialogComponent,
    DefenseTokenComponent,
    IssuesListComponent
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
