import { TestBed } from '@angular/core/testing';

import { GestionarInvitacionCitasService } from './gestionar-invitacion-citas.service';

describe('GestionarInvitacionCitasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GestionarInvitacionCitasService = TestBed.get(GestionarInvitacionCitasService);
    expect(service).toBeTruthy();
  });
});
