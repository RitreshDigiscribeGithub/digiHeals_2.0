import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicTitleService } from 'src/app/shared/utility/dynamic-title.service';
import { Doctor, LoginInterface } from '@interface/doctor';
import { LandingPageData } from '@interface/landingData';
import { BaseHttpService } from '@services/base-http.service';
import { DoctorService } from '@services/doctor-service/doctor.service';
import { HttpConstants } from '@services/http-constants';
import { PatientService } from '@services/patient-service/patient.service';

@Component({
  selector: 'digi-otp-screen',
  templateUrl: './otp-screen.component.html',
  styleUrls: ['./otp-screen.component.less']
})
export class OtpScreenComponent implements OnInit {
  OptConfig = {
    length: 4,
    inputStyles:
    {
      'border': 'none',
      'border-bottom': '3px solid #E5E5E5',
      'width': '22%',
      'height': '50px',
      'border- radius': '0px',
      'font-size': '25px',
      'outline':'none !important'
    },
    containerStyles: {
      'width': '100%',
      'text-align': 'center'
    },
  }

  isMobileNumberCheck:boolean = false;
  validateForm!: FormGroup;
  isLoading: boolean = false;
  genOtpRes:string = '';
  userMobile:string= '';
  timerId;
  timeLeft = 30;
  doctor:Doctor;
  allDoctors:LandingPageData[]= [];
  msg: any;

  auth: any;

  constructor(
    private _dynamicTitle: DynamicTitleService,
    private _router: Router,
    private activatedRoute: ActivatedRoute,
    private http:BaseHttpService,
    private doctorService:DoctorService,
    private patientService:PatientService

  ) {

    if (!this._router.getCurrentNavigation().extras.state) {
      this.goBack();
    } else {

      this.genOtpRes = this._router.getCurrentNavigation().extras.state.data;
      this.userMobile = this._router.getCurrentNavigation().extras.state.mobile;
      this.timerId = setInterval(() => {
        this.countdown(this);
      }, 1000);


    }

   }

  ngOnInit(): void {
    this._dynamicTitle.setPageTitle('DigiHeals :: Verify')
  }
  onOtpChange(ev) {
    console.log(ev);
    const otpToCompare = atob(ev);


    if(ev.length === 4) {
      if (otpToCompare != this.genOtpRes) {
        this.login(ev);

      } else {
        this.login(ev);

      }
    }
  }

  login(otp) {

    this.isLoading = true;

        const data = {
      doctorUsername: '',
      mobileNumber: this.userMobile,
      otpToVerify: this.genOtpRes,
    };
    this.http.makeRequest<LoginInterface>({ method: "post", url: HttpConstants.otp.loginDigiHeals, data }).subscribe((response) => {
      this.isLoading = false;

      if (response.hasErrors()) {
        this.msg.createMessage('error',response.getErrorsText());
      } else {
        if (response.data) {
          this.timeLeft = 0;
          this.countdown(this);
          // if (null) {
         localStorage.setItem("token-digiheals", response.data.token);
         localStorage.setItem("patients", JSON.stringify(response.data.patients));
         ////mapped doctor data
         var c = this.allDoctors.concat(response.data.doctorData)
         var d = c.filter((item, pos) => c.indexOf(item) === pos)
         
         this.doctorService.mappedClinicData(d)

         this.patientService.setSelectedPatient(response.data.patients[0]);        
          if(this.auth.redirectUrl) {
            this._router.navigate([this.auth.redirectUrl],{replaceUrl: true});
            this.auth.redirectUrl = null;
          } else {
          this._router.navigate(["/home"], {
            replaceUrl: true
          });
        }



        } else {

          this._router.navigate([`/auth/register/${this.userMobile}`], {
            relativeTo: this.activatedRoute,
          });

        }
      }
    });

  }
  
  verify() {
    this._router.navigateByUrl('auth/registration')
  }

  countdown(self: OtpScreenComponent) {

    if (self.timeLeft == 0) {
      clearTimeout(self.timerId);
    } else {
      self.timeLeft--;
    }
  }



  goBack(){
     this.timeLeft = 0;
     this.countdown(this);
    this._router.navigate(['/auth/login']);

  }

}
