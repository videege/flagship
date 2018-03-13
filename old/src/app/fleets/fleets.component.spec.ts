import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetsComponent } from './fleets.component';

describe('FleetsComponent', () => {
  let component: FleetsComponent;
  let fixture: ComponentFixture<FleetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
