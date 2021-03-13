import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AppleInstallPromptComponent } from './apple-install-prompt/apple-install-prompt.component';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { SwUpdate } from '@angular/service-worker';
import { UpdatePromptComponent } from './update-prompt/update-prompt.component';
import { NotesService } from './core/services/notes.service';
import { MatDialog } from '@angular/material/dialog';
import { NotesComponent } from './core/notes/notes.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        // New update available
        this.bottomSheet.open(UpdatePromptComponent);
      });
    }
    if (this.isIos() && !this.isInStandaloneMode()) {
      this.localStorage.getItem<Date>('lastIosPromptDate')
        .subscribe((d: Date) => {
          let diffDays = 0;
          if (d) {
            let now = new Date();
            let diff = Math.abs(now.getTime() - d.getTime());
            diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 
          }
          if (!d || diffDays >= 7) {
            this.bottomSheet.open(AppleInstallPromptComponent);
            this.localStorage.setItem('lastIosPromptDate', new Date()).subscribe();
          }
        });
    }
    this.localStorage.getItem('lastReadNotes')
      .subscribe((v: string) => {
        let currentNotes = this.notesService.getNotes();
        if (!v || v !== currentNotes.version) {
          this.dialog.open(NotesComponent).afterClosed().subscribe(() => {
            this.localStorage.setItem('lastReadNotes', currentNotes.version).subscribe();
          });
        }
      });
  }

  constructor(private bottomSheet: MatBottomSheet, private localStorage: LocalStorage,
    private swUpdate: SwUpdate, private notesService: NotesService,
    private dialog: MatDialog) {
    
  }

  private isIos(): boolean {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  };

  private isInStandaloneMode(): boolean { 
    return ('standalone' in window.navigator) && (<any>window.navigator).standalone; 
  }
}


