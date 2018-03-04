import { Faction } from "./faction";
import { DefenseToken } from "./defenseToken";

export class Squadron {
  name: string;
  faction: Faction;
  unique: boolean;
  points: number;

  speed: number;
  hull: number;
  defenseTokens: DefenseToken[];

  text: string;
  keywords: string[];
}
