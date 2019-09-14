import { Component, OnInit, OnChanges, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { IAttackPool, AttackPoolResultType } from '../../domain/statistics/attackPool';
import { DieType } from '../../domain/statistics/dieRoll';

interface FishChartDataPoint {
  value: number;
  name: string;
}

class FishChartData {
  constructor(public name: string, public series: FishChartDataPoint[]) {

  }
}

class FishChart {
  data: FishChartData[];
  colorScheme = {
    domain: ['red', 'blue', 'black']
  };
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  yScaleMax = 100;
  yScaleMin = 0;
  areaData = [];
  constructor(public xAxisLabel: string, public yAxisLabel: string) {
  }
}

@Component({
  selector: 'flagship-fishing-calculator',
  templateUrl: './fishing-calculator.component.html',
  styleUrls: ['./fishing-calculator.component.css']
})
export class FishingCalculatorComponent implements OnInit, OnChanges {
  @Input() longRange: IAttackPool;
  @Input() mediumRange: IAttackPool;
  @Input() closeRange: IAttackPool;

  public dieType: DieType = DieType.Any;
  public result: AttackPoolResultType = AttackPoolResultType.Critical;

  public successRange = [1, 2, 3, 4, 5, 6, 7];
  public resultTypes = AttackPoolResultType;
  public dieTypes = DieType;
  public chart = new FishChart("# of Criticals", "Probability");

  constructor() { }

  ngOnInit() {
    this.calculate();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.longRange = changes.longRange.currentValue;
    this.mediumRange = changes.mediumRange.currentValue;
    this.closeRange = changes.closeRange.currentValue;
    this.calculate();
  }

  getChartLabel(): string {
    switch (this.result) {
      case AttackPoolResultType.Critical:
        return "# of Criticals";
      case AttackPoolResultType.Accuracy:
        return "# of Accuracies";
      case AttackPoolResultType.NonBlank:
        return "# of Non-Blanks";
    }
    return "Unsupported";
  }

  calculate() {
    let long = new FishChartData("Long Range", this.calculateChartData(this.longRange));
    let medium = new FishChartData("Medium Range", this.calculateChartData(this.mediumRange));
    let close = new FishChartData("Close Range", this.calculateChartData(this.closeRange));
    this.chart.data = [long, medium, close];
    this.chart.xAxisLabel = this.getChartLabel();
  }

  calculateChartData(pool: IAttackPool): FishChartDataPoint[] {
    return this.successRange.map(i => {
      return {
        value: pool.probabilityOfResult(this.dieType, this.result, i) * 100,
        name: i.toString()
      };
    });
  }
}
