import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorReportCitasComponent } from './selector-report-citas.component';

describe('SelectorReportCitasComponent', () => {
  let component: SelectorReportCitasComponent;
  let fixture: ComponentFixture<SelectorReportCitasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorReportCitasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorReportCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
