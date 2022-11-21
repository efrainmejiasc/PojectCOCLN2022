import { TestBed } from '@angular/core/testing';

import { GestionReportesService } from './gestion-reportes.service';

describe('GestionReportesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GestionReportesService = TestBed.get(GestionReportesService);
    expect(service).toBeTruthy();
  });
});
