import { Injectable } from '@angular/core';
import { Fleet, ISerializedFleet } from './domain/fleet';
import { Faction } from './domain/faction';
import { Observable, of, Subject, forkJoin } from 'rxjs';
import { Ship } from './domain/ship';
import { Guid } from 'guid-typescript';

import { LocalStorage } from '@ngx-pwa/local-storage';
import { tap, switchMap, mergeMap, map, concatMap, find, share } from 'rxjs/operators';
import { ShipFactory } from './domain/factories/shipFactory';
import { UpgradeFactory } from './domain/factories/upgradeFactory';
import { SquadronFactory } from './domain/factories/squadronFactory';

@Injectable({
  providedIn: 'root'
})
export class FleetService {
  private fleetIds: string[];
  private fleets: Fleet[] = [];

  public fleets$: Subject<Fleet[]> = new Subject<Fleet[]>();

  private shipFactory = new ShipFactory();
  private upgradeFactory = new UpgradeFactory();
  private squadronFactory = new SquadronFactory();

  private loadedFleets = false;
  private fleetLoad$: Observable<Fleet[]>;
  constructor(protected localStorage: LocalStorage) {
    this.fleetLoad$ = this.loadFleets();
    this.fleetLoad$.subscribe((fleets) => {
      for (const fleet of fleets) {
        this.addFleet(fleet);
      }
    }, (error) => { }, () => {
      this.loadedFleets = true;
    })
  }

  private loadFleets() {
    return this.localStorage.getItem<string[]>('fleetIds')
      .pipe(
        tap((fleetIds: string[]) => { this.fleetIds = fleetIds || []; }),
        concatMap((fleetIds: string[]) =>
          forkJoin(fleetIds.map(id => this.localStorage.getItem<ISerializedFleet>(`fleet-${id}`)))
        ),
        map((serializedFleets: ISerializedFleet[]) => {
          let fleets = serializedFleets.map(f => this.hydrateFleet(f));
          return fleets;
        }),
        share()
      );
  }

  private hydrateFleet(serializedFleet: ISerializedFleet): Fleet {
    let fleet = new Fleet(serializedFleet.id,
      serializedFleet.name, serializedFleet.author, serializedFleet.faction,
      serializedFleet.pointLimit, serializedFleet.squadronPointLimit);
    for (const serializedShip of serializedFleet.ships) {
      let ship = this.shipFactory.instantiateShip(serializedShip.id);
      fleet.addShip(ship);
      for (const upgradeId of serializedShip.upgrades) {
        let upgrade = this.upgradeFactory.instantiateUpgrade(upgradeId);
        ship.equipUpgrade(upgrade);
      }
    }
    for (const squadronId of serializedFleet.squadrons) {
      let squadron = this.squadronFactory.instantiateSquadron(squadronId);
      fleet.addSquadron(squadron);
    }
    return fleet;
  }

  getFleet(id: string): Observable<Fleet> {
    let fleet = this.fleets.find((f: Fleet) => f.id == id);
    if (fleet) return of(fleet);

    return this.fleetLoad$.pipe(
      map((fleets: Fleet[]) => fleets.find(f => f.id === id))
    );
  }

  getFleets(): Observable<Fleet[]> {
    if (this.loadedFleets)
      return of(this.fleets);
    
    return this.fleetLoad$;
  }

  private addFleet(fleet: Fleet): void {
    this.fleets.push(fleet);
    this.fleets$.next(this.fleets);
    if (this.fleetIds.indexOf(fleet.id) === -1) {
      this.fleetIds.push(fleet.id);
      this.localStorage.setItem("fleetIds", this.fleetIds).subscribe();
      this.persistFleet(fleet);
    }
    fleet.subject.subscribe((id: string) => {
      let _fleet = this.fleets.find(f => f.id === id);
      if (_fleet)
        this.persistFleet(_fleet);
    });
  }

  createFleet(name: string, author: string, faction: Faction,
    points: number, squadronPoints: number): Observable<Fleet> {
    let id = Guid.create().toString();
    let fleet = new Fleet(id, name, author, faction, points, squadronPoints);
    this.addFleet(fleet);
    return of(fleet);
  }

  persistFleet(fleet: Fleet) {
    let serializedFleet = fleet.serialize();
    this.localStorage.setItem(`fleet-${fleet.id}`, serializedFleet).subscribe();
  }
}
