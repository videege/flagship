import { Injectable } from '@angular/core';

export class Notes {
  version: string;
  notes: Note[];
}

export class Note {
  content: string[];
  date: Date;
  title?: string = null;
}

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  public getNotes(): Notes {
    return NotesService._notes;
  }

  // tslint:disable-next-line:member-ordering
  static _notes: Notes = {
    version: '0.0.3',
    notes: [
      {
        title: 'Final Wave 10 Upgrades',
        date: new Date('2021-04-12'),
        content: [
                  `Added additional upgrades spoiled before the release of wave 10.`,
                  `Various new effects added to the statistics simulator, including SPHA-T, which will show the ignition arc in the simulator.`
                ]
      },
      {
        title: 'Additional Wave 10 Upgrades',
        date: new Date('2021-03-20'),
        content: [`Added additional spoiled wave 10 content for Separatists and Republic.`]
      },
      {
        title: 'Wave 10 Spoiled Content',
        date: new Date('2021-03-13'),
        content: [`Added spoiled wave 10 content for Separatists and Republic.`,
                  `Added this notes feature to compensate for the official forums going down.`]
      }
    ]
  };
}
