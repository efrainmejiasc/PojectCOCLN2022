import { TestBed } from '@angular/core/testing';

import { ConsolidadosService } from './consolidados.service';

describe('ConsolidadosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsolidadosService = TestBed.get(ConsolidadosService);
    expect(service).toBeTruthy();
  });
});
