import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'flagship-apple-install-prompt',
  templateUrl: './apple-install-prompt.component.html',
  styleUrls: ['./apple-install-prompt.component.scss']
})
export class AppleInstallPromptComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<AppleInstallPromptComponent>) {}

  ngOnInit() {
    
  }

}
