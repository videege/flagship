
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
  constructor(public type: KeywordType, public value: number) {

  }

  displayText(): string {
    if (this.value) {
      return `${this.type.toString()} ${this.value}`;
    }
    return this.type.toString();
  }

  
}
