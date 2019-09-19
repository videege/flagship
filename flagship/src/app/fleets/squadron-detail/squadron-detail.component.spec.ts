import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadronDetailComponent } from './squadron-detail.component';

describe('SquadronDetailComponent', () => {
  let component: SquadronDetailComponent;
  let fixture: ComponentFixture<SquadronDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SquadronDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SquadronDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
