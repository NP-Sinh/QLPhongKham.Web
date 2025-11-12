import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaiTroList } from './vai-tro-list';

describe('VaiTroList', () => {
  let component: VaiTroList;
  let fixture: ComponentFixture<VaiTroList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaiTroList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaiTroList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
