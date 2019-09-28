import { SquadronData, Squadron } from '../squadron';
import { Faction } from '../faction';
import { Armament } from '../armament';
import { Keyword, KeywordType } from '../keyword';
import { DefenseToken } from '../defenseToken';

export class SquadronFactory {
    static squadronData: SquadronData[] = [
        // Empire 
        {
            id: 1, name: 'Aggressor Assault Fighter', shipName: 'Aggressor Assault Fighter',
            faction: Faction.Empire, unique: false, shipUnique: false, irregular: true, points: 16,
            speed: 3, hull: 5, defenseTokens: [],
            antiSquadronArmament: new Armament(0, 4, 0), batteryArmament: new Armament(0, 0, 1),
            keywords: [new Keyword(KeywordType.Counter, 1), new Keyword(KeywordType.Rogue, null)],
            text: ''
        },
        {
            id: 2, name: 'IG-88', shipName: 'IG-2000',
            faction: Faction.Empire, unique: true, shipUnique: true, irregular: true, points: 21,
            speed: 5, hull: 5, defenseTokens: [DefenseToken.Scatter],
            antiSquadronArmament: new Armament(0, 4, 0), batteryArmament: new Armament(0, 0, 1),
            keywords: [new Keyword(KeywordType.Counter, 2), new Keyword(KeywordType.Rogue, null)],
            text: 'You ignore the Escort and Counter keywords on enemy squadrons.'
        },
        {
            id: 3, name: 'IG-88B', shipName: 'IG-2000B',
            faction: Faction.Empire, unique: true, shipUnique: true, irregular: true, points: 21,
            speed: 5, hull: 5, defenseTokens: [DefenseToken.Scatter],
            antiSquadronArmament: new Armament(0, 2, 2), batteryArmament: new Armament(0, 0, 1),
            keywords: [new Keyword(KeywordType.Counter, 1), new Keyword(KeywordType.Rogue, null)],
            text: 'At the start of Squadron Phase, you may toggle your activation slider to the activated side. If you do, you may perform an anti-squadron attack against each enemy squadron at distance 1. Treat these attacks as obstructed.'
        },
        {
            id: 4, name: 'Black Squadron', shipName: 'TIE Fighter Squadron',
            faction: Faction.Empire, unique: true, shipUnique: false, irregular: false, points: 9,
            speed: 4, hull: 3, defenseTokens: [],
            antiSquadronArmament: new Armament(0, 3, 0), batteryArmament: new Armament(0, 1, 0),
            keywords: [new Keyword(KeywordType.Counter, 1), new Keyword(KeywordType.Escort, null)],
            text: ''
        },
        {
            id: 4, name: 'Boba Fett', shipName: 'Slave I',
            faction: Faction.Empire, unique: true, shipUnique: true, irregular: true, points: 26,
            speed: 3, hull: 6, defenseTokens: [DefenseToken.Brace, DefenseToken.Brace],
            antiSquadronArmament: new Armament(0, 4, 0), batteryArmament: new Armament(0, 1, 1),
            keywords: [new Keyword(KeywordType.Bomber, null), new Keyword(KeywordType.Rogue, null)],
            text: 'When you activate, choose 1 enemy ship or squadron at distance 1. That ship or squadron suffers 1 damage.'
        },
        {
            id: 5, name: 'Hondo Ohnaka', shipName: 'Slave I',
            faction: Faction.Empire, unique: true, shipUnique: true, irregular: true, points: 24,
            speed: 3, hull: 6, defenseTokens: [DefenseToken.Brace, DefenseToken.Brace],
            antiSquadronArmament: new Armament(0, 4, 0), batteryArmament: new Armament(0, 2, 0),
            keywords: [new Keyword(KeywordType.Bomber, null), new Keyword(KeywordType.Grit, null), new Keyword(KeywordType.Rogue, null)],
            text: 'During your activation, instead of attacking, you may toggle the activation slider of a 1 squadron at distance 1 to the activated side.  If it was already activated, you may place it anywhere at distance 1 of you.'
        },
        {
            id: 6, name: 'Bossk', shipName: 'Hound\'s Tooth',
            faction: Faction.Empire, unique: true, shipUnique: true, irregular: true, points: 23,
            speed: 3, hull: 7, defenseTokens: [DefenseToken.Brace],
            antiSquadronArmament: new Armament(0, 0, 4), batteryArmament: new Armament(0, 1, 1),
            keywords: [new Keyword(KeywordType.Grit), new Keyword(KeywordType.Rogue)],
            text: 'While attacking, if you have 6 or fewer hull points remaining, you may add 1 blue die set to the accuracy icon to your attack pool.'
        },
        {
            id: 7, name: 'Captain Jonus', shipName: 'TIE Bomber Squadron',
            faction: Faction.Empire, unique: true, shipUnique: false, irregular: false, points: 16,
            speed: 4, hull: 5, defenseTokens: [DefenseToken.Brace, DefenseToken.Brace],
            antiSquadronArmament: new Armament(0, 0, 1), batteryArmament: new Armament(0, 0, 1),
            keywords: [new Keyword(KeywordType.Bomber), new Keyword(KeywordType.Grit), new Keyword(KeywordType.Heavy)],
            text: 'While a friendly ship is attacking a ship at distance 1 of you, it may change 1 die to a face with an accuracy icon.'
        },
        {
            id: 8, name: 'Ciena Rae', shipName: 'TIE Interceptor Squadron',
            faction: Faction.Empire, unique: true, shipUnique: false, irregular: false, points: 17,
            speed: 5, hull: 3, defenseTokens: [DefenseToken.Brace, DefenseToken.Scatter],
            antiSquadronArmament: new Armament(0, 4, 0), batteryArmament: new Armament(0, 1, 0),
            keywords: [new Keyword(KeywordType.Counter, 2), new Keyword(KeywordType.Swarm)],
            text: 'While defending, the attack is treated as obstructed.'
        },
        {
            id: 9, name: 'Colonel Jendon', shipName: 'Lambda-Class Shuttle',
            faction: Faction.Empire, unique: true, shipUnique: false, irregular: false, points: 20,
            speed: 3, hull: 6, defenseTokens: [DefenseToken.Brace, DefenseToken.Brace],
            antiSquadronArmament: new Armament(0, 0, 2), batteryArmament: new Armament(0, 1, 0),
            keywords: [new Keyword(KeywordType.Relay, 2), new Keyword(KeywordType.Heavy)],
            text: 'During your activation, instead of attacking, you may choose 1 friendly squadron at distance 1-2. That squadron may perform an attack (even if it has already activated).'
        },
        {
            id: 10, name: 'Darth Vader', shipName: 'TIE Advanced Squadron',
            faction: Faction.Empire, unique: true, shipUnique: false, irregular: false, points: 21,
            speed: 4, hull: 5, defenseTokens: [DefenseToken.Brace, DefenseToken.Brace],
            antiSquadronArmament: new Armament(0, 3, 1), batteryArmament: new Armament(0, 0, 1),
            keywords: [new Keyword(KeywordType.Escort)],
            text: 'While attacking, each of your critical icons adds 1 damage to the damage total.'
        },
        {
            id: 11, name: 'Dengar', shipName: 'Punishing One',
            faction: Faction.Empire, unique: true, shipUnique: true, irregular: true, points: 20,
            speed: 4, hull: 4, defenseTokens: [DefenseToken.Brace, DefenseToken.Scatter],
            antiSquadronArmament: new Armament(0, 3, 0), batteryArmament: new Armament(0, 0, 1),
            keywords: [new Keyword(KeywordType.Intel), new Keyword(KeywordType.Swarm)],
            text: 'While another friendly squadron is at distance 1-2, it has Counter 1 or increases its Counter value by 1.'
        },
        {
            id: 12, name: 'Gamma Squadron', shipName: 'TIE Bomber Squadron',
            faction: Faction.Empire, unique: true, shipUnique: false, irregular: false, points: 10,
            speed: 4, hull: 5, defenseTokens: [],
            antiSquadronArmament: new Armament(0, 0, 1), batteryArmament: new Armament(0, 0, 1),
            keywords: [new Keyword(KeywordType.Bomber), new Keyword(KeywordType.Grit)],
            text: ''
        },
        {
            id: 13, name: 'Gar Saxon', shipName: 'Mandalorian Gauntlet Fighter',
            faction: Faction.Empire, unique: true, shipUnique: false, irregular: true, points: 23,
            speed: 4, hull: 7, defenseTokens: [DefenseToken.Brace],
            antiSquadronArmament: new Armament(1, 2, 0), batteryArmament: new Armament(0, 1, 1),
            keywords: [new Keyword(KeywordType.Assault), new Keyword(KeywordType.Rogue)],
            text: 'When an enemy squadron with Intel or Relay at distance 1 activates, it suffers 1 damage.'
        },
        {
            id: 14, name: 'Howlrunner', shipName: 'TIE Fighter Squadron',
            faction: Faction.Empire, unique: true, shipUnique: false, irregular: false, points: 16,
            speed: 4, hull: 3, defenseTokens: [DefenseToken.Brace, DefenseToken.Scatter],
            antiSquadronArmament: new Armament(0, 3, 0), batteryArmament: new Armament(0, 1, 0),
            keywords: [new Keyword(KeywordType.Swarm)],
            text: 'When another friendly squadron with Swarm at distance 1 is attacking a squadron, it may add 1 blue die to its attack pool.'
        },
        {
            id: 15, name: 'Maarek Stele', shipName: 'TIE Defender Squadron',
            faction: Faction.Empire, unique: true, shipUnique: false, irregular: false, points: 21,
            speed: 5, hull: 6, defenseTokens: [DefenseToken.Brace, DefenseToken.Brace],
            antiSquadronArmament: new Armament(0, 2, 2), batteryArmament: new Armament(0, 2, 0),
            keywords: [new Keyword(KeywordType.Bomber), new Keyword(KeywordType.Grit)],
            text: 'While attacking, you may change 1 die to a face with a critical icon.'
        },
        {
            id: 16, name: 'Major Rhymer', shipName: 'TIE Bomber Squadron',
            faction: Faction.Empire, unique: true, shipUnique: false, irregular: false, points: 16,
            speed: 4, hull: 5, defenseTokens: [DefenseToken.Brace, DefenseToken.Brace],
            antiSquadronArmament: new Armament(0, 1, 1), batteryArmament: new Armament(0, 0, 1),
            keywords: [new Keyword(KeywordType.Bomber), new Keyword(KeywordType.Heavy)],
            text: 'Friendly squadrons at distance 1 can attack enemy ships at close range using all the dice in their battery armament.'
        },
        {
            id: 17, name: '"Mauler" Mithel', shipName: 'TIE Fighter Squadron',
            faction: Faction.Empire, unique: true, shipUnique: false, irregular: false, points: 15,
            speed: 4, hull: 3, defenseTokens: [DefenseToken.Brace, DefenseToken.Scatter],
            antiSquadronArmament: new Armament(0, 3, 0), batteryArmament: new Armament(0, 1, 0),
            keywords: [new Keyword(KeywordType.Swarm)],
            text: 'After you move, each squadron you are engaged with suffers 1 damage.'
        },
        {
            id: 18, name: 'Moralo Eval', shipName: 'YV-666',
            faction: Faction.Empire, unique: true, shipUnique: false, irregular: true, points: 22,
            speed: 3, hull: 7, defenseTokens: [DefenseToken.Brace],
            antiSquadronArmament: new Armament(0, 2, 2), batteryArmament: new Armament(0, 2, 0),
            keywords: [new Keyword(KeywordType.Grit), new Keyword(KeywordType.Rogue)],
            text: 'When an objective token at distance 1-2 and not on an obstacle is moved or removed from the play area, you may move up to distance 1 and attack as if you were activated.'
        },
        {
            id: 19, name: 'Morna Kee', shipName: 'VT-49 Decimator',
            faction: Faction.Empire, unique: true, shipUnique: false, irregular: true, points: 27,
            speed: 3, hull: 8, defenseTokens: [DefenseToken.Brace],
            antiSquadronArmament: new Armament(0, 0, 3), batteryArmament: new Armament(0, 3, 0),
            keywords: [new Keyword(KeywordType.Counter, 1), new Keyword(KeywordType.Rogue)],
            text: 'While attacking, you may spend 1 defense token to reroll any number of dice in your attack pool. When you activate, you may recover 1 of your discarded defense tokens.'
        },
        {
            id: 20, name: 'Saber Squadron', shipName: 'TIE Interceptor Squadron',
            faction: Faction.Empire, unique: true, shipUnique: false, irregular: false, points: 12,
            speed: 5, hull: 3, defenseTokens: [],
            antiSquadronArmament: new Armament(0, 4, 0), batteryArmament: new Armament(0, 1, 0),
            keywords: [new Keyword(KeywordType.Snipe, 4), new Keyword(KeywordType.Swarm)],
            text: ''
        },
        {
            id: 21, name: 'Soontir Fel', shipName: 'TIE Interceptor Squadron',
            faction: Faction.Empire, unique: true, shipUnique: false, irregular: false, points: 19,
            speed: 5, hull: 3, defenseTokens: [DefenseToken.Brace, DefenseToken.Scatter],
            antiSquadronArmament: new Armament(0, 4, 0), batteryArmament: new Armament(0, 1, 0),
            keywords: [new Keyword(KeywordType.Counter, 2), new Keyword(KeywordType.Swarm)],
            text: 'After a squadron you are engaged with performs a non-Counter attack, it suffers 1 damage if it did not attack you.'
        },
        {
            id: 22, name: 'Tel Trevura', shipName: 'JumpMaster 5000',
            faction: Faction.Empire, unique: true, shipUnique: false, irregular: true, points: 17,
            speed: 4, hull: 4, defenseTokens: [DefenseToken.Brace, DefenseToken.Scatter],
            antiSquadronArmament: new Armament(0, 3, 0), batteryArmament: new Armament(0, 1, 0),
            keywords: [new Keyword(KeywordType.Grit), new Keyword(KeywordType.Rogue)],
            text: 'While you have a readied defense token, you gain Escort. After defending against an attack, if you discarded a defense token, you may recover up to three hull (even if you were destroyed).'
        },
        {
            id: 23, name: 'Tempest Squadron', shipName: 'TIE Advanced Squadron',
            faction: Faction.Empire, unique: true, shipUnique: false, irregular: false, points: 13,
            speed: 4, hull: 5, defenseTokens: [],
            antiSquadronArmament: new Armament(0, 3, 0), batteryArmament: new Armament(0, 0, 1),
            keywords: [new Keyword(KeywordType.Bomber), new Keyword(KeywordType.Escort)],
            text: ''
        },
        {
            id: 24, name: 'Valen Rudor', shipName: 'TIE Fighter Squadron',
            faction: Faction.Empire, unique: true, shipUnique: false, irregular: false, points: 13,
            speed: 4, hull: 3, defenseTokens: [DefenseToken.Brace, DefenseToken.Scatter],
            antiSquadronArmament: new Armament(0, 0, 3), batteryArmament: new Armament(0, 1, 0),
            keywords: [new Keyword(KeywordType.Swarm)],
            text: 'While an enemy squadron is engaged with another squadron, it cannot attack you.'
        },
        {
            id: 25, name: '"Whisper"', shipName: 'TIE Phantom Squadron',
            faction: Faction.Empire, unique: true, shipUnique: false, irregular: false, points: 20,
            speed: 4, hull: 4, defenseTokens: [DefenseToken.Brace, DefenseToken.Scatter],
            antiSquadronArmament: new Armament(0, 4, 0), batteryArmament: new Armament(2, 0, 0),
            keywords: [new Keyword(KeywordType.Cloak)],
            text: 'After defending against an attack, if you spent a defense token, you may move up to distance 1, even if you are engaged.'
        },
        {
            id: 26, name: 'Zertik Strom', shipName: 'TIE Advanced Squadron',
            faction: Faction.Empire, unique: true, shipUnique: false, irregular: false, points: 15,
            speed: 4, hull: 5, defenseTokens: [DefenseToken.Brace, DefenseToken.Brace],
            antiSquadronArmament: new Armament(3, 0, 0), batteryArmament: new Armament(0, 0, 1),
            keywords: [new Keyword(KeywordType.Escort)],
            text: 'While attacking, you may choose another friendly squadron at distance 1. If you do, that squadron suffers 1 damage and you may reroll any number of attack dice.'
        },
        {
            id: 27, name: 'Firespray-31', shipName: 'Firespray-31',
            faction: Faction.Empire, unique: false, shipUnique: false, irregular: true, points: 18,
            speed: 3, hull: 6, defenseTokens: [],
            antiSquadronArmament: new Armament(0, 3, 0), batteryArmament: new Armament(0, 2, 0),
            keywords: [new Keyword(KeywordType.Bomber), new Keyword(KeywordType.Rogue)],
            text: ''
        },
        {
            id: 28, name: 'JumpMaster 5000', shipName: 'JumpMaster 5000',
            faction: Faction.Empire, unique: false, shipUnique: false, irregular: true, points: 12,
            speed: 4, hull: 4, defenseTokens: [],
            antiSquadronArmament: new Armament(0, 2, 0), batteryArmament: new Armament(0, 1, 0),
            keywords: [new Keyword(KeywordType.Intel), new Keyword(KeywordType.Swarm)],
            text: ''
        },
        {
            id: 29, name: 'Lambda-Class Shuttle', shipName: 'Lambda-Class Shuttle',
            faction: Faction.Empire, unique: false, shipUnique: false, irregular: true, points: 15,
            speed: 3, hull: 6, defenseTokens: [],
            antiSquadronArmament: new Armament(0, 0, 2), batteryArmament: new Armament(0, 1, 0),
            keywords: [new Keyword(KeywordType.Heavy), new Keyword(KeywordType.Relay, 2), new Keyword(KeywordType.Strategic)],
            text: ''
        },
        {
            id: 30, name: 'Mandalorian Gauntlet Fighter', shipName: 'Mandalorian Gauntlet Fighter',
            faction: Faction.Empire, unique: false, shipUnique: false, irregular: true, points: 20,
            speed: 4, hull: 7, defenseTokens: [],
            antiSquadronArmament: new Armament(1, 2, 0), batteryArmament: new Armament(0, 2, 0),
            keywords: [new Keyword(KeywordType.Assault), new Keyword(KeywordType.Rogue)],
            text: ''
        },
        {
            id: 31, name: 'TIE Advanced Squadron', shipName: 'TIE Advanced Squadron',
            faction: Faction.Empire, unique: false, shipUnique: false, irregular: false, points: 12,
            speed: 4, hull: 5, defenseTokens: [],
            antiSquadronArmament: new Armament(0, 3, 0), batteryArmament: new Armament(0, 0, 1),
            keywords: [new Keyword(KeywordType.Escort)],
            text: ''
        },
        {
            id: 32, name: 'TIE Bomber Squadron', shipName: 'TIE Bomber Squadron',
            faction: Faction.Empire, unique: false, shipUnique: false, irregular: false, points: 9,
            speed: 4, hull: 5, defenseTokens: [],
            antiSquadronArmament: new Armament(0, 0, 1), batteryArmament: new Armament(0, 0, 1),
            keywords: [new Keyword(KeywordType.Bomber), new Keyword(KeywordType.Heavy)],
            text: ''
        },
        {
            id: 33, name: 'TIE Defender Squadron', shipName: 'TIE Defender Squadron',
            faction: Faction.Empire, unique: false, shipUnique: false, irregular: false, points: 16,
            speed: 5, hull: 6, defenseTokens: [],
            antiSquadronArmament: new Armament(0, 2, 2), batteryArmament: new Armament(0, 1, 0),
            keywords: [new Keyword(KeywordType.Bomber)],
            text: ''
        },
        {
            id: 34, name: 'TIE Fighter Squadron', shipName: 'TIE Fighter Squadron',
            faction: Faction.Empire, unique: false, shipUnique: false, irregular: false, points: 8,
            speed: 4, hull: 3, defenseTokens: [],
            antiSquadronArmament: new Armament(0, 3, 0), batteryArmament: new Armament(0, 1, 0),
            keywords: [new Keyword(KeywordType.Swarm)],
            text: ''
        },
        {
            id: 35, name: 'TIE Interceptor Squadron', shipName: 'TIE Interceptor Squadron',
            faction: Faction.Empire, unique: false, shipUnique: false, irregular: false, points: 11,
            speed: 5, hull: 3, defenseTokens: [],
            antiSquadronArmament: new Armament(0, 4, 0), batteryArmament: new Armament(0, 1, 0),
            keywords: [new Keyword(KeywordType.Counter, 2), new Keyword(KeywordType.Swarm)],
            text: ''
        },
        {
            id: 36, name: 'TIE Phantom Squadron', shipName: 'TIE Phantom Squadron',
            faction: Faction.Empire, unique: false, shipUnique: false, irregular: false, points: 14,
            speed: 4, hull: 4, defenseTokens: [],
            antiSquadronArmament: new Armament(0, 4, 0), batteryArmament: new Armament(2, 0, 0),
            keywords: [new Keyword(KeywordType.Cloak)],
            text: ''
        },
        {
            id: 37, name: 'VT-49 Decimator', shipName: 'VT-49 Decimator',
            faction: Faction.Empire, unique: false, shipUnique: false, irregular: true, points: 22,
            speed: 3, hull: 8, defenseTokens: [],
            antiSquadronArmament: new Armament(0, 0, 3), batteryArmament: new Armament(0, 3, 0),
            keywords: [new Keyword(KeywordType.Counter, 1), new Keyword(KeywordType.Heavy), new Keyword(KeywordType.Rogue)],
            text: ''
        },
        {
            id: 38, name: 'YV-666', shipName: 'YV-666',
            faction: Faction.Empire, unique: false, shipUnique: false, irregular: true, points: 15,
            speed: 2, hull: 7, defenseTokens: [],
            antiSquadronArmament: new Armament(0, 2, 2), batteryArmament: new Armament(0, 1, 0),
            keywords: [new Keyword(KeywordType.Grit), new Keyword(KeywordType.Heavy), new Keyword(KeywordType.Rogue)],
            text: ''
        },
        // REBELS
    ];

    getSquadrons(faction: Faction): SquadronData[] {
        return SquadronFactory.squadronData.filter(x => x.faction === faction);
    }

    instantiateSquadron(id: number): Squadron {
        let data = SquadronFactory.squadronData.find(x => x.id === id);

        if (!data)
            return null;

        return new Squadron(data.id, data.name, data.shipName,
            data.faction, data.unique, data.shipUnique, data.irregular, data.points,
            data.speed, data.hull, data.defenseTokens, data.antiSquadronArmament,
            data.batteryArmament, data.keywords, data.text);

    }
}