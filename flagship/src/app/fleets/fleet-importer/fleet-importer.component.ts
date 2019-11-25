import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'flagship-fleet-importer',
  templateUrl: './fleet-importer.component.html',
  styleUrls: ['./fleet-importer.component.scss']
})
export class FleetImporterComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FleetImporterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  import() {
    
  }
}
