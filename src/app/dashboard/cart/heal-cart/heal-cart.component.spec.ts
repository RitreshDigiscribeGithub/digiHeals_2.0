import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealCartComponent } from './heal-cart.component';

describe('HealCartComponent', () => {
  let component: HealCartComponent;
  let fixture: ComponentFixture<HealCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
