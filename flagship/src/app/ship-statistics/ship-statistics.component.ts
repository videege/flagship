import { Component, OnInit, Input } from '@angular/core';
import { Ship } from '../domain/ship';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DieModificationFactory } from '../domain/statistics/factories/dieModificationFactory';
import { IDieModification, ModificationType } from '../domain/statistics/dieModification';
import { Armament } from '../domain/armament';
import { Calculator } from '../domain/statistics/calculator';
import { IAttackPool } from '../domain/statistics/attackPool';
import { PoolStatistics } from "../domain/statistics/poolStatistics";
import { FiringArc } from '../domain/statistics/firingArc';
import { ActivatedRoute } from '@angular/router';


export interface IModificationReorderEvent {
  modification: IDieModification;
  directionIsUp: boolean;
}

class BarChartData {
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
    colors: string[],
    public data: any) {
      if (colors) {
        this.colorScheme['domain'] = colors;
      }
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
  public ship: Ship;

  public showingEffects = true;
  public sidenavMode = 'side';
  public arcs = FiringArc;
  public modTypes = ModificationType;

  private modificationFactory: DieModificationFactory = new DieModificationFactory();
  public modifications: IDieModification[] = [];
  public armament: Armament;
  public selectedStat: string = "DMG";
  public displayedColumns = [ 'range',
    'dmg-mean', 'dmg-dev', 'dmg-cv',
    'acc-mean', 'acc-dev', 'acc-cv',
    'crit-mean', 'crit-dev', 'crit-cv'
  ];

  public longRange = new BarChartData("Long Range", "Damage", ['#ba0000', '#ff0000', '#ff3700'], []);
  public mediumRange = new BarChartData("Medium Range", "Damage", ['#0000a6', '#0000ff', '#009dff'], []);
  public closeRange = new BarChartData("Close Range", "Damage", ['#008a00', '#00c400', '#00ff00'], []);
  public tableData: TableData[] = [];
  public calculator: Calculator;

  public selectedArc: FiringArc;

  constructor(public dialog: MatDialog, private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute) {
    breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      let wasOver = this.sidenavMode == 'over';
      this.sidenavMode = result.matches ? 'over': 'side';
      if (this.sidenavMode == 'side' && wasOver) {
        this.showingEffects = true;
      } else if (this.sidenavMode == 'over' && !wasOver) {
        this.showingEffects = false;
      }
    });
  }

  toggleAttackEffects() {
    this.showingEffects = !this.showingEffects;
  }

  ngOnInit() {
    this.ship = this.route.snapshot.data.ship;
    this.showingEffects = !this.breakpointObserver.isMatched([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]);
    this.modifications = this.modificationFactory.getModificationsForShip(this.ship);
    this.selectArc(FiringArc.Front);
  }

  modificationChanged(event) {
    this.calculator = new Calculator(this.armament, this.modifications, this.selectedArc);
    this.calculator.applyModifications();
    this.updateStatistics();
    console.log('applied');
  }

  reorderModificationDown(modification: IDieModification) {
    this.reorderModification(modification, 1);
  }

  reorderModificationUp(modification: IDieModification) {
    // let idx = this.modifications.indexOf(modification);
    // if (idx > 0 && !this.modifications[idx-1].orderable)
    //   return;
    this.reorderModification(modification, -1);
  }

  reorderModification(modification: IDieModification, direction: number) {
    let from = this.modifications.indexOf(modification);
    let to = from + direction;
    this.modifications.splice(to, 0, this.modifications.splice(from, 1)[0]);
    this.modificationChanged(null);
  }

  private setArmamentFromArc(arc: FiringArc) {
    if (arc === FiringArc.Front) {
      this.armament = this.ship.frontArmament;
    } else if (arc === FiringArc.Left) {
      this.armament = this.ship.leftArmament;
    } else if (arc === FiringArc.LeftAux) {
      this.armament = this.ship.leftAuxArmament;
    } else if (arc === FiringArc.Rear) {
      this.armament = this.ship.rearArmament;
    }
  }

  selectArc(arc: FiringArc) {
    this.selectedArc = arc;
    this.setArmamentFromArc(arc);
    this.calculator = new Calculator(this.armament, this.modifications, arc);
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
