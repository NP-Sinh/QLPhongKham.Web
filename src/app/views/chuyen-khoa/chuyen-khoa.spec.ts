import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChuyenKhoa } from './chuyen-khoa';

describe('ChuyenKhoa', () => {
  let component: ChuyenKhoa;
  let fixture: ComponentFixture<ChuyenKhoa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChuyenKhoa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChuyenKhoa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
