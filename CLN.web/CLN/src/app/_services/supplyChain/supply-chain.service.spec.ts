import { TestBed } from '@angular/core/testing';

import { SupplyChainService } from './supply-chain.service';

describe('SupplyChainService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SupplyChainService = TestBed.get(SupplyChainService);
    expect(service).toBeTruthy();
  });
});
