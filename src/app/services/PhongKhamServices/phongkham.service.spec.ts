import { TestBed } from '@angular/core/testing';

import { PhongkhamService } from './phongkham.service';

describe('PhongkhamService', () => {
  let service: PhongkhamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhongkhamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
