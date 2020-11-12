import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import { ShipFactory } from 'src/app/domain/factories/shipFactory';
import { SquadronFactory } from 'src/app/domain/factories/squadronFactory';
import { ISerializedFleet } from 'src/app/domain/game/fleet';
import { switchMap, debounceTime, tap } from 'rxjs/operators';
import { FleetService } from 'src/app/core/services/fleet.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ShipData } from 'src/app/domain/game/ship';
import { Faction } from 'src/app/domain/game/faction';
import { MatSelectChange } from '@angular/material/select';

interface ShipGroup {
  label: string;
  disabled$: BehaviorSubject<boolean>;
  ships: ShipData[];
}

@Component({
  selector: 'flagship-fleet-search',
  templateUrl: './fleet-search.component.html',
  styleUrls: ['./fleet-search.component.scss']
})
export class FleetSearchComponent implements OnInit {
  name$ = new BehaviorSubject<string>(null);
  author$ = new BehaviorSubject<string>(null);
  ships$ = new BehaviorSubject<number[]>([]);
  squadrons$ = new BehaviorSubject<number[]>([]);

  results$: Observable<ISerializedFleet[]>;
  loading = false;

  private shipFactory = new ShipFactory();
  private squadronFactory = new SquadronFactory();

  searchForm = new FormGroup({
    name: new FormControl(''),
    author: new FormControl(''),
    ships: new FormControl(''),
    squadrons: new FormControl('')
  });

  shipGroups: ShipGroup[];


  constructor(private fleetService: FleetService) { 
    this.shipGroups = [
      {
        label: 'Galactic Empire',
        ships: this.shipFactory.getShips(Faction.Empire),
        disabled$: new BehaviorSubject(false)
      },
      {
        label: 'Rebel Alliance',
        ships: this.shipFactory.getShips(Faction.Rebels),
        disabled$: new BehaviorSubject(false)
      }
    ];

    this.results$ = combineLatest(
      this.name$,
      this.author$,
      this.ships$,
      this.squadrons$
    ).pipe(
      tap(() => {
        setTimeout(() => this.loading = true);
      }),
      debounceTime(500),
      switchMap(([name, author, ships, squadrons]) => 
        this.fleetService.searchFleets(name, author, ships, squadrons)),
      tap(() => {
        setTimeout(() => this.loading = false);
      }),
      switchMap((fleets: ISerializedFleet[]) => {
        if (fleets) return of(fleets);
        return of([]);
      })
    );
  }

  ngOnInit() {
    this.searchForm.get('name').valueChanges.subscribe((val: string) => {
      this.name$.next(val);
    });
    this.searchForm.get('author').valueChanges.subscribe((val: string) => {
      this.author$.next(val);
    });
    this.searchForm.get('ships').valueChanges.subscribe((val: number[]) => {
      if (!val || !val.length) {
        this.shipGroups[0].disabled$.next(false);
        this.shipGroups[1].disabled$.next(false);
        this.ships$.next([]);
      } else {
        let firstShip = val[0];
        if (this.shipGroups[0].ships.find(x => x.id === firstShip)) {
          this.shipGroups[1].disabled$.next(true);
        } else {
          this.shipGroups[0].disabled$.next(true);
        }
        this.ships$.next(val);
      }
    })
  }
}
