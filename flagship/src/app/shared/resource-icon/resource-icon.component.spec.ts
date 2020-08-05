import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceIconComponent } from './resource-icon.component';

describe('ResourceIconComponent', () => {
  let component: ResourceIconComponent;
  let fixture: ComponentFixture<ResourceIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
