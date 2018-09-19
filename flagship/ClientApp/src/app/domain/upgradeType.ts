import { CompileMetadataResolver } from "../../../node_modules/@angular/compiler";

export enum UpgradeType {
  Commander = "Commander",
  Officer = "Officer",
  DefensiveRetrofit = "DefensiveRetrofit",
  ExperimentalRetrofit = "ExperimentalRetrofit",
  FleetCommand = "FleetCommand",
  FleetSupport = "FleetSupport",
  IonCannons = "IonCannons",
  OffensiveRetrofit = "OffensiveRetrofit",
  Ordnance = "Ordnance",
  SupportTeam = "SupportTeam",
  Title = "Title",
  WeaponsTeam = "WeaponsTeam",
  Turbolaser = "Turbolasers",
  BoardingTeam = "BoardingTeam"
}

export function sortUpgradeTypes(a: UpgradeType, b: UpgradeType): number {
  const mapping = (t: UpgradeType) => {
    if (t === UpgradeType.Title) {
      return -2;
    } else if (t === UpgradeType.Commander) {
      return -1;
    } else {
      return 0;
    }
  };

  let am = mapping(a);
  let bm = mapping(b);
  if (am < bm) {
    return -1;
  } else if (am > bm) {
    return 1;
  } else {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    }
  }
  return 0;
}

