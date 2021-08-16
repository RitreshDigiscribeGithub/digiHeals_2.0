import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatToDoctorComponent } from './chat-to-doctor.component';

describe('ChatToDoctorComponent', () => {
  let component: ChatToDoctorComponent;
  let fixture: ComponentFixture<ChatToDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatToDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatToDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
