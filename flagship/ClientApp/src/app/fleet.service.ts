import { Injectable } from '@angular/core';
import { Fleet } from './domain/fleet';
import { Faction } from './domain/faction';

@Injectable({
  providedIn: 'root'
})
export class FleetService {

  public fleets: Fleet[];

  constructor() { 
    this.fleets = [
      new Fleet("1", "Motti's Fun House", "Joshua Barron", Faction.Empire, 400),
      new Fleet("2", "Thrawn and Wakanda Forever", "Joshua Barron", Faction.Empire, 400),
      new Fleet("3", "Rieekan and Friends", "Joshua Barron", Faction.Rebels, 400)
    ];
  }

  

}
