import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDynamicContenidosComponent } from './table-dynamic-contenidos.component';

describe('TableDynamicContenidosComponent', () => {
  let component: TableDynamicContenidosComponent;
  let fixture: ComponentFixture<TableDynamicContenidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDynamicContenidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDynamicContenidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
