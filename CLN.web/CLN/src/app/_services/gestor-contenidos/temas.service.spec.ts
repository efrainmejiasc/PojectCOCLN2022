import { TestBed } from '@angular/core/testing';

import { TemasService } from './temas.service';

describe('TemasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TemasService = TestBed.get(TemasService);
    expect(service).toBeTruthy();
  });
});
