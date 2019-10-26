import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementPhaseComponent } from './management-phase.component';

describe('ManagementPhaseComponent', () => {
  let component: ManagementPhaseComponent;
  let fixture: ComponentFixture<ManagementPhaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementPhaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
