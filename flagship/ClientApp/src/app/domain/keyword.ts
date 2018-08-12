
export enum KeywordType {
  Rogue,
  Swarm,
  Bomber,
  Counter,
  Heavy,
  Intel,
  Assault,
  Grit,
  Escort,
  Cloak,
  Relay,
  Snipe,
  Strategic
}

export class Keyword {
  type: KeywordType;
  value: number;
}
