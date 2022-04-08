import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { Campaign, SerializedCampaign } from 'src/app/domain/campaign/campaign';
import { map, switchMap, combineLatest } from 'rxjs/operators';
import { CampaignType } from 'src/app/domain/campaign/campaignType';
import { CampaignFactory } from 'src/app/domain/factories/campaignFactory';
import { Invite } from 'src/app/domain/campaign/invite';
import { FleetService } from './fleet.service';
import { CampaignEra } from 'src/app/domain/campaign/campaignEra';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private user: firebase.User;
  private campaignFactory = new CampaignFactory();

  constructor(private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private fleetService: FleetService) {
    this.afAuth.authState.subscribe(user => {
      this.user = user;
    })
  }

  public getCampaignsForUser(): Observable<Campaign[]> {
    return this.afAuth.authState.pipe(
      switchMap((user) => this.db.collection<SerializedCampaign>('campaigns', ref => ref.where('playerUids', 'array-contains', user.uid))
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            return Campaign.hydrate(data);
          });
        })
      )));
  }

  public getCampaignForUser(id: string): Observable<Campaign> {
    return this.db.doc<SerializedCampaign>(`campaigns/${id}`).valueChanges()
      .pipe(
        map(serialized => Campaign.hydrate(serialized)),
        switchMap(campaign => {
          let fleetIds = campaign.getPlayers().map(x => x.fleetId);
          if (!fleetIds || !fleetIds.length) {
            campaign.setFleets([]);
            return of(campaign);
          }
          return this.fleetService.getFleetsByIds(fleetIds)
            .pipe(
              map(fleets => {
                campaign.setFleets(fleets);
                return campaign;
              })
            );
        })
      );
  }

  public getCampaignInvite(token: string): Observable<Invite> {
    return this.db.doc<Invite>(`invites/${token}`).get().pipe(
      map(doc => doc.data() as Invite)
    );
  }

  public acceptCampaignInvite(invite: Invite): Promise<void> {
    if (!this.user) throw new Error("User not logged in.");

    invite.acceptedUsers.push({
      uid: this.user.uid,
      displayName: this.user.displayName,
      photoURL: this.user.photoURL
    });
    let doc = this.db.doc<Invite>(`invites/${invite.token}`);
    return doc.update(invite);
  }

  public createCampaign(name: string, type: CampaignType, era: CampaignEra): Promise<Campaign> {
    if (!this.user) throw new Error("User not logged in.");

    let campaign = this.campaignFactory.createCampaign(name, type, era, this.user);
    let serializedCampaign = campaign.serialize();
    return new Promise<Campaign>((resolve, reject) => {
      this.db.collection('campaigns')
        .add(serializedCampaign)
        .then(res => {
          campaign.id = res.id;
          let serializedCampaign = campaign.serialize();
          this.db.doc<SerializedCampaign>(`campaigns/${serializedCampaign.id}`)
            .set(serializedCampaign).then(() => {
              this.createCampaignInvitation(campaign).then((_campaign) => {
                resolve(campaign);
              }, err => reject(err));
            }, err => reject(err));
        }, err => reject(err))
    });
  }

  public updateCampaign(campaign: Campaign): Promise<void> {
    let doc = this.db.doc<SerializedCampaign>(`campaigns/${campaign.id}`);
    let serialized = campaign.serialize();
    return doc.update(serialized);
  }

  public deleteCampaign(campaign: Campaign): Promise<void> {
    let doc = this.db.doc<SerializedCampaign>(`campaigns/${campaign.id}`);
    return doc.delete();
  }

  public createCampaignInvitation(campaign: Campaign): Promise<Campaign> {
    if (!this.user) throw new Error("User not logged in.");

    let invite: Invite = {
      token: 'placeholder',
      campaignId: campaign.id,
      campaignName: campaign.name,
      ownerName: this.user.displayName,
      acceptedUsers: [{
        uid: campaign.ownerUid,
        displayName: this.user.displayName,
        photoURL: this.user.photoURL
      }]
    };

    return new Promise<Campaign>((resolve, reject) => {
      this.db.collection('invites').add(invite).then(res => {
        invite.token = res.id;
        campaign.inviteToken = res.id;
        this.db.doc<Invite>(`invites/${invite.token}`)
          .set(invite)
          .then(() => {
            this.updateCampaign(campaign).then(() => {
              resolve(campaign);
            }, err => reject(err))
          }, err => reject(err))
      });
    })
  }
}
