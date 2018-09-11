import { Component, OnInit, Input } from '@angular/core';
import { Fleet } from '../domain/fleet';
import { Ship } from '../domain/ship';
import { ShipFactory } from '../domain/factories/shipFactory';

@Component({
  selector: 'flagship-fleet',
  templateUrl: './fleet.component.html',
  styleUrls: ['./fleet.component.css']
})
export class FleetComponent implements OnInit {

  @Input() fleet: Fleet;

  private shipFactory: ShipFactory = new ShipFactory();

  constructor() { }

  ngOnInit() {
    
  }

  addShip() {
    let newShip = this.shipFactory.instantiateShip('Imperial I-Class Star Destroyer', this.fleet);;
    this.fleet.ships.push(newShip);
  }
}
