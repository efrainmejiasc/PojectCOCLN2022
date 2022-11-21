import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarProcesosComponent } from './consultar-procesos.component';

describe('ConsultarProcesosComponent', () => {
  let component: ConsultarProcesosComponent;
  let fixture: ComponentFixture<ConsultarProcesosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarProcesosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarProcesosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
