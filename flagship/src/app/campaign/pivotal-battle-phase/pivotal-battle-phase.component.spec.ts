import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PivotalBattlePhaseComponent } from './pivotal-battle-phase.component';

describe('PivotalBattlePhaseComponent', () => {
  let component: PivotalBattlePhaseComponent;
  let fixture: ComponentFixture<PivotalBattlePhaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PivotalBattlePhaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PivotalBattlePhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
