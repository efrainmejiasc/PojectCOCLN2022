import { TestBed } from '@angular/core/testing';

import { AutodiagnosticoService } from './autodiagnostico.service';

describe('AutodiagnosticoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutodiagnosticoService = TestBed.get(AutodiagnosticoService);
    expect(service).toBeTruthy();
  });
});
