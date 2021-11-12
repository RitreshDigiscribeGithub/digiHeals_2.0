import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorTestimonialComponent } from './doctor-testimonial.component';

describe('DoctorTestimonialComponent', () => {
  let component: DoctorTestimonialComponent;
  let fixture: ComponentFixture<DoctorTestimonialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorTestimonialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorTestimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
