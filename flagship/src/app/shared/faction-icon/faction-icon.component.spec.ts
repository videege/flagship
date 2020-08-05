import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactionIconComponent } from './faction-icon.component';

describe('FactionIconComponent', () => {
  let component: FactionIconComponent;
  let fixture: ComponentFixture<FactionIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactionIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactionIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
