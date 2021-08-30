import { Component, OnInit } from '@angular/core';
import { DynamicTitleService } from 'src/app/shared/utility/dynamic-title.service';

@Component({
  selector: 'digi-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.less']
})
export class OverviewComponent implements OnInit {
  doctorData = {
    photo: 'assets/images/user_placeholder.svg',
    name: 'Dr. Jenny Wilsson',
    qualification: 'General Medicine, MBBS, FCPS',
    clinicName: 'Amet Minim Hospita',
    rating: 5
  };
  constructor(private _dynamicTitleService: DynamicTitleService) { }

  ngOnInit(): void {
    this._dynamicTitleService.headerTitleSubject.next('Appointment Overview')
  }

}
