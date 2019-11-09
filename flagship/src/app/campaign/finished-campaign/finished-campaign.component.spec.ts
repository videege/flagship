import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedCampaignComponent } from './finished-campaign.component';

describe('FinishedCampaignComponent', () => {
  let component: FinishedCampaignComponent;
  let fixture: ComponentFixture<FinishedCampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishedCampaignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishedCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
