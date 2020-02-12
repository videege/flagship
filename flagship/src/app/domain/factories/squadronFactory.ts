import { SquadronData, Squadron, ISerializedSquadron } from '../game/squadron';
import { Faction } from '../game/faction';
import { Armament } from '../game/armament';
import { Keyword, KeywordType } from '../game/keyword';
import { DefenseToken } from '../game/defenseToken';

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
            id: 8, name: 'Ciena Ree', shipName: 'TIE Interceptor Squadron',
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
        {
            id: 39, name: 'Black Squadron', shipName: 'TIE Fighter Squadron',
            faction: Faction.Empire, unique: true, shipUnique: false, irregular: false, points: 9,
            speed: 4, hull: 3, defenseTokens: [],
            antiSquadronArmament: new Armament(0, 3, 0), batteryArmament: new Armament(0, 1, 0),
            keywords: [new Keyword(KeywordType.Counter, 1), new Keyword(KeywordType.Escort, null)],
            text: ''
        },
        // REBELS
        {
            id: 100, name: 'Biggs Darklighter', shipName: 'X-Wing Squadron',
            faction: Faction.Rebels, unique: true, shipUnique: false, irregular: false, points: 19,
            speed: 3, hull: 5, defenseTokens: [DefenseToken.Brace, DefenseToken.Brace],
            antiSquadronArmament: new Armament(0, 4, 0), batteryArmament: new Armament(1, 0, 0),
            keywords: [new Keyword(KeywordType.Bomber), new Keyword(KeywordType.Escort)],
            text: 'Before a friendly squadron with Escort at distance 1 suffers damage during an attack, you may reduce the total damage by 1.  If you do, choose a friendly squadron with Escort at distance 1.  That squadron suffers 1 damage.'
        },
        {
            id: 101, name: 'Corran Horn', shipName: 'E-Wing Squadron',
            faction: Faction.Rebels, unique: true, shipUnique: false, irregular: false, points: 22,
            speed: 4, hull: 5, defenseTokens: [DefenseToken.Brace, DefenseToken.Brace],
            antiSquadronArmament: new Armament(0, 4, 0), batteryArmament: new Armament(1, 0, 0),
            keywords: [new Keyword(KeywordType.Bomber), new Keyword(KeywordType.Rogue), new Keyword(KeywordType.Snipe, 4)],
            text: ''
        },
        {
            id: 102, name: 'Dagger Squadron', shipName: 'B-Wing Squadron',
            faction: Faction.Rebels, unique: true, shipUnique: false, irregular: false, points: 15,
            speed: 2, hull: 5, defenseTokens: [DefenseToken.Brace, DefenseToken.Brace],
            antiSquadronArmament: new Armament(0, 2, 1), batteryArmament: new Armament(0, 1, 1),
            keywords: [new Keyword(KeywordType.Bomber), new Keyword(KeywordType.Swarm)],
            text: ''
        },
        {
            id: 103, name: 'Dash Rendar', shipName: 'Outrider',
            faction: Faction.Rebels, unique: true, shipUnique: true, irregular: true, points: 24,
            speed: 4, hull: 6, defenseTokens: [DefenseToken.Brace, DefenseToken.Brace],
            antiSquadronArmament: new Armament(0, 4, 0), batteryArmament: new Armament(0, 0, 1),
            keywords: [new Keyword(KeywordType.Bomber), new Keyword(KeywordType.Rogue)],
            text: 'While attacking, you may reroll 1 die for each enemy squadron or enemy ship at distance 1.'
        },
        {
            id: 104, name: '"Dutch" Vander', shipName: 'Y-Wing Squadron',
            faction: Faction.Rebels, unique: true, shipUnique: false, irregular: false, points: 16,
            speed: 3, hull: 6, defenseTokens: [DefenseToken.Brace, DefenseToken.Brace],
            antiSquadronArmament: new Armament(0, 3, 0), batteryArmament: new Armament(0, 0, 1),
            keywords: [new Keyword(KeywordType.Bomber), new Keyword(KeywordType.Heavy)],
            text: 'When a squadron you attack suffers at least 1 damage, you may toggle its activation slider to the activated slide. If it was already activated, it suffers 1 additional damage instead.'
        },
        {
            id: 105, name: 'Gold Squadron', shipName: 'Y-Wing Squadron',
            faction: Faction.Rebels, unique: true, shipUnique: false, irregular: false, points: 12,
            speed: 3, hull: 6, defenseTokens: [],
            antiSquadronArmament: new Armament(0, 2, 0), batteryArmament: new Armament(0, 2, 0),
            keywords: [new Keyword(KeywordType.Bomber)],
            text: ''
        },
        {
            id: 106, name: 'Green Squadron', shipName: 'A-Wing Squadron',
            faction: Faction.Rebels, unique: true, shipUnique: false, irregular: false, points: 12,
            speed: 3, hull: 6, defenseTokens: [],
            antiSquadronArmament: new Armament(0, 3, 0), batteryArmament: new Armament(0, 0, 1),
            keywords: [new Keyword(KeywordType.Bomber), new Keyword(KeywordType.Counter, 1)],
            text: ''
        },
        {
            id: 107, name: 'Han Solo', shipName: 'Millenium Falcon',
            faction: Faction.Rebels, unique: true, shipUnique: true, irregular: true, points: 26,
            speed: 3, hull: 7, defenseTokens: [DefenseToken.Brace, DefenseToken.Brace],
            antiSquadronArmament: new Armament(0, 2, 2), batteryArmament: new Armament(0, 1, 1),
            keywords: [new Keyword(KeywordType.Grit), new Keyword(KeywordType.Rogue)],
            text: 'At the start of the Ship Phase, you may activate as if you were activated by a squadron command.'
        },
        {
            id: 108, name: 'Hera Syndulla', shipName: 'Ghost',
            faction: Faction.Rebels, unique: true, shipUnique: true, irregular: true, points: 28,
            speed: 3, hull: 8, defenseTokens: [DefenseToken.Brace],
            antiSquadronArmament: new Armament(0, 2, 2), batteryArmament: new Armament(0, 1, 1),
            keywords: [new Keyword(KeywordType.Grit), new Keyword(KeywordType.Rogue)],
            text: 'At the start of the Squadron Phase, choose up to two friendly squadrons at distance 1-2.  Those squadrons gain Rogue until the end of the round.'
        },
        {
            id: 109, name: 'Jan Ors', shipName: 'Moldy Crow',
            faction: Faction.Rebels, unique: true, shipUnique: true, irregular: true, points: 19,
            speed: 3, hull: 4, defenseTokens: [DefenseToken.Brace, DefenseToken.Brace],
            antiSquadronArmament: new Armament(0, 3, 0), batteryArmament: new Armament(0, 0, 1),
            keywords: [new Keyword(KeywordType.Counter, 2), new Keyword(KeywordType.Intel)],
            text: 'While a friendly squadron at distance 1-2 is defending, it can spend your defense tokens.'
        },
        {
            id: 110, name: 'Kanan Jarrus', shipName: 'HWK-290',
            faction: Faction.Rebels, unique: true, shipUnique: false, irregular: true, points: 19,
            speed: 3, hull: 4, defenseTokens: [DefenseToken.Brace, DefenseToken.Brace],
            antiSquadronArmament: new Armament(1, 2, 0), batteryArmament: new Armament(0, 2, 0),
            keywords: [new Keyword(KeywordType.Assault), new Keyword(KeywordType.Cloak), new Keyword(KeywordType.Rogue)],
            text: 'While attacking a ship, you may spend one die with a critical icon. If you do, the defender gains 1 raid token of your choice.'
        },
        {
            id: 111, name: 'Ketsu Onyo', shipName: 'Shadow Caster',
            faction: Faction.Rebels, unique: true, shipUnique: true, irregular: true, points: 22,
            speed: 4, hull: 4, defenseTokens: [DefenseToken.Brace, DefenseToken.Scatter],
            antiSquadronArmament: new Armament(0, 3, 0), batteryArmament: new Armament(0, 2, 0),
            keywords: [new Keyword(KeywordType.Bomber), new Keyword(KeywordType.Grit), new Keyword(KeywordType.Rogue)],
            text: 'While an enemy squadron is at distance 1, its speed is reduced by 2 to a minimum of 1.'
        },
        {
            id: 112, name: 'Keyan Farlander', shipName: 'B-Wing Squadron',
            faction: Faction.Rebels, unique: true, shipUnique: false, irregular: false, points: 20,
            speed: 2, hull: 5, defenseTokens: [DefenseToken.Brace, DefenseToken.Brace],
            antiSquadronArmament: new Armament(0, 3, 0), batteryArmament: new Armament(0, 0, 2),
            keywords: [new Keyword(KeywordType.Bomber)],
            text: 'While attacking a ship, if the defending hull zone has no shields, you may reroll any number of dice in your attack pool.'
        },
        {
            id: 113, name: 'Lando Calrissian', shipName: 'Millenium Falcon',
            faction: Faction.Rebels, unique: true, shipUnique: true, irregular: true, points: 23,
            speed: 3, hull: 7, defenseTokens: [DefenseToken.Brace, DefenseToken.Brace],
            antiSquadronArmament: new Armament(1, 2, 1), batteryArmament: new Armament(1, 1, 0),
            keywords: [new Keyword(KeywordType.Grit), new Keyword(KeywordType.Rogue)],
            text: 'While attacking, you may discard a defense token to set 1 die to any face.  That die cannot be modified again. While defending, you may spend 1 of your defense tokens to force the defender to re-roll 1 or more dice of your choice.'
        },
        {
            id: 114, name: 'Lieutenant Blount', shipName: 'Z-95 Headhunter Squadron',
            faction: Faction.Rebels, unique: true, shipUnique: false, irregular: false, points: 14,
            speed: 3, hull: 3, defenseTokens: [DefenseToken.Brace, DefenseToken.Scatter],
            antiSquadronArmament: new Armament(3, 0, 0), batteryArmament: new Armament(1, 0, 0),
            keywords: [new Keyword(KeywordType.Swarm)],
            text: 'While another friendly squadron with Swarm at distance 1 is attacking a squadron, it may reroll 1 die (in addition to any dice rerolled from Swarm).'
        },
        {
            id: 115, name: 'Luke Skywalker', shipName: 'X-Wing Squadron',
            faction: Faction.Rebels, unique: true, shipUnique: false, irregular: false, points: 20,
            speed: 3, hull: 5, defenseTokens: [DefenseToken.Brace, DefenseToken.Brace],
            antiSquadronArmament: new Armament(0, 4, 0), batteryArmament: new Armament(0, 0, 1),
            keywords: [new Keyword(KeywordType.Bomber), new Keyword(KeywordType.Escort)],
            text: 'While attacking a ship, treat the defender as having no shields.'
        },
        {
            id: 116, name: 'Malee Hurra', shipName: 'Scurrg H-6 Bomber',
            faction: Faction.Rebels, unique: true, shipUnique: false, irregular: true, points: 26,
            speed: 3, hull: 6, defenseTokens: [DefenseToken.Brace, DefenseToken.Brace],
            antiSquadronArmament: new Armament(1, 1, 0), batteryArmament: new Armament(0, 2, 0),
            keywords: [new Keyword(KeywordType.Bomber), new Keyword(KeywordType.Grit)],
            text: 'Once per activation, while a friendly ship is attacking a ship at distance 1 of you and you are engaged by 1 or fewer squadrons, the attacker may spend 1 die to change 1 die to a face with a critical icon.'
        },
        {
            id: 117, name: 'Mart Mattin', shipName: 'Sato\'s Hammer',
            faction: Faction.Rebels, unique: true, shipUnique: true, irregular: true, points: 22,
            speed: 4, hull: 6, defenseTokens: [DefenseToken.Brace, DefenseToken.Brace],
            antiSquadronArmament: new Armament(0, 4, 0), batteryArmament: new Armament(0, 0, 1),
            keywords: [new Keyword(KeywordType.Grit), new Keyword(KeywordType.Rogue)],
            text: 'At the start of the Squadron Phase, you may toggle your activation slider to the activated slide.  If you do, you may place 1 proximity mine token at distance 1.'
        },
        {
            id: 118, name: 'Norra Wexley', shipName: 'Y-Wing Squadron',
            faction: Faction.Rebels, unique: true, shipUnique: false, irregular: false, points: 17,
            speed: 3, hull: 6, defenseTokens: [DefenseToken.Brace, DefenseToken.Brace],
            antiSquadronArmament: new Armament(0, 3, 0), batteryArmament: new Armament(0, 0, 1),
            keywords: [new Keyword(KeywordType.Bomber)],
            text: 'Friendly squadrons with Bomber at distance 1 gain "Critical: the defending hull zone loses 1 shield."'
        },
        {
            id: 119, name: 'Nym', shipName: 'Havoc',
            faction: Faction.Rebels, unique: true, shipUnique: true, irregular: true, points: 21,
            speed: 3, hull: 6, defenseTokens: [DefenseToken.Brace, DefenseToken.Brace],
            antiSquadronArmament: new Armament(0, 2, 0), batteryArmament: new Armament(0, 1, 1),
            keywords: [new Keyword(KeywordType.Bomber), new Keyword(KeywordType.Grit)],
            text: 'Blue Critical: If the defender is a ship, you may choose and discard 1 of its defense tokens.'
        },
        {
            id: 120, name: 'Rogue Squadron', shipName: 'X-Wing Squadron',
            faction: Faction.Rebels, unique: true, shipUnique: false, irregular: false, points: 14,
            speed: 3, hull: 5, defenseTokens: [],
            antiSquadronArmament: new Armament(0, 4, 0), batteryArmament: new Armament(1, 0, 0),
            keywords: [new Keyword(KeywordType.Bomber), new Keyword(KeywordType.Rogue)],
            text: ''
        },
        {
            id: 121, name: 'Shara Bey', shipName: 'A-Wing Squadron',
            faction: Faction.Rebels, unique: true, shipUnique: false, irregular: false, points: 17,
            speed: 5, hull: 4, defenseTokens: [DefenseToken.Brace, DefenseToken.Scatter],
            antiSquadronArmament: new Armament(0, 3, 0), batteryArmament: new Armament(0, 0, 1),
            keywords: [new Keyword(KeywordType.Counter, 3)],
            text: 'While performing a Counter attack, each critical icon adds 1 damage to the damage total.'
        },
        {
            id: 122, name: 'Ten Numb', shipName: 'B-Wing Squadron',
            faction: Faction.Rebels, unique: true, shipUnique: false, irregular: false, points: 19,
            speed: 2, hull: 5, defenseTokens: [DefenseToken.Brace, DefenseToken.Brace],
            antiSquadronArmament: new Armament(0, 2, 1), batteryArmament: new Armament(0, 1, 1),
            keywords: [new Keyword(KeywordType.Bomber)],
            text: 'While attacking a squadron, you may spend one blue die with a critical icon. If you do, each other enemy squadron at distance 1 of the defender suffers 1 damage.'
        },
        {
            id: 123, name: 'Tycho Celchu', shipName: 'A-Wing Squadron',
            faction: Faction.Rebels, unique: true, shipUnique: false, irregular: false, points: 16,
            speed: 5, hull: 4, defenseTokens: [DefenseToken.Brace, DefenseToken.Scatter],
            antiSquadronArmament: new Armament(0, 3, 0), batteryArmament: new Armament(0, 0, 1),
            keywords: [new Keyword(KeywordType.Counter, 2)],
            text: 'You are not prevented from moving or attacking ships while you are engaged.'
        },
        {
            id: 124, name: 'Wedge Antilles', shipName: 'X-Wing Squadron',
            faction: Faction.Rebels, unique: true, shipUnique: false, irregular: false, points: 19,
            speed: 3, hull: 5, defenseTokens: [DefenseToken.Brace, DefenseToken.Brace],
            antiSquadronArmament: new Armament(0, 4, 0), batteryArmament: new Armament(1, 0, 0),
            keywords: [new Keyword(KeywordType.Bomber), new Keyword(KeywordType.Escort)],
            text: 'While attacking an activated squadron, you may add 2 blue dice to your attack pool.'
        },
        {
            id: 125, name: 'A-Wing Squadron', shipName: 'A-Wing Squadron',
            faction: Faction.Rebels, unique: false, shipUnique: false, irregular: false, points: 11,
            speed: 5, hull: 4, defenseTokens: [],
            antiSquadronArmament: new Armament(0, 3, 0), batteryArmament: new Armament(0, 0, 1),
            keywords: [new Keyword(KeywordType.Counter, 2)],
            text: ''
        },
        {
            id: 126, name: 'B-Wing Squadron', shipName: 'B-Wing Squadron',
            faction: Faction.Rebels, unique: false, shipUnique: false, irregular: false, points: 14,
            speed: 2, hull: 5, defenseTokens: [],
            antiSquadronArmament: new Armament(0, 3, 0), batteryArmament: new Armament(0, 1, 1),
            keywords: [new Keyword(KeywordType.Bomber)],
            text: ''
        },
        {
            id: 127, name: 'E-Wing Squadron', shipName: 'E-Wing Squadron',
            faction: Faction.Rebels, unique: false, shipUnique: false, irregular: false, points: 15,
            speed: 4, hull: 5, defenseTokens: [],
            antiSquadronArmament: new Armament(0, 4, 0), batteryArmament: new Armament(1, 0, 0),
            keywords: [new Keyword(KeywordType.Bomber), new Keyword(KeywordType.Snipe, 3)],
            text: ''
        },
        {
            id: 128, name: 'HWK-290', shipName: 'HWK-290',
            faction: Faction.Rebels, unique: false, shipUnique: false, irregular: true, points: 12,
            speed: 3, hull: 4, defenseTokens: [],
            antiSquadronArmament: new Armament(0, 2, 0), batteryArmament: new Armament(0, 1, 0),
            keywords: [new Keyword(KeywordType.Counter, 2), new Keyword(KeywordType.Intel)],
            text: ''
        },
        {
            id: 129, name: 'Lancer-Class Pursuit Craft', shipName: 'Lancer-Class Pursuit Craft',
            faction: Faction.Rebels, unique: false, shipUnique: false, irregular: true, points: 15,
            speed: 4, hull: 4, defenseTokens: [],
            antiSquadronArmament: new Armament(0, 3, 0), batteryArmament: new Armament(0, 0, 1),
            keywords: [new Keyword(KeywordType.Bomber), new Keyword(KeywordType.Grit), new Keyword(KeywordType.Rogue)],
            text: ''
        },
        {
            id: 130, name: 'Skurrg H-6 Bomber', shipName: 'Skurrg H-6 Bomber',
            faction: Faction.Rebels, unique: false, shipUnique: false, irregular: true, points: 16,
            speed: 3, hull: 6, defenseTokens: [],
            antiSquadronArmament: new Armament(0, 2, 0), batteryArmament: new Armament(0, 1, 1),
            keywords: [new Keyword(KeywordType.Bomber), new Keyword(KeywordType.Grit), new Keyword(KeywordType.Heavy)],
            text: ''
        },
        {
            id: 131, name: 'VCX-100 Freighter', shipName: 'VCX-100 Freighter',
            faction: Faction.Rebels, unique: false, shipUnique: false, irregular: true, points: 15,
            speed: 3, hull: 8, defenseTokens: [],
            antiSquadronArmament: new Armament(0, 3, 0), batteryArmament: new Armament(0, 1, 0),
            keywords: [new Keyword(KeywordType.Heavy), new Keyword(KeywordType.Relay, 1), new Keyword(KeywordType.Strategic)],
            text: ''
        },
        {
            id: 132, name: 'X-Wing Squadron', shipName: 'X-Wing Squadron',
            faction: Faction.Rebels, unique: false, shipUnique: false, irregular: false, points: 13,
            speed: 3, hull: 5, defenseTokens: [],
            antiSquadronArmament: new Armament(0, 4, 0), batteryArmament: new Armament(1, 0, 0),
            keywords: [new Keyword(KeywordType.Bomber), new Keyword(KeywordType.Escort)],
            text: ''
        },
        {
            id: 133, name: 'Y-Wing Squadron', shipName: 'Y-Wing Squadron',
            faction: Faction.Rebels, unique: false, shipUnique: false, irregular: false, points: 10,
            speed: 3, hull: 6, defenseTokens: [],
            antiSquadronArmament: new Armament(0, 2, 0), batteryArmament: new Armament(0, 0, 1),
            keywords: [new Keyword(KeywordType.Bomber), new Keyword(KeywordType.Heavy)],
            text: ''
        },
        {
            id: 134, name: 'YT-1300', shipName: 'YT-1300',
            faction: Faction.Rebels, unique: false, shipUnique: false, irregular: true, points: 13,
            speed: 2, hull: 7, defenseTokens: [],
            antiSquadronArmament: new Armament(0, 3, 0), batteryArmament: new Armament(0, 1, 0),
            keywords: [new Keyword(KeywordType.Counter, 1), new Keyword(KeywordType.Escort)],
            text: ''
        },
        {
            id: 135, name: 'YT-2400', shipName: 'YT-2400',
            faction: Faction.Rebels, unique: false, shipUnique: false, irregular: true, points: 16,
            speed: 4, hull: 6, defenseTokens: [],
            antiSquadronArmament: new Armament(0, 4, 0), batteryArmament: new Armament(0, 0, 1),
            keywords: [new Keyword(KeywordType.Rogue)],
            text: ''
        },
        {
            id: 136, name: 'Z-95 Headhunter Squadron', shipName: 'Z-95 Headhunter Squadron',
            faction: Faction.Rebels, unique: false, shipUnique: false, irregular: false, points: 7,
            speed: 3, hull: 3, defenseTokens: [],
            antiSquadronArmament: new Armament(3, 0, 0), batteryArmament: new Armament(1, 0, 0),
            keywords: [new Keyword(KeywordType.Swarm)],
            text: ''
        },
    ];

    getSquadrons(faction: Faction): SquadronData[] {
        return SquadronFactory.squadronData.filter(x => x.faction === faction);
    }

    getSquadronByName(name: string): SquadronData {
        return SquadronFactory.squadronData.find(x => x.name.toLowerCase() === name.toLowerCase());
    }

    instantiateSquadron(serializedSquadron: ISerializedSquadron | number): Squadron {
        let id = typeof serializedSquadron === 'number' ? serializedSquadron : serializedSquadron.id;
        let data = SquadronFactory.squadronData.find(x => x.id === id);

        if (!data)
            return null;

        let squadron = new Squadron(data.id, data.name, data.shipName,
            data.faction, data.unique, data.shipUnique, data.irregular, data.points,
            data.speed, data.hull, data.defenseTokens, data.antiSquadronArmament,
            data.batteryArmament, data.keywords, data.text);
        if (typeof serializedSquadron !== 'number') {
            squadron.isScarred = serializedSquadron.isScarred;
            squadron.isVeteran = serializedSquadron.isVeteran;
        }
        return squadron;

    }
}
