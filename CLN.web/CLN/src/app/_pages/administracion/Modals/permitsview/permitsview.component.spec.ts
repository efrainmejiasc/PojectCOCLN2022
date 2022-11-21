import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitsviewComponent } from './permitsview.component';

describe('PermitsviewComponent', () => {
  let component: PermitsviewComponent;
  let fixture: ComponentFixture<PermitsviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermitsviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermitsviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
