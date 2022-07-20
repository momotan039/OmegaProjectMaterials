import { TestBed } from '@angular/core/testing';

import { HttpGroupsService } from './http-groups.service';

describe('HttpGroupsService', () => {
  let service: HttpGroupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpGroupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
