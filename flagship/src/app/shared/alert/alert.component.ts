import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

export enum AlertType {
  INFO = 1,
  ERROR,
  WARN,
  SUCCESS
}

export type AlertTypeString = ('info' | 'error' | 'warn' | 'success');

@Component({
  selector: 'flagship-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [
    trigger('info-slide-in', [
      state('true', style({display: 'block', opacity: 1, height: '*'})),
      state('false', style({display: 'none', opacity: 0, height: 0})),
      transition('false => true', [
        animate('700ms ease')
      ]),
      transition('true => false', [
        animate('700ms ease-in'),
      ]),
    ]),
  ]
})
export class AlertComponent implements OnInit {
  isOpenState = false;
  @Input() type: (AlertType | AlertTypeString);
  @Output() isOpenChange = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  @Input()
  get isOpen() {
    return this.isOpenState;
  }

  set isOpen(isOpen: boolean) {
    this.isOpenState = isOpen;
    this.isOpenChange.emit(this.isOpenState);
  }

  getAlertType(): AlertTypeString {
    if (typeof this.type === 'string') {
      return this.type;
    } else {
      switch (this.type) {
        case AlertType.ERROR:
          return 'error';
        case AlertType.INFO:
          return 'info';
        case AlertType.SUCCESS:
          return 'success';
        case AlertType.WARN:
          return 'warn';
      }
    }
  }

}
