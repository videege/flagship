import { Component, OnInit, Input } from '@angular/core';
import { Faction } from 'src/app/domain/game/faction';

@Component({
  selector: 'flagship-faction-icon',
  templateUrl: './faction-icon.component.html',
  styleUrls: ['./faction-icon.component.scss']
})
export class FactionIconComponent implements OnInit {

  @Input() faction: Faction;

  public iconUrl = '';

  constructor() { }

  ngOnInit() {
    switch (this.faction) {
      case Faction.Empire:
        this.iconUrl = '/assets/img/empire.png';
        break;
      case Faction.Rebels:
        this.iconUrl = '/assets/img/rebels.png';
        break;
      case Faction.Republic:
        this.iconUrl = '/assets/img/republic.png';
        break;
      case Faction.Separatists:
        this.iconUrl = '/assets/img/separatist.png';
        break;
    }
  }

}
