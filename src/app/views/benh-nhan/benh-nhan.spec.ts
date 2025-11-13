import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenhNhan } from './benh-nhan';

describe('BenhNhan', () => {
  let component: BenhNhan;
  let fixture: ComponentFixture<BenhNhan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BenhNhan]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenhNhan);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
