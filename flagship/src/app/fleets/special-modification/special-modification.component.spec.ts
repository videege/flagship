import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialModificationComponent } from './special-modification.component';

describe('SpecialModificationComponent', () => {
  let component: SpecialModificationComponent;
  let fixture: ComponentFixture<SpecialModificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialModificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
