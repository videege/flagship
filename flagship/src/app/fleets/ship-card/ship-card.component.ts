import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ShipCardData {
  shipId: number;
}

@Component({
  selector: 'flagship-ship-card',
  templateUrl: './ship-card.component.html',
  styleUrls: ['./ship-card.component.scss']
})
export class ShipCardComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ShipCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ShipCardData) { }

  ngOnInit() {
    
  }

}
