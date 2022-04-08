import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CampaignLocation } from 'src/app/domain/campaign/campaignLocation';
import { LocationControlType } from 'src/app/domain/campaign/locationControlType';
import { Faction } from 'src/app/domain/game/faction';
import { CampaignLocationFactory } from 'src/app/domain/factories/campaignLocationFactory';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CampaignEra } from 'src/app/domain/campaign/campaignEra';

export class LocationControlDialogData {
  faction: Faction;
  controlType: LocationControlType;
  chosenObjective: number;

  constructor(public location: CampaignLocation, public era: CampaignEra) {

  }
}

@Component({
  selector: 'flagship-location-control-dialog',
  templateUrl: './location-control-dialog.component.html',
  styleUrls: ['./location-control-dialog.component.scss']
})
export class LocationControlDialogComponent implements OnInit {

  form = new FormGroup({
    faction: new FormControl('', [Validators.required, Validators.maxLength(25)]),
    controlType: new FormControl('', [Validators.required, Validators.maxLength(25)]),
    chosenObjective: new FormControl('')
  });

  constructor(public dialogRef: MatDialogRef<LocationControlDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LocationControlDialogData) {
    }

  ngOnInit() {
    let faction = (this.data.location.controllingFaction != null ? this.data.location.controllingFaction : "-1").toString();
    let controlType = faction !== "-1" ? this.data.location.controlType.toString() : null;

    this.form.patchValue({
      faction: faction,
      controlType: controlType,
      chosenObjective: null
    });
  }

  getData(): LocationControlDialogData {
    let data = new LocationControlDialogData(this.data.location, this.data.era);
    let faction = this.form.get('faction').value;
    if (faction === "-1") {
      return data;
    }
    data.faction = +faction;
    data.controlType = +this.form.get('controlType').value;
    data.chosenObjective = data.controlType === LocationControlType.Base
      ? +this.form.get('chosenObjective').value
      : null;
    return data;
  }

}
