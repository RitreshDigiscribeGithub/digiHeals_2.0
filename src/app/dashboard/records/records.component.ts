import { Component, OnInit } from '@angular/core';
import { DynamicTitleService } from 'src/app/shared/utility/dynamic-title.service';
import { DoctorService } from '@services/doctor-service/doctor.service';
import { Router } from '@angular/router';
import { BaseHttpService } from '@services/base-http.service';
import { PatientService } from '@services/patient-service/patient.service';
import { Doctor } from '@interface/doctor';
import {
  HealthDocuments,
  HealthDocumentWrapper,
} from '@interface/health-document';
import { LandingPageData } from '@interface/landingData';
import { Patient } from '@interface/patient';
import * as moment from 'moment';
import { HttpConstants } from '@services/http-constants';

@Component({
  selector: 'digi-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.less'],
})
export class RecordsComponent implements OnInit {
  sub: any;
  doctorSub: any;
  allDoctorSub: any;
  doctor: Doctor;
  selectedPatient: Patient;
  patientList: Patient[] = [];
  healthDocumentMaster: HealthDocuments[] = [];
  documents: HealthDocumentWrapper[] = [];
  labReports: HealthDocumentWrapper[] = [];
  snapRx: HealthDocumentWrapper[] = [];
  otherDocuments: HealthDocumentWrapper[] = [];
  initLoading: boolean = false;
  loading: boolean = true;
  allDoctors: LandingPageData[] = [];
  previewDocuments = [];
  activeStep: string = 'Rx';

  constructor(
    private _dynamicTitleService: DynamicTitleService,
    private doctorService: DoctorService,
    private http: BaseHttpService,
    private patientService: PatientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._dynamicTitleService.setHeaderTitle('Records');
    this.doctorSub = this.doctorService.primaryDoctor$.subscribe((r) => {
      this.doctor = r.doctor;
    });

    this.allDoctorSub = this.doctorService.data$.subscribe((r) => {
      this.allDoctors = r;
    });

    this.sub = this.patientService.selectedPatient$.subscribe((r) => {
      this.selectedPatient = r;
      this.getPatientDocument(this.selectedPatient.patient_id);
      this.loading = true;
    });
  }

  getPatientDocument(patientId: string) {
    this.labReports = [];
    this.otherDocuments = [];
    this.healthDocumentMaster = [];
    this.previewDocuments = [];
    this.http
      .makeAuthRequest<HealthDocumentResponse>(
        'POST',
        HttpConstants.doctor.getAllDocument + patientId
      )
      .subscribe((res) => {
        this.loading = false;
        if (res.hasErrors()) {
          alert(res.getErrorsText());
        } else {
          this.healthDocumentMaster = res.data.documents;
          this.manipulateData();
        }
      });
  }

  trackById(doc_id, appt) {
    return doc_id;
  }

  viewRecords(type: string) {
    if (type != this.activeStep) {
      this.activeStep = type;
      this.loading = true;

      switch (type) {
        case 'Rx':
          this.previewDocuments = this.snapRx;
          this.loading = false;
          break;
        case 'Lab':
          this.previewDocuments = this.labReports;
          this.loading = false;
          break;
        case 'Other':
          this.previewDocuments = this.labReports;
          this.loading = false;
          break;
        default:
          this.loading = false;
          break;
      }
    }
  }

  manipulateData() {
    const healthDocuments = this.healthDocumentMaster;
    this.documents = [];
    this.labReports = [];
    this.snapRx = [];
    this.otherDocuments = [];
    for (let index = 0; index < healthDocuments.length; index++) {
      const element = healthDocuments[index];
      if (element.type) {
        element.digital_data.forEach((x) => {
          element.rxUrl = element.rxUrl ? element.rxUrl : x.photo;
          const doc = {
            name: x.name,
            url: x.photo,
            doc_id: element.doc_id,
            doctor_id: element.doctor_id,
            patient_id: element.patient_id,
            timestamp: element.timestamp,
            date: moment(element.timestamp).format('DD/MM/YYYY'),
            type: element.type,
            uploadedBy: element.uploadedBy ? element.uploadedBy : '',
            acutalDoc: element,
          };
          this.documents.push(doc);
        });
      } else {
        const doc = {
          name: '',
          url: element.rxUrl,
          doc_id: element.doc_id,
          doctor_id: element.doctr_id,
          patient_id: element.patient_id,
          timestamp: element.timestamp,
          date: moment(element.timestamp).format('DD/MM/YYYY'),
          type: 'digital',
          uploadedBy: element.uploadedBy ? element.uploadedBy : '',
          acutalDoc: element,
        };
        this.documents.push(doc);
      }
    }

    this.snapRx = this.documents.filter(
      (x) => x.type == 'digital_pres' || x.type == 'digital'
    );
    this.previewDocuments = this.snapRx;
    const audios = this.documents.filter((x) => x.type == 'user_audio');
    const videos = this.documents.filter((x) => x.type == 'user_video');
    const images = this.documents.filter((x) => x.type == 'digital_phexam');
    this.labReports = this.documents.filter((x) => x.type == 'user_labreport');
    const labReports: HealthDocumentWrapper[] = this.documents.filter(
      (x) => x.type == 'digital_labreport'
    );
    this.labReports = this.labReports.concat(labReports);
    this.otherDocuments = this.otherDocuments.concat(audios, videos, images);
  }
}

export interface HealthDocumentResponse {
  documents: HealthDocuments[];
}
