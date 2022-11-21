import { TestBed } from '@angular/core/testing';

import { PreguntasServiceService } from './preguntas-service.service';

describe('PreguntasServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PreguntasServiceService = TestBed.get(PreguntasServiceService);
    expect(service).toBeTruthy();
  });
});
