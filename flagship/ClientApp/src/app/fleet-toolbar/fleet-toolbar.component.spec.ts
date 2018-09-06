import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetToolbarComponent } from './fleet-toolbar.component';

describe('FleetToolbarComponent', () => {
  let component: FleetToolbarComponent;
  let fixture: ComponentFixture<FleetToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
