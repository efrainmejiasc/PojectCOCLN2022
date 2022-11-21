import { TestBed } from '@angular/core/testing';

import { GestorGruposService } from './gestor-grupos.service';

describe('GestorGruposService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GestorGruposService = TestBed.get(GestorGruposService);
    expect(service).toBeTruthy();
  });
});
