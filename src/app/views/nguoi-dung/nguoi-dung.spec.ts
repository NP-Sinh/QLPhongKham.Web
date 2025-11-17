import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NguoiDung } from './nguoi-dung';

describe('NguoiDung', () => {
  let component: NguoiDung;
  let fixture: ComponentFixture<NguoiDung>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NguoiDung]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NguoiDung);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
