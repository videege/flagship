import { Faction } from "./faction";
import { DefenseToken } from "./defenseToken";
import { Keyword } from "./keyword";
import { Armament } from "./armament";
import { Fleet } from './fleet';

export interface SquadronData {
  id: number;
  name: string;
  shipName: string;
  faction: Faction;
  unique: boolean;
  shipUnique: boolean;
  points: number;

  irregular: boolean;
  speed: number;
  hull: number;
  defenseTokens: DefenseToken[];

  text: string;
  keywords: Keyword[];

  antiSquadronArmament: Armament;
  batteryArmament: Armament;
}

export class Squadron implements SquadronData {
  public fleet: Fleet;

  constructor(public id: number, public name: string, public shipName: string, public faction: Faction,
    public unique: boolean, public shipUnique: boolean, public irregular: boolean, public points: number,
    public speed: number, public hull: number, public defenseTokens: DefenseToken[],
    public antiSquadronArmament: Armament, public batteryArmament: Armament,
    public keywords: Keyword[], public text: string) {

  }

  private _displayName: string = null;
  public displayName(): string {
    if (this._displayName)
      return this._displayName;

    if (this.name !== this.shipName) {
      this._displayName = `${this.name} (${this.shipName})`;
    } else {
      this._displayName = this.name;
    }
    return this._displayName;
  }
}
