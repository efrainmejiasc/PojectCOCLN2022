/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ExperienciaService } from './experiencia.service';

describe('Service: Experiencia', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExperienciaService]
    });
  });

  it('should ...', inject([ExperienciaService], (service: ExperienciaService) => {
    expect(service).toBeTruthy();
  }));
});
