import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'digi-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.less']
})
export class PersonalInfoComponent implements OnInit {

  part = 1;
  constructor() { }
  onChange(event) {
    console.log(event);
  }
  ngOnInit(): void {
  }

}
