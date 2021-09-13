
export enum Faction {
  Empire,
  Rebels,
  Any,
  Republic,
  Separatists
}

export function oppositeFaction(faction: Faction): Faction {
  switch (faction) {
    case Faction.Empire:
      return Faction.Rebels;
    case Faction.Rebels:
      return Faction.Empire;
    case Faction.Republic:
      return Faction.Separatists;
    case Faction.Separatists:
      return Faction.Republic;
    default:
      return null;
  }
}

export function factionNoun(faction: Faction): string {
  switch(faction) {
    case Faction.Empire:
      return "Empire";
    case Faction.Rebels:
      return "Rebels";
    case Faction.Republic:
      return "Republic";
    case Faction.Separatists:
      return "Separatists";
    default:
      return null;
  }
}

export function factionAdjective(faction: Faction): string {
  switch(faction) {
    case Faction.Empire:
      return "Imperial";
    case Faction.Rebels:
      return "Rebel";
    case Faction.Republic:
      return "Republic";
    case Faction.Separatists:
      return "Separatist";
    default:
      return null;
  }
}
