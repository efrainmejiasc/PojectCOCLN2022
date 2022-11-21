import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptativeComponent } from './captative.component';

describe('CaptativeComponent', () => {
  let component: CaptativeComponent;
  let fixture: ComponentFixture<CaptativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaptativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
