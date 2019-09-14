import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ShipDetailComponent } from './ship-detail/ship-detail.component';

// const states = [
//   { name: 'ships', url: '/ships', component: ListComponent },
//   { name: 'ships.detail', url: '/detail', component: ShipDetailComponent }
// ];

@NgModule({
  imports: [
    CommonModule,
    //UIRouterModule.forChild({ states: states })
  ],
  declarations: [ListComponent, ShipDetailComponent],
  //exports: [UIRouterModule]
})
export class ShipsModule { }
