import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipIconComponent } from './ship-icon.component';

describe('ShipIconComponent', () => {
  let component: ShipIconComponent;
  let fixture: ComponentFixture<ShipIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
