import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignTeamComponent } from './campaign-team.component';

describe('CampaignTeamComponent', () => {
  let component: CampaignTeamComponent;
  let fixture: ComponentFixture<CampaignTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
