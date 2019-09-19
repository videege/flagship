import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipEditorComponent } from './ship-editor.component';

describe('ShipEditorComponent', () => {
  let component: ShipEditorComponent;
  let fixture: ComponentFixture<ShipEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
