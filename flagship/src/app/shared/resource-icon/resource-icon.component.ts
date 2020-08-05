import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ResourceType } from 'src/app/domain/game/resource';

@Component({
  selector: 'flagship-resource-icon',
  templateUrl: './resource-icon.component.html',
  styleUrls: ['./resource-icon.component.scss']
})
export class ResourceIconComponent implements OnInit, OnChanges {


  @Input() type: ResourceType;
  @Input() size = 15;

  asset: string;

  constructor() { }

  ngOnInit() {
    this.setup();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setup();
  }

  setup() {
    switch (this.type) {
      case ResourceType.Any:
        this.asset = '/assets/img/svg/swa-any.png';
        return;
      case ResourceType.Dial:
        this.asset = '/assets/img/svg/swa-dial.png';
        return;
      case ResourceType.Navigation:
        this.asset = '/assets/img/svg/swa-navigate.svg';
        return;
      case ResourceType.Engineering:
        this.asset = '/assets/img/svg/swa-repair.svg';
        return;
      case ResourceType.Squadron:
        this.asset = '/assets/img/svg/swa-squadron.svg';
        return;
      case ResourceType.ConcentrateFire:
        this.asset = '/assets/img/svg/swa-concentrate.svg';
        return;
    }
  }


}
