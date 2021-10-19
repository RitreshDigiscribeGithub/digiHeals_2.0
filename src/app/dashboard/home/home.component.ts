import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DynamicTitleService } from 'src/app/shared/utility/dynamic-title.service';
import { BaseHttpService } from '@services/base-http.service';
import { DoctorService } from '@services/doctor-service/doctor.service';
import { GeoLocationService } from '@services/geo-location.service';
import { PatientService } from '@services/patient-service/patient.service';
import { PartnerInner } from '@interface/partner';
import { Appointment } from '@interface/appointment';
import { Doctor } from '@interface/doctor';
import { HealthDocuments } from '@interface/health-document';
import { LandingPageData } from '@interface/landingData';
import { Patient } from '@interface/patient';
import * as moment from 'moment';
import { HttpConstants } from '@services/http-constants';

@Component({
  selector: 'digi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private doctorService: DoctorService,
    private http: BaseHttpService,
    private patientService: PatientService,
    private titleService: DynamicTitleService,
    private geoLocationService: GeoLocationService
  ) {}

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
        items: 2,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 3,
      },
    },
    nav: false,
  };

  health_Partners: any[] = [
    { name: 'SRL Diagnostics', logo: 'srl-logo' },
    { name: 'Suburban Diagnostics', logo: 'suburban' },
    { name: 'Dr Lal Pathlabs', logo: 'lal' },
  ];

  patientSub: any;
  doctorSub: any;
  allDoctorSub: any;

  selectedDateCalender: Date = new Date();
  doctorPartners: PartnerInner[] = [];
  doctor: Doctor;
  allDoctors: LandingPageData[];
  selectedPatient: Patient;
  isSub: boolean = false;
  patientLastRxRecords: HealthDocuments;
  followUpAppt: Appointment;
  isSpinning: boolean = true;
  patients: Patient[] = [];
  todaysAppointment: Appointment;

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.patientSub.unsubscribe();
    this.doctorSub.unsubscribe();
    this.allDoctorSub.unsubscribe();
  }

  ngOnInit(): void {
    this.titleService.setHeaderTitle('Dashboard');
    this.doctorSub = this.doctorService.primaryDoctor$.subscribe((r) => {
      if (r) {
        this.doctor = r.doctor;
        const doctorLabPartner = r.partners?.labPartner || [];
        const doctorPharmaPartner = r.partners?.pharmacyPartner || [];
        console.log(doctorLabPartner);
        console.log(doctorPharmaPartner);

        this.doctorPartners = doctorLabPartner.concat(doctorPharmaPartner);
      }
    });

    this.allDoctorSub = this.doctorService.data$.subscribe((r) => {
      this.allDoctors = r;
    });

    this.patientSub = this.patientService.selectedPatient$.subscribe((r) => {
      if (!this.isSub && r) {
        this.getPateintLastRecord(r.patient_id);
        this.getUpcomingFollowUp(r.patient_id);
        this.isSub = true;
      } else {
        this.isSpinning = false;
      }
    });
  }

  patientLastLabOrder: any;
  patientLastPharmaOrder: any;

  getPateintLastRecord(id: string) {
    // digiheals/getLatestPrescriptionForPatient
    // 'POST',HttpConstants.patient.getLastRecords,{patientId:id}
    this.isSpinning = true;

    this.http
      .makePartnerRequest<patientLastRecords>({
        method: 'POST',
        url: '/api/v1/digiheals/getLatestPrescriptionForPatient',
        data: { patientId: id },
      })
      .subscribe((res) => {
        this.isSpinning = false;
        if (res.hasErrors()) {
          alert(res.getErrorsText());
        } else {
          if (res.status) {
            this.patientLastRxRecords = res.data.patientRx;
            this.patientLastLabOrder = res.data.labPartner;
            this.patientLastPharmaOrder = res.data.pharmacyPartner;
          }
        }
      });
  }

  getUpcomingFollowUp(id: string) {
    this.http
      .makeAuthRequest<appointmentData>(
        'POST',
        HttpConstants.appointment.getFollowAppt,
        {
          patientId: id,
          timestamp: moment().startOf('day').valueOf(),
          doctorId: this.doctor?.uid || '',
        }
      )
      .subscribe((res) => {
        this.isSpinning = false;

        if (res.hasErrors()) {
        } else {
          if (res.data) {
            this.todaysAppointment = res.data.appointment;
            this.followUpAppt = res.data.appointmentFollow;
          }
        }
        this.isSub = false;
      });
  }

  goToPage(url) {
    this.router.navigate([url]);
  }
}

export interface patientLastRecords {
  labPartner: any;
  patientRx: HealthDocuments;
  pharmacyPartner: any;
}
export interface appointmentData {
  appointment: Appointment;
  appointmentFollow: Appointment;
}
