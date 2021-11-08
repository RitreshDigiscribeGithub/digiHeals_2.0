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
import { DgPaymentServiceService } from '@services/patient-service/dg-payment-service.service';
import { MessageService } from '@services/message.service';
import { slotInterface } from '../appointment/schedule/schedule.component';

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
    private geoLocationService: GeoLocationService,
    private digiHttp:DgPaymentServiceService,
    private msg:MessageService
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
  btnLoader:boolean = false;
  isContentLoading:boolean = true;
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
        url: `/api/v1${HttpConstants.digiheals.getLatetRx}`,
        data: { patientId: id },
      })
      .subscribe((res) => {
        this.isSpinning = false;
        if (res.hasErrors()) {
          this.msg.createMessage('Something went wrong');
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
        this.isContentLoading = false;

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
    if (url != 'whatsapp') {
    this.router.navigate([url]);
    } else {
      window.open('https://wa.me/message/MCPYI3GIIRGSO1', '_blank');
    }
  }



  markasArrived(appt:Appointment) {

  this.btnLoader = true;
  appt.isCheckin = true;

  this.digiHttp.createDocument(appt).subscribe(r =>{
    this.btnLoader = false;
  })

  }

  previewRx(item) {

    item.doc_first_name =this.doctor.doc_first_name;
    item.doc_last_name =this.doctor.doc_last_name;

    this.router.navigate(['/preview/rx'], {
      state: { rxData: item, isRxAlreadyHave: true }

    })
  }

  changeAppt(appt: Appointment) {

    const doctor = this.allDoctors.find(item => {
      return item.doctor.uid === appt.doctor_id;
    })
    this.doctorService.setPrimaryDoctor(doctor);
  
    let time;
    const clinic = doctor.clinics.filter((item) => {
      return item.doc_id === appt.clinic_id;
    });
  
    if (clinic.length > 0) {
      time = clinic[0].timings.filter((item) => {
        return item.doc_id === appt.clinic_timimg;
      });
    }
  
  
  
    const userSelectedSlot: slotInterface = {
      slotTime: appt.startDateTime,
      endSlot: appt.endDateTime,
      status: 'block',
    };
  
    const appData = {
      clinic: clinic ? clinic[0] : '',
      time: time ? time[0] : '',
      slot: userSelectedSlot,
      date: new Date(appt.startDateTime),
      patient: this.selectedPatient,
      isTelemedicine: appt.isTelimedicineAppointment,
      document_id: appt.doc_id
    };
  
    this.router.navigate(['appointment/schedule'], {
      state: { apptData: appData }
    });
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
