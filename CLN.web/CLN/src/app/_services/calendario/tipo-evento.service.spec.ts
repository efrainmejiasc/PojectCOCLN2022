import { TestBed } from '@angular/core/testing';

import { TipoEventoService } from './tipo-evento.service';

describe('TipoEventoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoEventoService = TestBed.get(TipoEventoService);
    expect(service).toBeTruthy();
  });
});
