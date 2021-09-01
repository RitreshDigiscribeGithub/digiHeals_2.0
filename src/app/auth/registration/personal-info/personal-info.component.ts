import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'digi-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.less']
})
export class PersonalInfoComponent implements OnInit {

  part = 1;
  date = new Date();

  constructor() { }
  onChange(event) {
    console.log(event);
  }


  dateObj = {
    day: () => this.getDay(),
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    years: () => this.getYear()
  }
  ngOnInit(): void {
  }

  getDay() {
    let day = []
    for (let i = 1; i <= 31; i++) {
      day.push(i)
    }
    return day;
  }

  getYear() {
    let year = [];
    for (let i = 1970; i <= this.date.getFullYear(); i++) {
      year.push(i)
    }
    return year;
  }

}
