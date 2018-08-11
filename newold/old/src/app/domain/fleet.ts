import { Faction } from "./faction";
import { Ship } from "./ship";
import { Squadron } from "./squadron";

export class Fleet {
  id: number;
  name: string;
  author: string;
  faction: Faction;
  pointLimit: number;

  ships: Ship[];
  squadrons: Squadron[];

  squadronPointLimit(): number {
    return Math.ceil(this.pointLimit / 3);
  }

  currentPoints(): number {
    let points = 0;
    for (let i = 0; i < this.ships.length; i++) {
      points += this.ships[i].currentPoints();
    }
    for (let i = 0; i < this.squadrons.length; i++) {
      points += this.squadrons[i].points;
    }

    return points;
  }
}
