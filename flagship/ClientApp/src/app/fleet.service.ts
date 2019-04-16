import { Injectable } from '@angular/core';
import { Fleet } from './domain/fleet';
import { Faction } from './domain/faction';
import { Observable, of } from 'rxjs';
import { Ship } from './domain/ship';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class FleetService {

  public fleets: Fleet[];

  constructor() {
    this.fleets = [
      new Fleet("1", "Motti's Fun House", "Joshua Barron", Faction.Empire, 400, 133),
      new Fleet("2", "Thrawn and Wakanda Forever", "Joshua Barron", Faction.Empire, 400, 133),
      new Fleet("3", "Rieekan and Friends", "Joshua Barron", Faction.Rebels, 400, 133)
    ];
  }

  getFleet(id: string): Observable<Fleet> {
    console.log("finding fleet with id " + id);
    console.log(this.fleets.length);
    return of(this.fleets.find((f: Fleet) => f.id == id));
  }

  createFleet(name: string, author: string, faction: Faction,
    points: number, squadronPoints: number): Observable<Fleet> {
      let id = Guid.create().toString();
      let fleet = new Fleet(id, name, author, faction, points, squadronPoints);
      this.fleets.push(fleet);
      return of(fleet);
  }
}
