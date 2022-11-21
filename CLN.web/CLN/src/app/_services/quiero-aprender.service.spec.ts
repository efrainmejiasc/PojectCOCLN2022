/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QuieroAprenderService } from './quiero-aprender.service';

describe('Service: QuieroAprender', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuieroAprenderService]
    });
  });

  it('should ...', inject([QuieroAprenderService], (service: QuieroAprenderService) => {
    expect(service).toBeTruthy();
  }));
});
