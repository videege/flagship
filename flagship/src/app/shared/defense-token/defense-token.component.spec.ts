import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefenseTokenComponent } from './defense-token.component';

describe('DefenseTokenComponent', () => {
  let component: DefenseTokenComponent;
  let fixture: ComponentFixture<DefenseTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefenseTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefenseTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
