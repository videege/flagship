import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipStatisticsComponent } from './ship-statistics.component';

describe('ShipStatisticsComponent', () => {
  let component: ShipStatisticsComponent;
  let fixture: ComponentFixture<ShipStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
