import { TestBed } from '@angular/core/testing';

import { PermitServiceService } from './permit-service.service';

describe('PermitServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PermitServiceService = TestBed.get(PermitServiceService);
    expect(service).toBeTruthy();
  });
});
