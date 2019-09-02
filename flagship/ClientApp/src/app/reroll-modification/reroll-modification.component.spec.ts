import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RerollModificationComponent } from './reroll-modification.component';

describe('RerollModificationComponent', () => {
  let component: RerollModificationComponent;
  let fixture: ComponentFixture<RerollModificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RerollModificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RerollModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
