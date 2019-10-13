import { Injectable } from '@angular/core';
import { Fleet, ISerializedFleet } from '../../domain/fleet';
import { Faction } from '../../domain/faction';
import { Observable, of } from 'rxjs';

import { LocalStorage } from '@ngx-pwa/local-storage';
import { tap, map } from 'rxjs/operators';
import { ShipFactory } from '../../domain/factories/shipFactory';
import { UpgradeFactory } from '../../domain/factories/upgradeFactory';
import { SquadronFactory } from '../../domain/factories/squadronFactory';
import { ObjectiveFactory } from '../../domain/factories/objectiveFactory';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { CustomCommander } from 'src/app/domain/campaign/customCommander';
import { Upgrade } from 'src/app/domain/upgrade';

export interface FleetCompaignData {
  campaignId: string;
  commanderName: string;
}

@Injectable({
  providedIn: 'root'
})
export class FleetService {
  private fleets: Fleet[] = [];

  private user: firebase.User;

  private shipFactory = new ShipFactory();
  private upgradeFactory = new UpgradeFactory();
  private squadronFactory = new SquadronFactory();
  private objectiveFactory = new ObjectiveFactory();

  constructor(protected localStorage: LocalStorage, private db: AngularFirestore,
    public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }

  public createFleet(name: string, author: string, faction: Faction,
    points: number, squadronPoints: number, campaignData: FleetCompaignData = null): Promise<Fleet> {
    if (!this.user) throw new Error("User not logged in.");

    let fleet = new Fleet(null, name, author, faction, points, squadronPoints);
    fleet.setOwnerUid(this.user.uid);

    if (campaignData) {
      fleet.setCampaignId(campaignData.campaignId);
      fleet.customCommander = new CustomCommander();
      fleet.customCommander.name = campaignData.commanderName;
    }
    let serializedFleet = fleet.serialize();

    return new Promise<Fleet>((resolve, reject) => {
      this.db.collection('fleets')
        .add(serializedFleet)
        .then(res => {
          fleet.setId(res.id);
          this.updateFleet(fleet).then(() => {
            resolve(fleet);
          }, (err) => reject(err))
        }, err => reject(err))
    });
  }

  public getFleetsForUser(): Observable<Fleet[]> {
    if (!this.user) return null;

    //TODO: this is weird and affecting the wrong things.
    return this.db.collection('fleets', ref => ref.where('ownerUid', '==', this.user.uid))
      .valueChanges()
      .pipe(
        map((fleets: ISerializedFleet[]) => {
          return fleets.map(f => this.hydrateFleet(f, f.id));
        })
      );
  }

  public getFleetForUser(id: string): Observable<Fleet> {
    let loadedFleet = this.fleets.find(f => f.id === id);
    if (loadedFleet) {
      return of(loadedFleet);
    }
    return this.db.doc<ISerializedFleet>(`fleets/${id}`).get().pipe(
      map(doc => doc.data() as ISerializedFleet),
      map(fleet => this.hydrateFleet(fleet)),
      tap(fleet => this.trySubscribeToChanges(fleet))
    );
  }

  private trySubscribeToChanges(fleet: Fleet): Fleet {
    if (!this.fleets.find(f => f.id === fleet.id)) {
      this.fleets.push(fleet);
      fleet.subject.subscribe(fleetId => {
        let _fleet = this.fleets.find(f => f.id === fleetId);
        this.updateFleet(_fleet);
      })
    }
    return fleet;
  }

  public updateFleet(fleet: Fleet): Promise<void> {
    let doc = this.db.doc<ISerializedFleet>(`fleets/${fleet.id}`);
    return doc.update(fleet.serialize());
  }

  public deleteFleet(fleet: Fleet): Promise<void> {
    let doc = this.db.doc<ISerializedFleet>(`fleets/${fleet.id}`);
    return doc.delete();
  }

  private hydrateFleet(serializedFleet: ISerializedFleet, id: string = null): Fleet {
    let fleet = new Fleet(id || serializedFleet.id,
      serializedFleet.name, serializedFleet.author, serializedFleet.faction,
      serializedFleet.pointLimit, serializedFleet.squadronPointLimit);
    let userUid = this.user ? this.user.uid : null;
    fleet.setOwnerUid(serializedFleet.ownerUid || userUid);
    fleet.setCampaignId(serializedFleet.campaignId || null);
    if (serializedFleet.customCommander) {
      fleet.setCommander(CustomCommander.hydrate(serializedFleet.customCommander));
    }
    for (const serializedShip of serializedFleet.ships) {
      let ship = this.shipFactory.instantiateShip(serializedShip.id, fleet.hasCustomCommander());
      fleet.addShip(ship);
      for (const upgradeId of serializedShip.upgrades) {
        let upgrade: Upgrade = null;
        if (upgradeId === -1 && fleet.hasCustomCommander()) {
          upgrade = this.upgradeFactory.getCustomCommanderUpgrade(fleet.customCommander, fleet.faction)
        }
        else {
          upgrade = this.upgradeFactory.instantiateUpgrade(upgradeId);
        }
        if (upgrade)
          ship.equipUpgrade(upgrade);
      }
    }
    for (const squadronId of serializedFleet.squadrons) {
      let squadron = this.squadronFactory.instantiateSquadron(squadronId);
      fleet.addSquadron(squadron);
    }
    for (const objectiveId of (serializedFleet.objectives || [])) {
      let objective = this.objectiveFactory.getObjective(objectiveId);
      fleet.setObjective(objective);
    }
    return fleet;
  }

}
