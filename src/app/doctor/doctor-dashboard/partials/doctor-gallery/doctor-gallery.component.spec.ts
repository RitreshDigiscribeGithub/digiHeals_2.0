import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorGalleryComponent } from './doctor-gallery.component';

describe('DoctorGalleryComponent', () => {
  let component: DoctorGalleryComponent;
  let fixture: ComponentFixture<DoctorGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
