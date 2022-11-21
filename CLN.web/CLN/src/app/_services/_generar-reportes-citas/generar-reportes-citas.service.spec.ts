import { TestBed } from '@angular/core/testing';

import { GenerarReportesCitasService } from './generar-reportes-citas.service';

describe('GenerarReportesCitasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenerarReportesCitasService = TestBed.get(GenerarReportesCitasService);
    expect(service).toBeTruthy();
  });
});
