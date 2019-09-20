import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePromptComponent } from './update-prompt.component';

describe('UpdatePromptComponent', () => {
  let component: UpdatePromptComponent;
  let fixture: ComponentFixture<UpdatePromptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePromptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
