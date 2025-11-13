import { TestBed } from '@angular/core/testing';

import { ChuyenkhoaService } from './chuyenkhoa.service';

describe('ChuyenkhoaService', () => {
  let service: ChuyenkhoaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChuyenkhoaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
