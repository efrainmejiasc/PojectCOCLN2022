import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDynamicReportesComponent } from './table-dynamic-reportes.component';

describe('TableDynamicReportesComponent', () => {
  let component: TableDynamicReportesComponent;
  let fixture: ComponentFixture<TableDynamicReportesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDynamicReportesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDynamicReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
