import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAbilitySelectorComponent } from './custom-ability-selector.component';

describe('CustomAbilitySelectorComponent', () => {
  let component: CustomAbilitySelectorComponent;
  let fixture: ComponentFixture<CustomAbilitySelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomAbilitySelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomAbilitySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
