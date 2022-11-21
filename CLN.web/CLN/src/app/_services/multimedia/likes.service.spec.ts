import { TestBed } from '@angular/core/testing';

import { LikesService } from './likes.service';

describe('LikesserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LikesService = TestBed.get(LikesService);
    expect(service).toBeTruthy();
  });
});
