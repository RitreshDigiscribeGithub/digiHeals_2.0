import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Doctor, LoginInterface } from '@interface/doctor';
import { LandingPageData } from '@interface/landingData';
import { Patient } from '@interface/patient';
import { BaseHttpService } from '@services/base-http.service';
import { DoctorService } from '@services/doctor-service/doctor.service';
import { HttpConstants } from '@services/http-constants';
import { PatientService } from '@services/patient-service/patient.service';

@Component({
  selector: 'digi-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.less'],
})
export class SplashScreenComponent implements OnInit {
  showSplash: boolean = true;
  username: string = '';
  private sub: Subscription;
  doctor: Doctor;
  clinicCode: string;
  count: number = 10;

  constructor(private _router: Router, private _route: ActivatedRoute, private doctorService: DoctorService, private httpService: BaseHttpService, private patientService: PatientService) {

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this._route.params.subscribe((params) => {
      if (params.username) {
        this.username = params["username"]; // (+) converts string 'id' to a number
        this.clinicCode = JSON.parse(localStorage.getItem('clinicCode'));
        if (this.clinicCode != this.username) {
          localStorage.removeItem('token-digiheals');
          localStorage.removeItem('selectedPatient');
          localStorage.removeItem('selectedDoctor');
          localStorage.removeItem('patients');
          localStorage.removeItem('primaryDoctor');
        }
        this.doctorService.username = this.username;
        this.getDoctorLandingPageData(this.username);
        localStorage.setItem('clinicCode', JSON.stringify(this.username));

      } else {

        this.doctorService.primaryDoctor$.subscribe(r => {
          if (r) {
            this.doctor = r.doctor;
          }
        })


      }
    })

    const patient: Patient = JSON.parse(localStorage.getItem("selectedPatient"));

    if (this.clinicCode === this.username || JSON.parse(localStorage.getItem('clinicCode'))) {
      if (patient) {
        this.refreshUserInfo(patient.patient_phone, patient.patient_id)
      }
    } else

      if (patient) {
        this.refreshUserInfo(patient.patient_phone, patient.patient_id);
      }



    this.increase();
  }

  increase() {
    const interval = setInterval(() => {

      this.count = this.count + 18;
      console.log('-')
      if (this.count > 100) {
        this.count = 100;
        this.showSplash = false;
        clearInterval(interval);
      }
    }, 500);
  }


  getDoctorLandingPageData(username: string) {
    this.httpService
      .makeAuthRequest<LandingPageData[]>(
        "GET",
        HttpConstants.doctor.getDoctorLandingPageData + username
      )
      .subscribe((response) => {
        if (response.hasErrors()) {
          this._router.navigate(['/auth/login']);
        } else {
          if (response.data.length === 1) {
            this.doctorService.setPrimaryDoctor(response.data[0]);
          }
          this._router.navigate(['/home']);
          this.doctorService.mappedClinicData(response.data);
        }
      });
  }




  refreshUserInfo(userMobile, id) {
    const data = {
      doctorUsername: '',
      mobileNumber: userMobile,
      otpToVerify: '',
    };
    this.httpService.makeRequest<LoginInterface>({ method: "post", url: HttpConstants.otp.loginDigiHeals, data }).subscribe((response) => {

      if (response.hasErrors()) {

      } else {
        if (response.data) {
          // if (null) {


          localStorage.setItem("token-digiheals", response.data.token);
          localStorage.setItem("patients", JSON.stringify(response.data.patients));

          this.doctorService.mappedClinicData(response.data.doctorData);


          const filterPatientData = response.data.patients.find(item => {

            return id === item.patient_id;
          })
          if (filterPatientData) {
            this.patientService.setSelectedPatient(filterPatientData);
          } else {
            this.patientService.setSelectedPatient(response.data.patients[0]);

          }

        }
      }
    });
  }
}
