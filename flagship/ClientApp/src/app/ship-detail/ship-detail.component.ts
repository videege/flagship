import { Component, OnInit, Input} from '@angular/core';
import { Ship } from '../domain/ship';

@Component({
  selector: 'flagship-ship-detail',
  templateUrl: './ship-detail.component.html',
  styleUrls: ['./ship-detail.component.css']
})
export class ShipDetailComponent implements OnInit {

  @Input() ship: Ship;

  constructor() { }

  ngOnInit() {
  }

}
