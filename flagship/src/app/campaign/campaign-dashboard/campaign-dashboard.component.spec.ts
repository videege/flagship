import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignDashboardComponent } from './campaign-dashboard.component';

describe('CampaignDashboardComponent', () => {
  let component: CampaignDashboardComponent;
  let fixture: ComponentFixture<CampaignDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
