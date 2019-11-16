import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserSettings, SerializedUserSettings } from 'src/app/domain/settings/userSettings';
import { map, tap } from 'rxjs/operators';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  user: firebase.User;
  settings$ = new BehaviorSubject<UserSettings>(null);

  constructor(private db: AngularFirestore,
    private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      this.user = user;
      this.getSettingsForUser().subscribe();
    })
  }

  getSettingsForUser(): Observable<UserSettings> {
    if (!this.user) return null;

    return this.db.doc<SerializedUserSettings>(`settings/${this.user.uid}`).valueChanges()
      .pipe(
        map(serialized => UserSettings.hydrate(serialized, this.user.uid)),
        tap(settings => this.settings$.next(settings))
      );
  }

  saveUserSettings(settings: UserSettings): Promise<void> {
    return this.db.doc<SerializedUserSettings>(`settings/${this.user.uid}`)
      .update(settings.serialize())
      .then(() => { this.settings$.next(settings); })
      .catch((error) => {
        this.db.doc<SerializedUserSettings>(`settings/${this.user.uid}`)
          .set(settings.serialize()).then(() => {
            this.settings$.next(settings);
          });

      });
  }
}
