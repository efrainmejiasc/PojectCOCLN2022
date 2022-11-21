import { TestBed } from '@angular/core/testing';

import { GestionCapacidadesService } from './gestion-capacidades.service';

describe('GestionCapacidadesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GestionCapacidadesService = TestBed.get(GestionCapacidadesService);
    expect(service).toBeTruthy();
  });
});
