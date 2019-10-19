import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTimelineComponent } from './event-timeline.component';

describe('EventTimelineComponent', () => {
  let component: EventTimelineComponent;
  let fixture: ComponentFixture<EventTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
