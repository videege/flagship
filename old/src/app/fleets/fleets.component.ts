import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fleets',
  templateUrl: './fleets.component.html',
  styleUrls: ['./fleets.component.css']
})
export class FleetsComponent implements OnInit {

  fleets = [];

  constructor() { }

  ngOnInit() {
  }

}
