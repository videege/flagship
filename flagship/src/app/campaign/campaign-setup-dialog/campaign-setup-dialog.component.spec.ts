import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignSetupDialogComponent } from './campaign-setup-dialog.component';

describe('CampaignSetupDialogComponent', () => {
  let component: CampaignSetupDialogComponent;
  let fixture: ComponentFixture<CampaignSetupDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignSetupDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignSetupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
