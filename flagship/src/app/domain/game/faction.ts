
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
