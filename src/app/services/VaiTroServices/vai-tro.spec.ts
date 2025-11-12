import { TestBed } from '@angular/core/testing';

import { VaiTro } from './vai-tro';

describe('VaiTro', () => {
  let service: VaiTro;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaiTro);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
