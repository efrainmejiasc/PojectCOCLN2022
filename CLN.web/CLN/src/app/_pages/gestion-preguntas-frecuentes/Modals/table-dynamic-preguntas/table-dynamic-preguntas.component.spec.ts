import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDynamicPreguntasComponent } from './table-dynamic-preguntas.component';

describe('TableDynamicPreguntasComponent', () => {
  let component: TableDynamicPreguntasComponent;
  let fixture: ComponentFixture<TableDynamicPreguntasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDynamicPreguntasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDynamicPreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
