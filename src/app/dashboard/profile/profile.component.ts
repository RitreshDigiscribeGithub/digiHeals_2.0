import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o'; 

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

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  bookAppointment() {
    this._router.navigate(['appointment'])
  }
}
