import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionModificationComponent } from './addition-modification.component';

describe('AdditionModificationComponent', () => {
  let component: AdditionModificationComponent;
  let fixture: ComponentFixture<AdditionModificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionModificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
