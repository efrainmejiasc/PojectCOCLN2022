import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablecerDisponibilidadComponent } from './establecer-disponibilidad.component';

describe('EstablecerDisponibilidadComponent', () => {
  let component: EstablecerDisponibilidadComponent;
  let fixture: ComponentFixture<EstablecerDisponibilidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstablecerDisponibilidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstablecerDisponibilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
