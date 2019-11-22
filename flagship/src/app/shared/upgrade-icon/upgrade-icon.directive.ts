import { Directive, Input, HostBinding, OnInit } from '@angular/core';
import { UpgradeType } from '../../domain/game/upgradeType';

@Directive({
  selector: '[flagshipUpgradeIcon]'
})
export class UpgradeIconDirective implements OnInit {

  @Input() upgradeType: UpgradeType;
  @Input() small: boolean = false;

  protected _elementClass: string[] = [];

  @Input('class')
  @HostBinding('class')
  get elementClass(): string {
    return this._elementClass.join(' ');
  }
  set(val: string) {
    this._elementClass = val.split(' ');
  }

  ngOnInit() {
    this._elementClass.push(this.small ? 'upgrade-small' : 'upgrade');

    let name = this.upgradeType === UpgradeType.CustomCommander
      ? "commander"
      : this.upgradeType.toLowerCase().replace(' ', '');
    this._elementClass.push(name);
  }

  constructor() {
  }

}
