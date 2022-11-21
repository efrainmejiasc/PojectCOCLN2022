import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidosTituloReportesComponent } from './contenidos-titulo-reportes.component';

describe('ContenidosTituloReportesComponent', () => {
  let component: ContenidosTituloReportesComponent;
  let fixture: ComponentFixture<ContenidosTituloReportesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContenidosTituloReportesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenidosTituloReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
