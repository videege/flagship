import { Faction } from "./faction";
import { DefenseToken } from "./defenseToken";
import { Keyword } from "./keyword";
import { Armament } from "./armament";

export class Squadron {
  name: string;
  faction: Faction;
  unique: boolean;
  points: number;

  speed: number;
  hull: number;
  defenseTokens: DefenseToken[];

  text: string;
  keywords: Keyword[];

  antiSquadronArmament: Armament;
  batteryArmament: Armament;
}
