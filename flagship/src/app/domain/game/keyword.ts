
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
  Strategic,
  AIAntiSquadron,
  AIBattery,
  Adept,
  Dodge,
  Screen
}

export class Keyword {
  constructor(public type: KeywordType, public value: number = null) {

  }

  displayText(): string {
    const name = this.getName();
    if (this.value) {
      return `${name} ${this.value}`;
    }
    return name;
  }

  private getName(): string {
    switch (this.type) {
      case KeywordType.AIAntiSquadron:
        return 'AI: Anti-Squadron';
      case KeywordType.AIBattery:
        return 'AI: Battery';
      default:
        return KeywordType[this.type];
    }
  }

  
}
