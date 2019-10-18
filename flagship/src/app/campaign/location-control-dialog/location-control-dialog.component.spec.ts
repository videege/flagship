import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationControlDialogComponent } from './location-control-dialog.component';

describe('LocationControlDialogComponent', () => {
  let component: LocationControlDialogComponent;
  let fixture: ComponentFixture<LocationControlDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationControlDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationControlDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
