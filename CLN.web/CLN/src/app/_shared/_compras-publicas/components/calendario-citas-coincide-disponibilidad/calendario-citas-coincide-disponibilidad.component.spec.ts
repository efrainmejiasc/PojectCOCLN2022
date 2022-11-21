import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioCitasCoincideDisponibilidadComponent } from './calendario-citas-coincide-disponibilidad.component';

describe('CalendarioCitasCoincideDisponibilidadComponent', () => {
  let component: CalendarioCitasCoincideDisponibilidadComponent;
  let fixture: ComponentFixture<CalendarioCitasCoincideDisponibilidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarioCitasCoincideDisponibilidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioCitasCoincideDisponibilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
