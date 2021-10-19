import { Component, OnInit } from '@angular/core';
import { DynamicTitleService } from 'src/app/shared/utility/dynamic-title.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'digi-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.less'],
})
export class ScheduleComponent implements OnInit {
  open = false;
  num;
  month = null;
  doctorArray = [
    {
      photo: 'assets/images/user_placeholder.svg',
      name: 'Dr. Jenny Wilsson',
      qualification: 'General Medicine, MBBS, FCPS',
      clinicName: 'Amet Minim Hospita',
      rating: 3.2,
    },
    {
      photo: 'assets/images/user_placeholder.svg',
      name: 'Dr. Jenny Wilsson',
      qualification: 'General Medicine, MBBS, FCPS',
      clinicName: 'Amet Minim Hospita',
      rating: 5,
    },
    {
      photo: 'assets/images/user_placeholder.svg',
      name: 'Dr. Jenny Wilsson',
      qualification: 'General Medicine, MBBS, FCPS',
      clinicName: 'Amet Minim Hospita',
      rating: 2.4,
    },
  ];
  //
  breakpoint1 = {
    responsive: {
      0: { items: 1 },
      400: { items: 1 },
      740: { items: 1 },
      940: { items: 4 },
    },
  };
  breakpoint2 = {
    responsive: {
      0: { items: 3 },
      400: { items: 3 },
      740: { items: 3 },
      940: { items: 4 },
    },
  };
  scrollConfig(breakpoint): OwlOptions {
    return {
      loop: false,
      mouseDrag: false,
      touchDrag: true,
      pullDrag: true,
      dots: false,
      navSpeed: 700,
      navText: ['', ''],
      nav: false,
      ...breakpoint,
    };
  }

  slots = [
    { time: 'today', slot: 5 },
    { time: 'tomorrow', slot: 12 },
    { time: 'mon, 17 Aug', slot: 4 },
    { time: 'tue, 18 Aug', slot: 15 },
    { time: 'wed, 19 Aug', slot: 15 },
  ];
  constructor(private _dynamicTitleService: DynamicTitleService) {}

  ngOnInit(): void {
    this._dynamicTitleService.setHeaderTitle('Schedule Appointment');
  }

  isActive;
  selectSlot(i) {
    this.isActive = i;
  }
  slide(e) {
    console.log(`current card is ${e}`);
    this.num = e;
  }
}
