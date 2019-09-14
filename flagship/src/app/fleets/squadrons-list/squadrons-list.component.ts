import { Component, OnInit, Input } from '@angular/core';
import { Squadron } from '../../domain/squadron';
import { Fleet } from '../../domain/fleet';
import { SquadronFactory } from '../../domain/factories/squadronFactory';

@Component({
  selector: 'flagship-squadrons-list',
  templateUrl: './squadrons-list.component.html',
  styleUrls: ['./squadrons-list.component.css']
})
export class SquadronsListComponent implements OnInit {
  @Input() fleet: Fleet;

  private _squadrons: Squadron[];
  private squadronFactory = new SquadronFactory();
  @Input() set squadrons(value: any) {
    this._squadrons = value.squadrons;
    this.initialize();
  }

  public squadronCounts: { [id: number]: number } = {}
  public distinctSquadrons: { [id: number]: Squadron } = {}
  public squadronIds: number[] = [];
  constructor() { }

  ngOnInit() {
    this.initialize()
  }

  initialize() {
    this.squadronCounts = {};
    this.distinctSquadrons = {};
    this.squadronIds = [];
    if (this._squadrons) {
      this._squadrons.forEach(squadron => {
        if (this.squadronIds.indexOf(squadron.id) === -1) {
          this.squadronIds.push(squadron.id);
          this.distinctSquadrons[squadron.id] = squadron;
          this.squadronCounts[squadron.id] = 1;
        } else {
          this.squadronCounts[squadron.id] += 1;
        }
      });
    }
  }

  removeDistinctSquadron(id: number) {
    let _count = this.squadronCounts[id];
    for (let i = 0; i < _count; i++) {
      this.fleet.removeSquadron(id);
    }
  }

  increaseSquadronCount(id: number) {
    let squadron = this.squadronFactory.instantiateSquadron(id);
    this.fleet.addSquadron(squadron);
  }

  decreaseSquadronCount(id: number) {
    if (this.squadronCounts[id] > 1) {
      this.fleet.removeSquadron(id);
    }
  }
}
