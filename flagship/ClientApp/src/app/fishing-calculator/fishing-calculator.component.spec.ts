import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FishingCalculatorComponent } from './fishing-calculator.component';

describe('FishingCalculatorComponent', () => {
  let component: FishingCalculatorComponent;
  let fixture: ComponentFixture<FishingCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FishingCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FishingCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
