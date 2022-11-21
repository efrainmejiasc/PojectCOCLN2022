import { TestBed } from '@angular/core/testing';

import { ReprogramarCitasService } from './reprogramar-citas.service';

describe('ReprogramarCitasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReprogramarCitasService = TestBed.get(ReprogramarCitasService);
    expect(service).toBeTruthy();
  });
});
