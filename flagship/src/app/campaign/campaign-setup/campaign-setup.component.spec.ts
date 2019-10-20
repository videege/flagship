import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignSetupComponent } from './campaign-setup.component';

describe('CampaignSetupComponent', () => {
  let component: CampaignSetupComponent;
  let fixture: ComponentFixture<CampaignSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
