import { TestBed } from '@angular/core/testing';

import { HttpCoursesService } from './http-courses.service';

describe('HttpCoursesService', () => {
  let service: HttpCoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpCoursesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
