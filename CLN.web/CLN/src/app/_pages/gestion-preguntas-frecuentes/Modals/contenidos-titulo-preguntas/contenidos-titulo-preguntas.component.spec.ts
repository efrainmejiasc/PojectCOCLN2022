import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidosTituloPreguntasComponent } from './contenidos-titulo-preguntas.component';

describe('ContenidosTituloPreguntasComponent', () => {
  let component: ContenidosTituloPreguntasComponent;
  let fixture: ComponentFixture<ContenidosTituloPreguntasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContenidosTituloPreguntasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenidosTituloPreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
