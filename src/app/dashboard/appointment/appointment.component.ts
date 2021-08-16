import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'digi-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.less']
})
export class AppointmentComponent implements OnInit {
  doctorData = {
    photo: 'assets/images/user_placeholder.svg',
    name: 'Dr. Jenny Wilsson',
    qualification: 'General Medicine, MBBS, FCPS',
    clinicName: 'Amet Minim Hospita',
    rating: 5
  };

  constructor() { }

  ngOnInit(): void {
  }

}
