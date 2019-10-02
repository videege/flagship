import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCreatorDialogComponent } from './player-creator-dialog.component';

describe('PlayerCreatorDialogComponent', () => {
  let component: PlayerCreatorDialogComponent;
  let fixture: ComponentFixture<PlayerCreatorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerCreatorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerCreatorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
