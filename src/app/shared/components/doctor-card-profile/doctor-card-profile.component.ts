import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'digi-doctor-card-profile',
  templateUrl: './doctor-card-profile.component.html',
  styleUrls: ['./doctor-card-profile.component.less']
})
export class DoctorCardProfileComponent implements OnInit {
  @Input() public data;
  @Input() public color;
  tooltips = ['(1.8)', '(2.8)', '(3.8)', '(4.8)', '(5.8)'];
  value = 3;
  constructor() { }

  ngOnInit(): void {
  }

}
