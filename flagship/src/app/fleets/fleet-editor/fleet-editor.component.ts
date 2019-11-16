import { Component, OnInit, Inject } from '@angular/core';
import { Faction } from '../../domain/faction';
import { Fleet } from '../../domain/fleet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserSettings } from 'src/app/domain/settings/userSettings';

export enum FleetEditorMode {
  New,
  Edit
}

export class FleetEditorData {
  mode: FleetEditorMode;
  name: string;
  faction: Faction;
  author: string;
  pointLimit: number;
  squadronPointLimit: number;

  static newFleet(settings: UserSettings): FleetEditorData {
    return {
      mode: FleetEditorMode.New,
      name: null,
      faction: settings && settings.faction != null ? settings.faction : Faction.Empire,
      author: settings && settings.author ? settings.author : null,
      pointLimit: 400,
      squadronPointLimit: 134
    }
  }

  static fromFleet(f: Fleet): FleetEditorData {
    return {
      mode: FleetEditorMode.Edit,
      name: f.name,
      faction: f.faction,
      author: f.author,
      pointLimit: f.pointLimit,
      squadronPointLimit: f.squadronPointLimit
    }
  }
}

class Format {
  name: string;
  value: string;
  points: number;
  squadronPoints: number;
}

@Component({
  selector: 'flagship-fleet-editor',
  templateUrl: './fleet-editor.component.html',
  styleUrls: ['./fleet-editor.component.scss']
})
export class FleetEditorComponent implements OnInit {

  fleetForm = new FormGroup({
    name: new FormControl('', Validators.required),
    author: new FormControl(''),
    faction: new FormControl('', Validators.required),
    pointLimit: new FormControl(0, [Validators.required, Validators.min(1)]),
    squadronPointLimit: new FormControl(0, [Validators.required, Validators.min(1)])
  });
  constructor(public dialogRef: MatDialogRef<FleetEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FleetEditorData) { }

  ngOnInit() {
    this.fleetForm.patchValue({
      name: this.data.name,
      author: this.data.author,
      faction: this.data.faction.toString(),
      pointLimit: this.data.pointLimit,
      squadronPointLimit: this.data.squadronPointLimit
    });
  }

  getFleetData() : FleetEditorData {
    return {
      mode: this.data.mode,
      name: this.fleetForm.get('name').value,
      faction: +this.fleetForm.get('faction').value,
      pointLimit: +this.fleetForm.get('pointLimit').value,
      squadronPointLimit: +this.fleetForm.get('squadronPointLimit').value,
      author: this.fleetForm.get('author').value
    }
  }

  public formats: Format[] = [
    { name: 'Standard', value: 'standard', points: 400, squadronPoints: 134 },
    { name: 'Sector Fleet (200 pts)', value: 'sector200', points: 200, squadronPoints: 50 },
    { name: 'Sector Fleet (300 pts)', value: 'sector300', points: 300, squadronPoints: 75 },
    { name: 'Sector Fleet (400 pts)', value: 'sector400', points: 400, squadronPoints: 100 },
    { name: 'Sector Fleet (500 pts)', value: 'sector500', points: 500, squadronPoints: 125 },
    { name: 'Sector Fleet (600 pts)', value: 'sector600', points: 600, squadronPoints: 150 },
    { name: 'Sector Fleet (800 pts)', value: 'sector800', points: 800, squadronPoints: 200 },
    { name: 'Sector Fleet (1000 pts)', value: 'sector1000', points: 1000, squadronPoints: 250 },
    { name: 'Sector Fleet (1200 pts)', value: 'sector1200', points: 1200, squadronPoints: 300 },
  ];

  formatChange(event: MatSelectChange) {
    let format = this.formats.find(f => f.value === event.value);
    if (format) {
      this.fleetForm.patchValue({
        pointLimit: format.points,
        squadronPointLimit: format.squadronPoints
      });
    }
  }
}
