import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedCartComponent } from './added-cart.component';

describe('AddedCartComponent', () => {
  let component: AddedCartComponent;
  let fixture: ComponentFixture<AddedCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddedCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
