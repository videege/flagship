import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetCampaignPointsDialogComponent } from './set-campaign-points-dialog.component';

describe('SetCampaignPointsDialogComponent', () => {
  let component: SetCampaignPointsDialogComponent;
  let fixture: ComponentFixture<SetCampaignPointsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetCampaignPointsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetCampaignPointsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
