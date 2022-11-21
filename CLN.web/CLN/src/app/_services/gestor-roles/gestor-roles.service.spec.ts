import { TestBed } from '@angular/core/testing';

import { GestorRolesService } from './gestor-roles.service';

describe('GestorRolesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GestorRolesService = TestBed.get(GestorRolesService);
    expect(service).toBeTruthy();
  });
});
