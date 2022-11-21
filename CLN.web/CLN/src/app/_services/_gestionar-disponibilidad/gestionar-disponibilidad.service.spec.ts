import { TestBed } from '@angular/core/testing';

import { GestionarDisponibilidadService } from './gestionar-disponibilidad.service';

describe('GestionarDisponibilidadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GestionarDisponibilidadService = TestBed.get(GestionarDisponibilidadService);
    expect(service).toBeTruthy();
  });
});
