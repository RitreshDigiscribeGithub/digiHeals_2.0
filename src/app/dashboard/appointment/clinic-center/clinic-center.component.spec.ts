import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicCenterComponent } from './clinic-center.component';

describe('ClinicCenterComponent', () => {
  let component: ClinicCenterComponent;
  let fixture: ComponentFixture<ClinicCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicCenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
