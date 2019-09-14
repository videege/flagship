import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeSummaryComponent } from './upgrade-summary.component';

describe('UpgradeSummaryComponent', () => {
  let component: UpgradeSummaryComponent;
  let fixture: ComponentFixture<UpgradeSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpgradeSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgradeSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
