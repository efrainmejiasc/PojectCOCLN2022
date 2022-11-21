import { TestBed } from '@angular/core/testing';

import { MicrositiosService } from './micrositios.service';

describe('MicrositiosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MicrositiosService = TestBed.get(MicrositiosService);
    expect(service).toBeTruthy();
  });
});
