import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DynamicTitleService } from 'src/app/shared/utility/dynamic-title.service';

@Component({
  selector: 'digi-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {

  doctorData = {
    photo: 'assets/images/user_placeholder.svg',
    name: 'Dr. Jenny Wilsson',
    qualification: 'General Medicine, MBBS, FCPS',
    clinicName: 'Amet Minim Hospita',
    rating: 5
  };

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
        items: 1
      },
      400: {
        items: 2
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

  constructor(private _router: Router, private _dynamicTitleService: DynamicTitleService) { }

  ngOnInit(): void {
    this._dynamicTitleService.setPageTitle('Profile')
  }

  scheduleAppointment() {
    this._router.navigateByUrl('appointment/schedule')
  }
  cilnicNow() {
    this._router.navigateByUrl('appointment/clinic-center')
  }
}
