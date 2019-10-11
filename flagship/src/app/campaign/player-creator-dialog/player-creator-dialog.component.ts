import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { ClipboardService } from 'ngx-clipboard';

export class PlayerCreatorDialogData {
  campaignId: string;
  name: string;
  fleetName: string;
}

@Component({
  selector: 'flagship-player-creator-dialog',
  templateUrl: './player-creator-dialog.component.html',
  styleUrls: ['./player-creator-dialog.component.css']
})
export class PlayerCreatorDialogComponent implements OnInit {

  inviteToken: string;
  inviteUrl: string;
 
  playerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(25)]),
    fleetName: new FormControl('', [Validators.required, Validators.maxLength(25)])
  });

  constructor(public dialogRef: MatDialogRef<PlayerCreatorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PlayerCreatorDialogData) { 
    }

  ngOnInit() {
  }

  getData() : PlayerCreatorDialogData {
    return {
      campaignId: this.data.campaignId,
      name: this.playerForm.get('name').value,
      fleetName: this.playerForm.get('fleetName').value
    }
  }

  
}
