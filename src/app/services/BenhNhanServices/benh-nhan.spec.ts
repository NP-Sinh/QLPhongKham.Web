import { TestBed } from '@angular/core/testing';

import { BenhNhan } from './benh-nhan';

describe('BenhNhan', () => {
  let service: BenhNhan;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BenhNhan);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
