import { TestBed } from '@angular/core/testing';

import { GestionUsuariosService } from './gestion-usuarios.service';

describe('GestionUsuariosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GestionUsuariosService = TestBed.get(GestionUsuariosService);
    expect(service).toBeTruthy();
  });
});
