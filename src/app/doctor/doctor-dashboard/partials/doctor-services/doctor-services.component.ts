import { Component, Input, OnInit } from '@angular/core';
import { icon } from '@app/shared/utility/custom-icon';
import { MediaControlService } from '@app/shared/utility/media-control.service';

@Component({
  selector: 'doctor-services',
  templateUrl: './doctor-services.component.html',
  styleUrls: [
    './doctor-services.component.less',
    '../../doctor-dashboard.component.less',
  ],
})
export class DoctorServicesComponent implements OnInit {
  @Input() treatments: treateMent[];
  pic =
    'https://images.unsplash.com/photo-1534057308991-b9b3a578f1b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80';

  Overview: any[] = [
    { categoryName: 'About', active: true },
    { categoryName: 'Work Experience', active: false },
    { categoryName: 'Speciality', active: false },
  ];
  lists = ['About', 'Work Experience', 'Speciality'];

  right_icon;
  collapseHeight = 500;
  constructor(private _breakpoint: MediaControlService) {}

  ngOnInit(): void {
    this.right_icon = icon.rigthArrow;
  }

  public num: number = 0;
  collapse(param) {
    this.num = param;
  }

  public willOnlyMobile: boolean;
  ngAfterViewChecked() {
    this.willOnlyMobile = this._breakpoint.mediaPort();
  }
}
export interface treateMent {
  categoryName: string;
  subCategories: string[];
}
