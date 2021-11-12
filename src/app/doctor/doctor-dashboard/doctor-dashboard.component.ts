import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { Clinic } from '@interface/clinic';
import { Doctor } from '@interface/doctor';
import { DoctorCMS } from '@interface/doctor-cms';
import { LandingPageData } from '@interface/landingData';
import { TelemedicineSetup } from '@interface/telemedicine-setup';
import { DoctorService } from '@app/services/doctor-service/doctor.service';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.less'],
})
export class DoctorDashboardComponent implements OnInit {
  location: string;

  constructor(
    private doctorService: DoctorService,
    private cdf: ChangeDetectorRef
  ) {}

  landingPageDataObservable: Subscription;
  public Scroll = [
    {
      Id: 'slide',
      tooltip: 'Home',
      iconName: 'home.svg',
    },
    {
      Id: 'appointment',
      tooltip: 'Appointment',
      iconName: 'calendar.svg',
    },
    {
      Id: 'overview',
      tooltip: 'Overview',
      iconName: 'address.svg',
    },
    // {
    //   section: 'treatements',
    //   tooltip: 'Treatement',
    //   iconName: 'accessible.svg'
    // },
    {
      Id: 'gallery',
      tooltip: 'Gallery',
      iconName: 'images.svg',
    },
    {
      Id: 'testimonial',
      tooltip: 'Testimonial',
      iconName: 'time.svg',
    },
    // //  {
    // Id: 'education',
    // tooltip: 'education',
    // iconName: 'time.svg'
    // },
    {
      Id: 'location',
      tooltip: 'Clinic Location',
      iconName: 'location.svg',
    },
    {
      Id: 'footer',
      tooltip: 'Contact',
      iconName: 'call.svg',
    },
  ];
  doctor: Doctor;
  clinics: Clinic[];
  actualClinic: Clinic;
  todayDateStr: string = '';
  isMobile: boolean = window.screen.width < 601;
  isAuthenticated = false;
  telemedicineSetup: TelemedicineSetup;
  doctorCms: DoctorCMS;
  days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  allStartTime: any[] = [];

  ngOnInit(): void {
    this.landingPageDataObservable = this.doctorService.data$.subscribe((d) => {
      this.handleLandingPageData(d[0]);
    });
  }

  handleLandingPageData(d: LandingPageData) {
    this.doctor = d.doctor;
    console.log(d);

    this.doctorCms = d.doctorCMS;

    this.clinics = d.clinics;

    this.telemedicineSetup = d.telemedicineSetup;
    const clinicCity = this.clinics.find((item) => {
      return item.city != '';
    });

    if (clinicCity) {
      this.location = `${clinicCity.city}, ${clinicCity.state}`;
    }
    this.cdf.detectChanges();
  }

  ngAfterContentChecked(): void {}
  anchorScroll(ID) {
    setTimeout(() => {
      document.getElementById(ID).scrollIntoView({ behavior: 'smooth' });
    }, 200);
  }
}
