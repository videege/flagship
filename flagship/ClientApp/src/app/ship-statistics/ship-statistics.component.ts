import { Component, OnInit, Input } from '@angular/core';
import { Ship } from '../domain/ship';
import { MatDialog } from '@angular/material';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DieModificationFactory } from '../domain/statistics/factories/dieModificationFactory';
import { IDieModification } from '../domain/statistics/dieModification';
import { Armament } from '../domain/armament';
import { Calculator } from '../domain/statistics/calculator';
import { IAttackPool, PoolStatistics, AttackPool } from '../domain/statistics/attackPool';

class BarChartData {
  // colorScheme = {
  //   domain: [
  //     '#946988',
  //     '#7819d1',
  //     '#e30b0b',
  //     '#AAAAAA']
  // };
  colorScheme = {
    domain: ['black', 'green', 'red']
  };
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  showYAxisLabel = true;
  yScaleMax = 10;
  yScaleMin = 0;
  areaData = [];
  constructor(public xAxisLabel: string, public yAxisLabel: string,
    public data: any) {

  }

  updateStatistic(yLabel: string, yMax: number) {
    this.yAxisLabel = yLabel;
    this.yScaleMax = yMax;
  }
}

interface TableData {
  range: string;
  damageMean: number;
  damageDeviation: number;
  damageCV: number;
  accuraciesMean: number;
  accuraciesDeviation: number;
  accuraciesCV: number;
  criticalsMean: number;
  criticalsDeviation: number;
  criticalsCV: number;
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
  public displayedColumns = [ 'range',
    'dmg-mean', 'dmg-dev', 'dmg-cv',
    'acc-mean', 'acc-dev', 'acc-cv',
    'crit-mean', 'crit-dev', 'crit-cv'
  ];

  public longRange = new BarChartData("Long Range", "Damage", []);
  public mediumRange = new BarChartData("Medium Range", "Damage", []);
  public closeRange = new BarChartData("Close Range", "Damage", []);
  public tableData: TableData[] = [];
  private calculator: Calculator;

  constructor(public dialog: MatDialog, private breakpointObserver: BreakpointObserver) {

  }

  ngOnInit() {
    this.modifications = this.modificationFactory.getModificationsForShip(this.ship);
    this.selectArc(this.ship.frontArmament);
  }

  modificationChanged(event) {
    this.calculator = new Calculator(this.armament, this.modifications);
    this.calculator.applyModifications();
    this.updateStatistics();
    console.log('applied');
  }

  selectArc(armament: Armament) {
    this.armament = armament;
    this.calculator = new Calculator(this.armament, this.modifications);
    this.calculator.applyModifications();
    this.updateStatistics();
  }

  setChartStatistic(label: string, maxScale: number) {
    this.longRange.updateStatistic(label, maxScale);
    this.mediumRange.updateStatistic(label, maxScale);
    this.closeRange.updateStatistic(label, maxScale);
  }

  selectStat(stat: string) {
    this.selectedStat = stat;
    if (this.selectedStat === 'DMG') {
      this.setChartStatistic('Damage', 10);
    }
    else if (this.selectedStat === 'ACC') {
      this.setChartStatistic('Accuracies', 5);
    }
    else if (this.selectedStat === 'CRT') {
      this.setChartStatistic('Criticals', 5);
    }

    this.updateStatistics();
  }

  private createTableData(range: string, pool: IAttackPool): TableData{
    const dmg = pool.expectedDamage();
    const acc = pool.expectedAccuracies();
    const crit = pool.expectedCriticals();
    return {
      range: range,
      damageMean: dmg.mean,
      damageDeviation: dmg.deviation,
      damageCV: dmg.cv,
      accuraciesMean: acc.mean,
      accuraciesDeviation: acc.deviation,
      accuraciesCV: acc.cv,
      criticalsMean: crit.mean,
      criticalsDeviation: crit.deviation,
      criticalsCV: crit.cv
    };
  }

  private updateStatistics() {
    let fn: (p: IAttackPool) => PoolStatistics = null;
    if (this.selectedStat === 'DMG')
      fn = (p: IAttackPool) => p.expectedDamage();
    else if (this.selectedStat === 'ACC')
      fn = (p: IAttackPool) => p.expectedAccuracies();
    else if (this.selectedStat === 'CRT')
      fn = (p: IAttackPool) => p.expectedCriticals();

    let stats = [
      { name: 'Long', stats: fn(this.calculator.longRangePool) },
      { name: 'Medium', stats: fn(this.calculator.mediumRangePool) },
      { name: 'Close', stats: fn(this.calculator.closeRangePool) }
    ];

    this.tableData = [
      this.createTableData('Long', this.calculator.longRangePool),
      this.createTableData('Medium', this.calculator.mediumRangePool),
      this.createTableData('Close', this.calculator.closeRangePool)
    ]

    let mapping = (p: PoolStatistics) => {
      return p.distribution.map((val, idx) => {
        let name = "μ";
        if (idx === 0) name = 'μ - σ';
        else if (idx === 2) name = 'μ + σ';

        return { "name": name, "value": val };
      });
    };
   
    this.longRange.data = mapping(stats[0].stats);
    this.mediumRange.data = mapping(stats[1].stats);
    this.closeRange.data = mapping(stats[2].stats);
  }


}
