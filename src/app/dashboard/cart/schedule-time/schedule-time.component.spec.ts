import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleTimeComponent } from './schedule-time.component';

describe('ScheduleTimeComponent', () => {
  let component: ScheduleTimeComponent;
  let fixture: ComponentFixture<ScheduleTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
