import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadronsListComponent } from './squadrons-list.component';

describe('SquadronsListComponent', () => {
  let component: SquadronsListComponent;
  let fixture: ComponentFixture<SquadronsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SquadronsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SquadronsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
