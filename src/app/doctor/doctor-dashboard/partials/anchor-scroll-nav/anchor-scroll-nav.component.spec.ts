import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnchorScrollNavComponent } from './anchor-scroll-nav.component';

describe('AnchorScrollNavComponent', () => {
  let component: AnchorScrollNavComponent;
  let fixture: ComponentFixture<AnchorScrollNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnchorScrollNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnchorScrollNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
