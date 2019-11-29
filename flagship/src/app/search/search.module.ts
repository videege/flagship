import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FleetSearchComponent } from './fleet-search/fleet-search.component';
import { SharedModule } from '../shared/shared.module';
import { AppMaterialModule } from '../app-material/app-material.module';
import { SearchRoutingModule } from './search-routing.module';



@NgModule({
  declarations: [FleetSearchComponent],
  imports: [
    CommonModule,
    SharedModule,
    AppMaterialModule,
    //SearchRoutingModule //todo: working on this
  ]
})
export class SearchModule { }
