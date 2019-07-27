import { Component, OnInit, Input } from '@angular/core';
import { Ship } from '../domain/ship';
import { MatDialog } from '@angular/material';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DieModificationFactory } from '../domain/statistics/factories/dieModificationFactory';
import { IDieModification } from '../domain/statistics/dieModification';
import { Armament } from '../domain/armament';
import { Calculator } from '../domain/statistics/calculator';
import { IAttackPool } from '../domain/statistics/attackPool';

class GaugeData {
  public units = "% CV";
  public bigSegments = 5;
  public smallSegments = 1;
  constructor(public data: any[]) {

  }
}

class BarChartData {
  colorScheme = {
    domain: [
      '#946988',
      '#7819d1',
      '#e30b0b',
      '#AAAAAA']
  };
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  showYAxisLabel = true;
  yScaleMax = 10;
  yScaleMin = 0;
  constructor(public xAxisLabel: string, public yAxisLabel: string,
    public data: any) {

  }

  updateStatistic(yLabel: string, yMax: number) {
    this.yAxisLabel = yLabel;
    this.yScaleMax = yMax;
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
  public selectedStat: string = "DMG";
  public showCV = false;
  
  public chart = new BarChartData("Range", "Damage", []);
  public gauge = new GaugeData([]);
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
    this.updateStatistics();
  }

  selectStat(stat: string) {
    this.selectedStat = stat;
    if (this.selectedStat === 'DMG') {
      this.chart.updateStatistic('Damage', 10);
    }
    else if (this.selectedStat === 'ACC') {
      this.chart.updateStatistic('Accuracies', 5);
    }
    else if (this.selectedStat === 'CRT') {
      this.chart.updateStatistic('Criticals', 5);
    }

    this.updateStatistics();
  }

  private updateStatistics() {
    let fn = null;
    if (this.selectedStat === 'DMG')
      fn = (p: IAttackPool) => p.expectedDamage();
    else if (this.selectedStat === 'ACC')
      fn = (p: IAttackPool) => p.expectedAccuracies();
    else if (this.selectedStat === 'CRT')
      fn = (p: IAttackPool) => p.expectedCriticals();

    let stats = [
      { name: 'Close', stats: fn(this.calculator.closeRangePool) },
      { name: 'Medium', stats: fn(this.calculator.mediumRangePool) },
      { name: 'Long', stats: fn(this.calculator.longRangePool) }
    ];

    this.gauge.data = stats.map(x => {
      return {
        "name": x.name,
        "value": x.stats.cv
      };
    })

    this.chart.data = stats.map(x => {
      let series = x.stats.distribution.map((val, idx) => {
        let name = "μ";
        if (idx === 0) name = 'μ - σ';
        else if (idx === 2) name = 'μ + σ';

        return { "name": name, "value": val };
      });
      return {
        "name": x.name,
        "series": series
      };
    });
  }


}
