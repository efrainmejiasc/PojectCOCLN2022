import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectLoopDynamicComponent } from './select-loop-dynamic.component';

describe('SelectLoopDynamicComponent', () => {
  let component: SelectLoopDynamicComponent;
  let fixture: ComponentFixture<SelectLoopDynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectLoopDynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectLoopDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
