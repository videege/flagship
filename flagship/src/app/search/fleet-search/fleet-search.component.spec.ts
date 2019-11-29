import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetSearchComponent } from './fleet-search.component';

describe('FleetSearchComponent', () => {
  let component: FleetSearchComponent;
  let fixture: ComponentFixture<FleetSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
