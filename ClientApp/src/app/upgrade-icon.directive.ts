import { Directive, Input, HostBinding, OnInit } from '@angular/core';
import { UpgradeType } from './domain/upgradeType';

@Directive({
  selector: '[flagshipUpgradeIcon]'
})
export class UpgradeIconDirective implements OnInit {

  @Input() upgradeType: UpgradeType;
  
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

    this._elementClass.push('upgrade');

    this._elementClass.push(this.upgradeType.toLowerCase());
  }

  constructor() {
  }

}
