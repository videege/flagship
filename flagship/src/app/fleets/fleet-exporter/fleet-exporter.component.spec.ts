import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetExporterComponent } from './fleet-exporter.component';

describe('FleetExporterComponent', () => {
  let component: FleetExporterComponent;
  let fixture: ComponentFixture<FleetExporterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetExporterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetExporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
