/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpTestsService } from './HttpTests.service';

describe('Service: HttpTests', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpTestsService]
    });
  });

  it('should ...', inject([HttpTestsService], (service: HttpTestsService) => {
    expect(service).toBeTruthy();
  }));
});
