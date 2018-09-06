import { Component, OnInit, Input } from '@angular/core';
import { Fleet } from '../domain/fleet';

@Component({
  selector: 'flagship-fleet-toolbar',
  templateUrl: './fleet-toolbar.component.html',
  styleUrls: ['./fleet-toolbar.component.css']
})
export class FleetToolbarComponent implements OnInit {

  @Input() fleet: Fleet;
  constructor() { }

  ngOnInit() {
  }

}
