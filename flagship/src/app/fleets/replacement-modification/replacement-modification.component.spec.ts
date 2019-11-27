import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplacementModificationComponent } from './replacement-modification.component';

describe('ReplacementModificationComponent', () => {
  let component: ReplacementModificationComponent;
  let fixture: ComponentFixture<ReplacementModificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplacementModificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplacementModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
