import { SquadronData, Squadron } from '../squadron';
import { Faction } from '../faction';
import { Armament } from '../armament';
import { Keyword, KeywordType } from '../keyword';
import { DefenseToken } from '../defenseToken';

export class SquadronFactory {
    static squadronData: SquadronData[] = [
        {
            id: 1, name: 'Aggressor Assault Fighter', shipName: 'Aggressor Assault Fighter',
            faction: Faction.Empire, unique: false, irregular: true, points: 16,
            speed: 3, hull: 5, defenseTokens: [],
            antiSquadronArmament: new Armament(0, 4, 0), batteryArmament: new Armament(0, 0, 1),
            keywords: [new Keyword(KeywordType.Counter, 1), new Keyword(KeywordType.Rogue, null)],
            text: ''
        },
        {
            id: 2, name: 'IG-88', shipName: 'IG-2000',
            faction: Faction.Empire, unique: true, irregular: true, points: 21,
            speed: 5, hull: 5, defenseTokens: [DefenseToken.Scatter],
            antiSquadronArmament: new Armament(0, 4, 0), batteryArmament: new Armament(0, 0, 1),
            keywords: [new Keyword(KeywordType.Counter, 2), new Keyword(KeywordType.Rogue, null)],
            text: 'You ignore the Escort and Counter keywords on enemy squadrons.'
        },
        {
            id: 3, name: 'IG-88B', shipName: 'IG-2000B',
            faction: Faction.Empire, unique: true, irregular: true, points: 21,
            speed: 5, hull: 5, defenseTokens: [DefenseToken.Scatter],
            antiSquadronArmament: new Armament(0, 2, 2), batteryArmament: new Armament(0, 0, 1),
            keywords: [new Keyword(KeywordType.Counter, 1), new Keyword(KeywordType.Rogue, null)],
            text: 'At the start of Squadron Phase, you may toggle your activation slider to the activated side. If you do, you may perform an anti-squadron attack against each enemy squadron at distance 1. Treat these attacks as obstructed.'
        }
    ];

    getSquadrons(faction: Faction): SquadronData[] {
        return SquadronFactory.squadronData.filter(x => x.faction === faction);
    }

    instantiateSquadron(id: number): Squadron {
        let data = SquadronFactory.squadronData.find(x => x.id === id);

        if (!data)
            return null;

        return new Squadron(data.id, data.name, data.shipName,
            data.faction, data.unique, data.irregular, data.points,
            data.speed, data.hull, data.defenseTokens, data.antiSquadronArmament,
            data.batteryArmament, data.keywords, data.text);

    }
}