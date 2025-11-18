import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhongKham } from './phong-kham';

describe('PhongKham', () => {
  let component: PhongKham;
  let fixture: ComponentFixture<PhongKham>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhongKham]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhongKham);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
