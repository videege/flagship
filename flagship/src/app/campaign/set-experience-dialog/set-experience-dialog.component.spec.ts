import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetExperienceDialogComponent } from './set-experience-dialog.component';

describe('SetExperienceDialogComponent', () => {
  let component: SetExperienceDialogComponent;
  let fixture: ComponentFixture<SetExperienceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetExperienceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetExperienceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
