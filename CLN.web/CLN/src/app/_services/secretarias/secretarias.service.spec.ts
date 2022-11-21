import { TestBed } from '@angular/core/testing';

import { SecretariasService } from './secretarias.service';

describe('SecretariasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SecretariasService = TestBed.get(SecretariasService);
    expect(service).toBeTruthy();
  });
});
