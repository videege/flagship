import { Component, OnInit, Input } from '@angular/core';
import { Fleet } from '../domain/fleet';
import { Ship } from '../domain/ship';
import { ShipFactory } from '../domain/factories/shipFactory';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { UpgradeFactory } from '../domain/factories/upgradeFactory';
import { ShipSelectorComponent, ShipSelectorData } from '../ship-selector/ship-selector.component';
import { MatDialog } from '@angular/material/dialog';
import { Squadron } from '../domain/squadron';
import { SquadronSelectorComponent, SquadronSelectorData } from '../squadron-selector/squadron-selector.component';
import { AlertType } from '../alert/alert.component';
import { ObjectiveType, Objective } from '../domain/objective';
import { ObjectiveSelectorComponent } from '../objective-selector/objective-selector.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'flagship-fleet',
  templateUrl: './fleet.component.html',
  styleUrls: ['./fleet.component.css']
})
export class FleetComponent implements OnInit {
  public fleet: Fleet;
  public colSpan = 1;
  public fleetAlertOpen = false;
  public squadronAlertOpen = false;
  public alertType = AlertType;
  
  public assaultObjective: Objective = null;
  public defenseObjective: Objective = null;
  public navigationObjective: Objective = null;
  public objType = ObjectiveType;

  constructor(private breakpointObserver: BreakpointObserver, private dialog: MatDialog,
    private route: ActivatedRoute) {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.colSpan = 2;
        }
        else {
          this.colSpan = 1;
        }
      });
  }

  ngOnInit() {
    this.fleet = this.route.snapshot.data.fleet;
    this.fleet.subject.subscribe(f => {
      this.fleetAlertOpen = this.fleet.currentPoints() > this.fleet.pointLimit;
      this.squadronAlertOpen = this.fleet.currentPointsFromSquadrons() > this.fleet.squadronPointLimit;

      this.setObjectives();
    });
    this.setObjectives();
  }

  setObjectives() {
    this.assaultObjective = this.fleet.objectives.find(o => o.type === ObjectiveType.Assault);
    this.defenseObjective = this.fleet.objectives.find(o => o.type === ObjectiveType.Defense);
    this.navigationObjective = this.fleet.objectives.find(o => o.type === ObjectiveType.Navigation);
  }

  addShip() {
    let ref = this.dialog.open(ShipSelectorComponent, {
      width: '350px',
      data: <ShipSelectorData>{ fleet: this.fleet }
    });
    ref.afterClosed().subscribe((ship: Ship) => {
      if (ship)
        this.fleet.addShip(ship);
    });
  }

  addSquadron() {
    let ref = this.dialog.open(SquadronSelectorComponent, {
      width: '500px',
      data: <SquadronSelectorData>{ fleet: this.fleet }
    });
    ref.afterClosed().subscribe((squadron: Squadron) => {
      if (squadron)
        this.fleet.addSquadron(squadron);
    });
  }

  
}
