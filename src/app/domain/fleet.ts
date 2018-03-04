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
    return Math.round(this.pointLimit / 3);
  }
}
