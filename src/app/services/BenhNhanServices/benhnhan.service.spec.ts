import { TestBed } from '@angular/core/testing';

import { BenhnhanService } from './benhnhan.service';

describe('BenhnhanService', () => {
  let service: BenhnhanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BenhnhanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
