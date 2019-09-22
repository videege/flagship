import { Component, OnInit, Input } from '@angular/core';
import { Ship } from 'src/app/domain/ship';

@Component({
  selector: 'flagship-ship-icon',
  templateUrl: './ship-icon.component.html',
  styleUrls: ['./ship-icon.component.css']
})
export class ShipIconComponent implements OnInit {

  @Input() ship: Ship;

  public iconUrl = '';

  constructor() { }

  ngOnInit() {
    switch (this.ship.id) {
      case 1:
      case 2:
      case 3:
      case 4:
        this.iconUrl = 'assets/img/ship-icons/isd.png';
        break;
      case 5:
      case 6:
        this.iconUrl = '/assets/img/ship-icons/arquitens.png';
        break;
      case 7:
      case 8:
        this.iconUrl = '/assets/img/ship-icons/gladiator.png';
        break;
      case 9:
      case 10:
        this.iconUrl = '/assets/img/ship-icons/gozanti.png';
        break;
      case 11:
      case 12:
        this.iconUrl = '/assets/img/ship-icons/interdictor.png';
        break;
      case 13:
      case 14:
        this.iconUrl = '/assets/img/ship-icons/quasar.png';
        break;
      case 15:
      case 16:
        this.iconUrl = '/assets/img/ship-icons/raider.png';
        break;
      case 17:
      case 18:
        this.iconUrl = '/assets/img/ship-icons/victory.png';
        break;
      case 19:
      case 20:
      case 21:
      case 22:
        this.iconUrl = '/assets/img/ship-icons/sd.png';
        break;
      case 101:
      case 102:
        this.iconUrl = '/assets/img/ship-icons/af.png';
        break;
      case 103:
      case 104:
        this.iconUrl = '/assets/img/ship-icons/cr90.png';
        break;
      case 105:
      case 106:
        this.iconUrl = '/assets/img/ship-icons/gr75.png';
        break;
      case 107:
      case 108:
        this.iconUrl = '/assets/img/ship-icons/hammerhead.png';
        break;
      case 109:
      case 110:
        this.iconUrl = '/assets/img/ship-icons/mc30c.png';
        break;
      case 111:
      case 112:
        this.iconUrl = '/assets/img/ship-icons/mc75.png';
        break;
      case 113:
      case 114:
        this.iconUrl = '/assets/img/ship-icons/mc80ho.png';
        break;
      case 115:
      case 116:
        this.iconUrl = '/assets/img/ship-icons/mc80lib.png';
        break;
      case 117:
      case 118:
        this.iconUrl = '/assets/img/ship-icons/pelta.png';
        break;
      case 119:
      case 120:
        this.iconUrl = '/assets/img/ship-icons/nebulon.png';
        break;
    }
  }

}
