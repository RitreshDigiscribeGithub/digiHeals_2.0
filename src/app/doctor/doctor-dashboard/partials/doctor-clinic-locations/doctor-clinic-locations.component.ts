import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Clinic } from '@app/interface/clinic';
import { MediaControlService } from '@app/shared/utility/media-control.service';

@Component({
  selector: 'doctor-clinic-locations',
  templateUrl: './doctor-clinic-locations.component.html',
  styleUrls: [
    './doctor-clinic-locations.component.less',
    '../../doctor-dashboard.component.less',
  ],
})
export class DoctorClinicLocationsComponent implements OnInit {
  @Input() clinics: Clinic[];
  willOnlyMobile: boolean;

  constructor(
    private _viewMedia: MediaControlService,
    private crdf: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}
  ngAfterContentChecked(): void {
    this.willOnlyMobile = this._viewMedia.mediaPort();
    this.crdf.detectChanges();
  }
}
