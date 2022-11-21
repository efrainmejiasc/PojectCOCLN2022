import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDynamicCapacidadesComponent } from './table-dynamic-capacidades.component';

describe('TableDynamicCapacidadesComponent', () => {
  let component: TableDynamicCapacidadesComponent;
  let fixture: ComponentFixture<TableDynamicCapacidadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDynamicCapacidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDynamicCapacidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
