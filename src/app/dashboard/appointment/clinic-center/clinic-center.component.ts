import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DynamicTitleService } from 'src/app/shared/utility/dynamic-title.service';
import { Doctor } from '@interface/doctor';
import { LandingPageData } from '@interface/landingData';
import { DoctorService } from '@services/doctor-service/doctor.service';

@Component({
  selector: 'digi-clinic-center',
  templateUrl: './clinic-center.component.html',
  styleUrls: ['./clinic-center.component.less'],
})
export class ClinicCenterComponent implements OnInit {
  tab: number = 1;
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
  iconList: any[] = [
    { icon: 'cardio', text: 'Cardio', color: '#50BAF4' },
    { icon: 'heart', text: 'Heart', color: '#FEA6A2' },
    { icon: 'kidney', text: 'Kidney', color: '#816BF2' },
    { icon: 'eye', text: 'Eyes', color: '#52CCBD' },
    { icon: 'dental', text: 'Dentist', color: '#FEA6A2' },
  ];
  doctorSub:any;
  doctor:Doctor;
  constructor(private _dynamicTitleService: DynamicTitleService,private doctorService:DoctorService ) {}

  ngOnInit(): void {
    this._dynamicTitleService.setHeaderTitle('Wilsson Clinic Center');

    this.doctorSub =  this.doctorService.primaryDoctor$.subscribe((d: LandingPageData) => {
      this.doctor = d.doctor;
     

  
   
 });

  }
}
