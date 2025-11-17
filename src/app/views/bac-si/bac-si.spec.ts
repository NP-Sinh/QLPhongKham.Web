import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacSi } from './bac-si';

describe('BacSi', () => {
  let component: BacSi;
  let fixture: ComponentFixture<BacSi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BacSi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BacSi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
