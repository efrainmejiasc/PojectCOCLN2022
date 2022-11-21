import { TestBed } from '@angular/core/testing';

import { AdminWebService } from './admin-web.service';

describe('AdminWebService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminWebService = TestBed.get(AdminWebService);
    expect(service).toBeTruthy();
  });
});
