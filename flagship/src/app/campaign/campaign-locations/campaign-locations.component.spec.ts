import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignLocationsComponent } from './campaign-locations.component';

describe('CampaignLocationsComponent', () => {
  let component: CampaignLocationsComponent;
  let fixture: ComponentFixture<CampaignLocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignLocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
