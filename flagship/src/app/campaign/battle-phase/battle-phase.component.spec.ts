import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlePhaseComponent } from './battle-phase.component';

describe('BattlePhaseComponent', () => {
  let component: BattlePhaseComponent;
  let fixture: ComponentFixture<BattlePhaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlePhaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlePhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
