import { TestBed } from '@angular/core/testing';

import { AdministrarFormularioService } from './administrar-formulario.service';

describe('AdministrarFormularioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdministrarFormularioService = TestBed.get(AdministrarFormularioService);
    expect(service).toBeTruthy();
  });
});
