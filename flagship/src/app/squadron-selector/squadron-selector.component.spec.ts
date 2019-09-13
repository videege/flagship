import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadronSelectorComponent } from './squadron-selector.component';

describe('SquadronSelectorComponent', () => {
  let component: SquadronSelectorComponent;
  let fixture: ComponentFixture<SquadronSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SquadronSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SquadronSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
