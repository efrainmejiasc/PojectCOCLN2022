import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionAttributeComponent } from './action-attribute.component';

describe('ActionAttributeComponent', () => {
  let component: ActionAttributeComponent;
  let fixture: ComponentFixture<ActionAttributeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionAttributeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
