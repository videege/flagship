import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/core/services/settings.service';
import { UserSettings } from 'src/app/domain/settings/userSettings';
import { Faction } from 'src/app/domain/game/faction';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'flagship-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  settings: UserSettings;
  loaded = false;
  factions = [
    { val: Faction.Empire, name: "Empire" },
    { val: Faction.Rebels, name: "Rebels" },
    { val: Faction.Republic, name: "Republic" },
    { val: Faction.Separatists, name: "Separatists" }
  ];

  authorChanged$ = new Subject<string>();

  constructor(private settingsService: SettingsService,
    private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.settingsService.getSettingsForUser().subscribe(settings => {
      this.settings = settings;
      this.loaded = true;
      this.authorChanged$.pipe(
        debounceTime(1500),
        distinctUntilChanged()
      ).subscribe(() => {
        this.saveSettings();
      });
    });
    
  }

  
  public debounceSaveSettings() {
    this.authorChanged$.next(this.settings.author);
  }

  public saveSettings() {
    this.settingsService.saveUserSettings(this.settings).then(() => {
      this.snackbar.open('Settings updated successfully.', 'OK', { duration: 2000 });
    });
  }
}
