import { TestBed } from '@angular/core/testing';

import { TableroService } from './tablero.service';

describe('TableroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TableroService = TestBed.get(TableroService);
    expect(service).toBeTruthy();
  });
});
