import { Component, OnInit, Input } from '@angular/core';
import { Ship } from '../domain/ship';
import { MatDialog } from '@angular/material';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DieModificationFactory } from '../domain/statistics/factories/dieModificationFactory';
import { IDieModification } from '../domain/statistics/dieModification';
import { Armament } from '../domain/armament';
import { Calculator } from '../domain/statistics/calculator';

class ChartData {
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;

  constructor(public xAxisLabel: string, public yAxisLabel: string,
    public data: any) {

  }
}

@Component({
  selector: 'flagship-ship-statistics',
  templateUrl: './ship-statistics.component.html',
  styleUrls: ['./ship-statistics.component.css']
})
export class ShipStatisticsComponent implements OnInit {
  @Input() ship: Ship;

  private modificationFactory: DieModificationFactory = new DieModificationFactory();
  public modifications: IDieModification[] = [];
  public armament: Armament;

  public damage = new ChartData("Range", "Damage", []);

  private calculator: Calculator;

  constructor(public dialog: MatDialog, private breakpointObserver: BreakpointObserver) {

  }

  ngOnInit() {
    this.modifications = this.modificationFactory.getModificationsForShip(this.ship);
    this.selectArc(this.ship.frontArmament);
  }

  selectArc(armament: Armament) {
    this.armament = armament;
    this.calculator = new Calculator(this.armament, this.modifications);
    this.calculator.applyModifications();
    this.updateDamage();
  }

  private updateDamage() {
    this.damage.data = [
      {
        "name": "Close",
        "value": this.calculator.closeRangePool.expectedDamage()
      },
      {
        "name": "Medium",
        "value": this.calculator.mediumRangePool.expectedDamage()
      },
      {
        "name": "Long",
        "value": this.calculator.longRangePool.expectedDamage()
      }
    ]
  }

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  data = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    }
  ];
}
