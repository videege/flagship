import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Armament } from '../../domain/game/armament';

@Component({
  selector: 'flagship-battery',
  templateUrl: './battery.component.html',
  styleUrls: ['./battery.component.scss']
})
export class BatteryComponent implements OnChanges {

  @Input() armament: Armament;

  redDice: number[] = [];
  blueDice: number[] = [];
  blackDice: number[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['armament']) {
      this.redDice = Array(this.armament.redDice).fill(0);
      this.blueDice = Array(this.armament.blueDice).fill(0);
      this.blackDice = Array(this.armament.blackDice).fill(0);
    }
  }

}
