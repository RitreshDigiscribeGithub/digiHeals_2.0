import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'digi-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.less'],
})
export class CalendarComponent implements OnInit {
  @Output() selected = new EventEmitter<string>();
  constructor() {}

  open = false;
  selectMonth = null;
  datePicker(value) {
    this.selectMonth = value;
    this.open = false;
  }
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
        items: 6,
      },
      400: {
        items: 6,
      },
      740: {
        items: 6,
      },
      940: {
        items: 6,
      },
    },
    nav: false,
  };
  date = new Date();

  dateObj = {
    month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  };

  ngOnInit(): void {}
}
