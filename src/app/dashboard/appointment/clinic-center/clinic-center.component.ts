import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DynamicTitleService } from 'src/app/shared/utility/dynamic-title.service';

@Component({
  selector: 'digi-clinic-center',
  templateUrl: './clinic-center.component.html',
  styleUrls: ['./clinic-center.component.less']
})
export class ClinicCenterComponent implements OnInit {
  tab: number = 1;
  iconList: any[] = [
    { icon: 'cardio', text: 'Cardio', color: '#50BAF4' },
    { icon: 'heart', text: 'Heart', color: '#FEA6A2' },
    { icon: 'kidney', text: 'Kidney', color: '#816BF2' },
    { icon: 'eye', text: 'Eyes', color: '#52CCBD' },
    { icon: 'dental', text: 'Dentist', color: '#FEA6A2' },
  ]
  OwlConfig: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 4
      },
      400: {
        items: 5
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }

  doctorData = {
    photo: 'assets/images/user_placeholder.svg',
    name: 'Dr. Jenny Wilsson',
    qualification: 'General Medicine, MBBS, FCPS',
    rating: 4
  };
  constructor(private _dynamicTitleService: DynamicTitleService) { }

  ngOnInit(): void {
    this._dynamicTitleService.setPageTitle('Wilsson Clinic Center')
  }

}
