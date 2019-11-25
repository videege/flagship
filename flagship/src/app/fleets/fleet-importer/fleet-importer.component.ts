import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AWFleetImporter } from 'src/app/domain/factories/fleetImporter';
import { Issue } from 'src/app/domain/campaign/issue';

@Component({
  selector: 'flagship-fleet-importer',
  templateUrl: './fleet-importer.component.html',
  styleUrls: ['./fleet-importer.component.scss']
})
export class FleetImporterComponent implements OnInit {

  importedFleet: string = null;
  issues: Issue[] = [];

  constructor(public dialogRef: MatDialogRef<FleetImporterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  import() {
    if (!this.importedFleet) return;

    let awImporter = new AWFleetImporter(this.importedFleet);
    let result = awImporter.import();

    if (result.issues && result.issues.length) {
      this.issues = result.issues;
    } else {
      this.dialogRef.close(result.fleet);
    }
  }
}
