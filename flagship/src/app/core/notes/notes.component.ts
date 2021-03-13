import { Component, OnInit } from '@angular/core';
import { Notes, NotesService } from '../services/notes.service';

@Component({
  selector: 'flagship-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: Notes;

  constructor(private notesService: NotesService) {
    this.notes = notesService.getNotes();
   }

  ngOnInit(): void {
  }

}
