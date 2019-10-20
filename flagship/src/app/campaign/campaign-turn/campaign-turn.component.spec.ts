import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignTurnComponent } from './campaign-turn.component';

describe('CampaignTurnComponent', () => {
  let component: CampaignTurnComponent;
  let fixture: ComponentFixture<CampaignTurnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignTurnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignTurnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
