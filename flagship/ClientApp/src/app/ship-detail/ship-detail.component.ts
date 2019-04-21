import { Component, OnInit, Input } from '@angular/core';
import { Ship } from '../domain/ship';
import { MatDialog } from '@angular/material';
import { ShipEditorComponent } from '../ship-editor/ship-editor.component';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Component({
  selector: 'flagship-ship-detail',
  templateUrl: './ship-detail.component.html',
  styleUrls: ['./ship-detail.component.css']
})
export class ShipDetailComponent implements OnInit {
  isExtraSmall: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.XSmall);

  @Input() ship: Ship;

  constructor(public dialog: MatDialog, private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
  }

  editShip() {
   
  }

  deleteShip() {
    this.ship.fleet.deleteShip(this.ship);
  }
}
