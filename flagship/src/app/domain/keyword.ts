
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
  constructor(public type: KeywordType, public value: number = null) {

  }

  displayText(): string {
    let name = KeywordType[this.type];
    if (this.value) {
      return `${name} ${this.value}`;
    }
    return name;
  }

  
}
