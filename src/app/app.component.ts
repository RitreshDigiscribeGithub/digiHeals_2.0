import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from '@interface/patient';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BaseHttpService } from '@services/base-http.service';
import { DoctorService } from '@services/doctor-service/doctor.service';
import { LazyService } from '@services/lazy.service';
import { LandingPageData } from '@interface/landingData';
import { HttpConstants } from '@services/http-constants';
import { LoginInterface } from '@interface/doctor';
import { PatientService } from '@services/patient-service/patient.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'digiHeals';

  constructor(private doctorService: DoctorService, private httpService: BaseHttpService, private router: Router,
    private lazy: LazyService,
    private msg: NzMessageService,
    private zone: NgZone,
    private cdr: ChangeDetectorRef,
    private patientService:PatientService,
    @Inject(DOCUMENT) private doc: any,) {
    
    const pathName = window.location.pathname;
    const [ , domain, subdomain] = window.location.hostname.split(".").reverse();
    console.log(subdomain)
    console.log(domain)

    if (!pathName.includes('/quickscan/sso/')) {

      if( domain && domain === 'digiheals' && subdomain && subdomain != 'www' || window.location.host == 'localhost:4202') { 

        this.getDoctorLandingPageDataByUserName(subdomain || 'vijayijardar1');
        this.doctorService.username = subdomain || 'vijayijardar1';
        
     
    } else {

      const data: string = JSON.parse(localStorage.getItem(`clinicCode`));
      const patient: Patient = JSON.parse(localStorage.getItem("selectedPatient"));
      if (data && !patient) {
        this.getDoctorLandingPageData(data);
        this.doctorService.username = data;
      } 

      if( domain && domain === 'digiheals' && this.router.url === '' || this.router.url === '/') {
      //  this.router.navigate(['/home'])
       }

    }

    } else {
      //  this._router.navigate(['language'])
    }
  }

  
getDoctorLandingPageDataByUserName(username: string) {
  this.httpService
    .makeAuthRequest<LandingPageData>(
      "GET",
      HttpConstants.doctor.getDoctorLandingPageData_ + username
    )
    .subscribe((response) => {
      if (response.hasErrors()) {
      } else {
        //this.doctorService.setPrimaryDoctor(response.data.doctor);
        
        this.doctorService.mappedClinicData([response.data]);
        if (response.data) {
          this.doctorService.setPrimaryDoctor(response.data);
          if(response.data.doctorCMS && response.data.doctorCMS.primaryColor) {
           // this.runLess(response.data.doctorCMS.primaryColor)

          }
        }

      }
    });
}


getDoctorLandingPageData(username: string) {
  this.httpService
    .makeAuthRequest<LandingPageData[]>(
      "GET",
      HttpConstants.doctor.getDoctorLandingPageData + username
    )
    .subscribe((response) => {
      if (response.hasErrors()) {
      } else {

        //this.doctorService.setPrimaryDoctor(response.data.doctor);
        this.doctorService.pushData(response.data);

        if (response.data.length === 1) {
          this.doctorService.setPrimaryDoctor(response.data[0]);
        }

      }
    });
}

refreshUserInfo(userMobile:string,id:string){
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
    
       
        const filterPatientData = response.data.patients.find( item =>{

          return id === item.patient_id;
        })
        if(filterPatientData) {
         this.patientService.setSelectedPatient(filterPatientData);   
        } else {
          this.patientService.setSelectedPatient(response.data.patients[0]);   

        }   

      } 
    }
  });
 }

}
