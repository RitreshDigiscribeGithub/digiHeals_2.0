import { Component, OnInit } from '@angular/core';
import { DynamicTitleService } from 'src/app/shared/utility/dynamic-title.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'digi-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.less']
})
export class ScheduleComponent implements OnInit {
  OwlConfig: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['a', 'b'],
    responsive: {
      0: {
        items: 3
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
    clinicName: 'Amet Minim Hospita',
    rating: 5
  };

  slots = [
    { time: 'today', slot: 5 },
    { time: 'tomorrow', slot: 12 },
    { time: 'mon, 17 Aug', slot: 4 },
    { time: 'tue, 18 Aug', slot: 15 },
    { time: 'wed, 19 Aug', slot: 15 },
  ]
  constructor(private _dynamicTitleService: DynamicTitleService) { }

  ngOnInit(): void {
    this._dynamicTitleService.headerTitleSubject.next('Schedule Appointment')
  }

  isActive;
  selectSlot(i) {
    this.isActive = i
  }
}
