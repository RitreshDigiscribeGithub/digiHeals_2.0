import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewAndRefillComponent } from './review-and-refill.component';

describe('ReviewAndRefillComponent', () => {
  let component: ReviewAndRefillComponent;
  let fixture: ComponentFixture<ReviewAndRefillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewAndRefillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewAndRefillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
