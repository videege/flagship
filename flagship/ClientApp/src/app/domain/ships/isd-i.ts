import { Ship } from '../ship';
import { Faction } from '../faction';
import { Armament } from '../armament';
import { Size } from '../size';
import { UpgradeType } from '../upgradeType';
import { UpgradeSlot } from '../upgradeSlot';
import { DefenseToken } from '../defenseToken';
import { ShipClass } from '../shipClass';

export class ISDI extends Ship {
    
    constructor() {
        super('Imperial I-Class Star Destroyer', Faction.Empire,Size.Large, ShipClass.Imperial,
        11, 3, 4, 4, 110,
        [DefenseToken.Brace, DefenseToken.Redirect, DefenseToken.Redirect, DefenseToken.Contain],
        4, 3, 3, 2, new Armament(0, 1, 1), new Armament(3, 2, 3),  new Armament(2, 0, 2),  
        new Armament(2, 0, 2), new Armament(1, 2, 0), 
        [ new UpgradeSlot(UpgradeType.Commander), new UpgradeSlot(UpgradeType.Title),
            new UpgradeSlot(UpgradeType.Officer), new UpgradeSlot(UpgradeType.BoardingTeam),
            new UpgradeSlot(UpgradeType.WeaponsTeam), new UpgradeSlot(UpgradeType.OffensiveRetrofit),
            new UpgradeSlot(UpgradeType.OffensiveRetrofit), new UpgradeSlot(UpgradeType.IonCannons),
            new UpgradeSlot(UpgradeType.Turbolaser) ]);
    }
}