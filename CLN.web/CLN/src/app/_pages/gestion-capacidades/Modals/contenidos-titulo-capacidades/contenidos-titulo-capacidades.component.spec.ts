import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidosTituloCapacidadesComponent } from './contenidos-titulo-capacidades.component';

describe('ContenidosTituloCapacidadesComponent', () => {
  let component: ContenidosTituloCapacidadesComponent;
  let fixture: ComponentFixture<ContenidosTituloCapacidadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContenidosTituloCapacidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenidosTituloCapacidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
