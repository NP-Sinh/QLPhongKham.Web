import { TestBed } from '@angular/core/testing';

import { NguoidungService } from './nguoidung.service';

describe('NguoidungService', () => {
  let service: NguoidungService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NguoidungService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
