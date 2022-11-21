import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificationInputComponent } from './calification-input.component';

describe('CalificationInputComponent', () => {
  let component: CalificationInputComponent;
  let fixture: ComponentFixture<CalificationInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalificationInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalificationInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
