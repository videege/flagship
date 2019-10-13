import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCommanderComponent } from './custom-commander.component';

describe('CustomCommanderComponent', () => {
  let component: CustomCommanderComponent;
  let fixture: ComponentFixture<CustomCommanderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomCommanderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCommanderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
