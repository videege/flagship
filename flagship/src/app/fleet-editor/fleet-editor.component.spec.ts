import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetEditorComponent } from './fleet-editor.component';

describe('FleetEditorComponent', () => {
  let component: FleetEditorComponent;
  let fixture: ComponentFixture<FleetEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
