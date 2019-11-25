import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetImporterComponent } from './fleet-importer.component';

describe('FleetImporterComponent', () => {
  let component: FleetImporterComponent;
  let fixture: ComponentFixture<FleetImporterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetImporterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetImporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
