import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorClinicLocationsComponent } from './doctor-clinic-locations.component';

describe('DoctorClinicLocationsComponent', () => {
  let component: DoctorClinicLocationsComponent;
  let fixture: ComponentFixture<DoctorClinicLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorClinicLocationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorClinicLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
