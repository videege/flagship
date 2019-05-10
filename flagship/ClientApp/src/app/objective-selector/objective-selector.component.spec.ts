import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectiveSelectorComponent } from './objective-selector.component';

describe('ObjectiveSelectorComponent', () => {
  let component: ObjectiveSelectorComponent;
  let fixture: ComponentFixture<ObjectiveSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectiveSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectiveSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
