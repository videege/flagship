import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeModificationComponent } from './change-modification.component';

describe('ChangeModificationComponent', () => {
  let component: ChangeModificationComponent;
  let fixture: ComponentFixture<ChangeModificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeModificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
