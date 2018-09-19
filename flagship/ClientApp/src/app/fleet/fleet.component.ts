import { Component, OnInit, Input } from '@angular/core';
import { Fleet } from '../domain/fleet';
import { Ship } from '../domain/ship';
import { ShipFactory } from '../domain/factories/shipFactory';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { UpgradeFactory } from '../domain/factories/upgradeFactory';

@Component({
  selector: 'flagship-fleet',
  templateUrl: './fleet.component.html',
  styleUrls: ['./fleet.component.css']
})
export class FleetComponent implements OnInit {

  @Input() fleet: Fleet;

  private shipFactory: ShipFactory = new ShipFactory();
  private upgradeFactory: UpgradeFactory = new UpgradeFactory();
  
  public colSpan = 1;

  constructor(private breakpointObserver: BreakpointObserver) { 
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
    
  }

  addShip() {
    let newShip = this.shipFactory.instantiateShip('Imperial I-Class Star Destroyer', this.fleet);
    newShip.equipUpgrade(this.upgradeFactory.instantiateUpgrade(1000));
    newShip.equipUpgrade(this.upgradeFactory.instantiateUpgrade(2000));
    newShip.equipUpgrade(this.upgradeFactory.instantiateUpgrade(3000));
    this.fleet.ships.push(newShip);
  }
}
