import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategyPhaseComponent } from './strategy-phase.component';

describe('StrategyPhaseComponent', () => {
  let component: StrategyPhaseComponent;
  let fixture: ComponentFixture<StrategyPhaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrategyPhaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrategyPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
