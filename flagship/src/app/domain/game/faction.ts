
export enum Faction {
  Empire,
  Rebels,
  Any
}

export function oppositeFaction(faction: Faction): Faction {
  switch (faction) {
    case Faction.Empire:
      return Faction.Rebels;
    case Faction.Rebels:
      return Faction.Empire;
    default:
      return null;
  }
}
