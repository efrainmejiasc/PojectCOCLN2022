import { TestBed } from '@angular/core/testing';

import { BibliotecaService } from './biblioteca.service';

describe('BibliotecaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BibliotecaService = TestBed.get(BibliotecaService);
    expect(service).toBeTruthy();
  });
});
