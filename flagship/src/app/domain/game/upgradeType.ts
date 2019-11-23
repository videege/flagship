import { CompileMetadataResolver } from "@angular/compiler";

export enum UpgradeType {
  Commander = "Commander",
  CustomCommander = "Custom Commander",
  Officer = "Officer",
  DefensiveRetrofit = "Defensive Retrofit",
  ExperimentalRetrofit = "Experimental Retrofit",
  FleetCommand = "Fleet Command",
  FleetSupport = "Fleet Support",
  IonCannons = "Ion Cannons",
  OffensiveRetrofit = "Offensive Retrofit",
  Ordnance = "Ordnance",
  SupportTeam = "Support Team",
  Title = "Title",
  WeaponsTeam = "Weapons Team",
  Turbolaser = "Turbolasers",
  BoardingTeam = "Boarding Team",
  Superweapon = "Superweapon"
}

export function sortUpgradeTypes(a: UpgradeType, b: UpgradeType): number {
  const mapping = (t: UpgradeType) => {
    if (t === UpgradeType.Title) {
      return -1;
    } else if (t === UpgradeType.Commander) {
      return -2;
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

