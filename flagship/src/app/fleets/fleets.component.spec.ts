
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetsComponent } from './fleets.component';

describe('FleetsComponent', () => {
  let component: FleetsComponent;
  let fixture: ComponentFixture<FleetsComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FleetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
