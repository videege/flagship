import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DefenseToken } from 'src/app/domain/game/defenseToken';

@Component({
  selector: 'flagship-defense-token',
  templateUrl: './defense-token.component.html',
  styleUrls: ['./defense-token.component.scss']
})
export class DefenseTokenComponent implements OnInit, OnChanges {


  @Input() type: DefenseToken;
  @Input() size: number = 20;

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
      case DefenseToken.Brace:
        this.asset = "/assets/img/svg/swa-brace.svg";
        return;
      case DefenseToken.Contain:
        this.asset = "/assets/img/svg/swa-contain.svg";
        return;
      case DefenseToken.Evade:
        this.asset = "/assets/img/svg/swa-evade.svg";
        return;
      case DefenseToken.Redirect:
        this.asset = "/assets/img/svg/swa-redirect.svg";
        return;
      case DefenseToken.Salvo:
        this.asset = "/assets/img/svg/swa-salvo.svg";
        return;
      case DefenseToken.Scatter:
        this.asset = "/assets/img/svg/swa-scatter.svg";
        return;
    }
  }

}
