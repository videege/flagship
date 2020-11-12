import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'flagship-update-prompt',
  templateUrl: './update-prompt.component.html',
  styleUrls: ['./update-prompt.component.scss']
})
export class UpdatePromptComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<UpdatePromptComponent>) { }

  ngOnInit() {
  }

  update() {
    window.location.reload();
  }
}
