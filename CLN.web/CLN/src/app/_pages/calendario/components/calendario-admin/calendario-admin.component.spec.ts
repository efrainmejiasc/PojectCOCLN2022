import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioAdminComponent } from './calendario-admin.component';

describe('CalendarioAdminComponent', () => {
  let component: CalendarioAdminComponent;
  let fixture: ComponentFixture<CalendarioAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarioAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
