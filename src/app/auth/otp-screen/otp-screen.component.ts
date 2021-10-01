import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Observer } from 'rxjs';
import { Doctor, LoginInterface } from 'src/app/models/doctor';
import { LandingPageData } from 'src/app/models/landingData';
import { BaseHttpService } from 'src/app/services/base-http.service';
import { DoctorService } from 'src/app/services/doctor-service/doctor.service';
import { HttpConstants } from 'src/app/services/http-constants';
import { PatientService } from 'src/app/services/patient-service/patient.service';
import { DynamicTitleService } from 'src/app/shared/utility/dynamic-title.service';
import { AuthGuard } from '../guards/auth.guard';
import { MyValidationErrors } from '../login/login.component';

@Component({
  selector: 'digi-otp-screen',
  templateUrl: './otp-screen.component.html',
  styleUrls: ['./otp-screen.component.less'],
})
export class OtpScreenComponent implements OnInit {
  OptConfig = {
    length: 4,
    inputStyles: {
      border: 'none',
      'border-bottom': '3px solid #E5E5E5',
      width: '22%',
      height: '50px',
      'border- radius': '0px',
      'font-size': '25px',
    },
    containerStyles: {
      width: '100%',
      'text-align': 'center',
    },
  };
  isLoading: boolean = false;
  timeLeft = 30;
  genOtpRes: string = '';
  userMobile: string = '';
  timerId;
  OtpForm: FormGroup;
  typingOTP: Number;
  doctor: Doctor;
  allDoctors: LandingPageData[] = [];

  constructor(
    private _auth: AuthGuard,
    private _dynamicTitle: DynamicTitleService,
    private _router: Router,
    private _fb: FormBuilder,
    private _msg: NzMessageService,
    private _baseHttpService: BaseHttpService,
    private _doctorService: DoctorService,
    private _patientService: PatientService,
    private activatedRoute: ActivatedRoute
  ) {
    this.get_data_from_router_state();
  }

  private get_data_from_router_state() {
    if (!this._router.getCurrentNavigation().extras.state) {
      this.goBack();
    } else {
      const { data, mobile } = this._router.getCurrentNavigation().extras.state;
      this.genOtpRes = data;
      this.userMobile = mobile;
      this.timerId = setInterval(() => {
        this.countdown(this);
      }, 1000);
    }
  }

  countdown(self: OtpScreenComponent) {
    if (self.timeLeft == 0) {
      clearTimeout(self.timerId);
    } else {
      self.timeLeft--;
    }
  }

  private fromInit() {
    this.OtpForm = this._fb.group({
      agree: [true, [Validators.required, Validators.requiredTrue]],
      otp: [
        '',
        [
          Validators.required,
          Validators.maxLength(4),
          Validators.minLength(4),
          Validators.pattern('^[0-9]*$'),
        ],
        [this.otpAsyncValidator],
      ],
    });
  }

  ngOnInit(): void {
    this.fromInit();
    this._dynamicTitle.setHeaderTitle('Verify Code');
  }
  onOtpChange(ev) {
    this.typingOTP = ev;
  }
  goBack() {
    this.timeLeft = 0;
    this.countdown(this);
    this._router.navigate(['/auth/login']);
  }

  otpAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<MyValidationErrors | null>) => {
      const OtpCompare = atob(this.genOtpRes);
      if (OtpCompare != control.value) {
        observer.next({
          duplicated: { en: `Please enter valid OTP` },
        });
      } else {
        if (this.OtpForm.get('agree').value) {
          observer.next(null);
          this.login(OtpCompare === control.value);
        } else {
          observer.next({
            duplicated: { en: `Please Accept T&C and click Login` },
          });
        }
      }
      observer.complete();
    });

  private login(isValid) {
    this.isLoading = true;
    // if (isValid) {
    //   return false;
    // }
    const data = {
      doctorUsername: '',
      mobileNumber: this.userMobile,
      otpToVerify: this.genOtpRes,
    };
    console.log(data);
    this._baseHttpService
      .makeHttpRequest<LoginInterface>({
        method: 'post',
        url: HttpConstants.otp.loginDigiHeals,
        data,
      })
      .subscribe((res) => {
        this.isLoading = false;
        if (res.hasErrors()) {
          this._msg.create('error', res.getErrorsText());
        } else {
          if (res.data) {
            this.timeLeft = 0;
            this.countdown(this);
            const { doctorData, patients, token } = res.data;
            localStorage.setItem('token-digiheals', token);
            localStorage.setItem('patients', JSON.stringify(patients));
            //maping to drData
            let x = this.allDoctors.concat(doctorData);
            let y = x.filter((item, pos) => x.indexOf(item) === pos);
            this._doctorService.mappedClinicData(y);
            this._patientService.setSelectedPatient(patients[0]);
            if (this._auth.redirectUrl) {
              this._router.navigate([this._auth.redirectUrl], {
                replaceUrl: true,
              });
              this._auth.redirectUrl = null;
            } else {
              this._router.navigate(['/home'], {
                replaceUrl: true,
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
  resendOTP() {
    this.isLoading = true;
    this._baseHttpService
      .makeHttpRequest<boolean>({
        method: 'get',
        url: `${HttpConstants.otp.resendOtp}${this.userMobile}/${this.genOtpRes}`,
      })
      .subscribe((response) => {
        if (response.hasErrors()) {
          this._msg.create('error', response.getErrorsText());
        } else {
          var res: any = response.data;
          if (res.status) {
            this.genOtpRes = res.otp;
            this.timeLeft = 30;
            this.timerId = setInterval(() => {
              this.countdown(this);
            }, 1000);
            this._msg.create('success', 'OTP resent on mobile number.');
          } else {
            this._msg.create(
              'error',
              'Failed to send otp please try again'
            );
          }
        }

        this.isLoading = false;
      });
  }
}
