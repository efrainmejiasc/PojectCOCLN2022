import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDynamicRolComponent } from './table-dynamic-rol.component';

describe('TableDynamicRolComponent', () => {
  let component: TableDynamicRolComponent;
  let fixture: ComponentFixture<TableDynamicRolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDynamicRolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDynamicRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
