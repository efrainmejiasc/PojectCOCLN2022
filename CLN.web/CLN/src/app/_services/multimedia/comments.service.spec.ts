import { TestBed } from '@angular/core/testing';

import { CommentsService } from './comments.service';

describe('CommentsserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommentsService = TestBed.get(CommentsService);
    expect(service).toBeTruthy();
  });
});
