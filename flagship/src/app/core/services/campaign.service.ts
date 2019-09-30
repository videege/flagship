import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Campaign, SerializedCampaign } from 'src/app/domain/campaign/campaign';
import { map } from 'rxjs/operators';
import { CampaignType } from 'src/app/domain/campaign/campaignType';
import { Team } from 'src/app/domain/campaign/team';
import { CampaignFactory } from 'src/app/domain/factories/campaignFactory';
import { SerializedCampaignPlayer } from 'src/app/domain/campaign/campaignPlayer';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private user: firebase.User;
  private campaignFactory = new CampaignFactory();

  constructor(private db: AngularFirestore,
    private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      this.user = user;
    })
  }

  public getCampaignsForUser(): Observable<Campaign[]> {
    if (!this.user) return null;

    return this.db.collection<SerializedCampaign>('campaigns', ref => ref.where('playerUids', 'array-contains', this.user.uid))
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            let data = a.payload.doc.data();
            return Campaign.hydrate(data);
          });
        })
      );
  }

  public getCampaignForUser(id: string): Observable<Campaign> {
    return this.db.doc<SerializedCampaign>(`campaigns/${id}`).get().pipe(
      map(doc => doc.data() as SerializedCampaign),
      map(serialized => Campaign.hydrate(serialized))
    );
  }

  public createCampaign(name: string, type: CampaignType): Promise<Campaign> {
    if (!this.user) throw new Error("User not logged in.");

    let campaign = this.campaignFactory.createCampaign(name, type, this.user.uid);
    let serializedCampaign = campaign.serialize();
    return new Promise<Campaign>((resolve, reject) => {
      this.db.collection('campaigns')
        .add(serializedCampaign)
        .then(res => {
          campaign.id = res.id;
          let serializedCampaign = campaign.serialize();
          this.db.doc<SerializedCampaign>(`campaigns/${serializedCampaign.id}`)
            .set(serializedCampaign).then(() => {
              resolve(campaign);
            }, err => reject(err));
        }, err => reject(err))
    });
  }
}
