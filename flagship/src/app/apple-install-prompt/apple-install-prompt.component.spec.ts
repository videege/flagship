import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppleInstallPromptComponent } from './apple-install-prompt.component';

describe('AppleInstallPromptComponent', () => {
  let component: AppleInstallPromptComponent;
  let fixture: ComponentFixture<AppleInstallPromptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppleInstallPromptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppleInstallPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
