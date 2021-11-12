import { Component, Input, OnInit } from '@angular/core';
import { MediaControlService } from '@app/shared/utility/media-control.service';
import { Clinic } from '@interface/clinic';

@Component({
  selector: 'doctor-appointment',
  templateUrl: './doctor-appointment.component.html',
  styleUrls: [
    './doctor-appointment.component.less',
    '../../doctor-dashboard.component.less',
  ],
})
export class DoctorAppointmentComponent implements OnInit {
  @Input() clinics: Clinic[];
  @Input() open;

  selectedDateCalender = new Date();
  size: string = 'large';

  constructor(private _breakpoint: MediaControlService) {}

  dateChanged(event) {}

  ngOnInit(): void {}

  public willOnlyMobile: boolean;
  ngAfterViewChecked() {
    this.willOnlyMobile = this._breakpoint.mediaPort();
  }
}
