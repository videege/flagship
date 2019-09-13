import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { AppleInstallPromptComponent } from './apple-install-prompt/apple-install-prompt.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  ngOnInit(): void {
    if (this.isIos() && !this.isInStandaloneMode()) {
      this.bottomSheet.open(AppleInstallPromptComponent);
    }
  }
  title = 'flagship';

  constructor(private bottomSheet: MatBottomSheet) {
    
  }

  private isIos(): boolean {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  };

  private isInStandaloneMode(): boolean { 
    return ('standalone' in window.navigator) && (<any>window.navigator).standalone; 
  }
}


