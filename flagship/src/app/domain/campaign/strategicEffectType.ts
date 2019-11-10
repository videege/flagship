
export enum StrategicEffectType {
    Ally = 1,
    Destiny = 2,
    Resources = 3,
    Diplomats = 4,
    RepairYards = 5,
    SkilledSpacers = 6,
    Spynet = 7
}

export class StrategicEffects {
    static CCStrategicEffects: StrategicEffectType[] = [
        StrategicEffectType.Diplomats,
        StrategicEffectType.RepairYards,
        StrategicEffectType.SkilledSpacers,
        StrategicEffectType.Spynet
    ];

    static RITRStrategicEffects: StrategicEffectType[] = [
        StrategicEffectType.Ally,
        StrategicEffectType.Destiny,
        StrategicEffectType.Diplomats,
        StrategicEffectType.RepairYards,
        StrategicEffectType.Resources,
        StrategicEffectType.SkilledSpacers,
        StrategicEffectType.Spynet
    ];

    static effectName(effect: StrategicEffectType): string {
        switch (effect) {
          case StrategicEffectType.Ally:
            return "Ally";
          case StrategicEffectType.Destiny:
            return "Destiny";
          case StrategicEffectType.Diplomats:
            return "Diplomats";
          case StrategicEffectType.RepairYards:
            return "Repair Yards";
          case StrategicEffectType.Resources:
            return "Resources";
          case StrategicEffectType.SkilledSpacers:
            return "Skilled Spacers";
          case StrategicEffectType.Spynet:
            return "Spynet";
          default:
            return null;
        }
      }
}
