import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Observer } from 'rxjs';
import { BaseHttpService } from 'src/app/services/base-http.service';
import { DynamicTitleService } from 'src/app/shared/utility/dynamic-title.service';
import { HttpConstants } from '../../services/http-constants';

@Component({
  selector: 'digi-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  genOtpRes: any = '';
  agreeModal: boolean = false;
  isLoading: boolean = false;

  constructor(
    private _router: Router,
    private _dynamicTitle: DynamicTitleService,
    private _fb: FormBuilder,
    private _baseHttpService: BaseHttpService,
    private _msg: NzMessageService
  ) {}

  ngOnInit(): void {
    this.formInit();
    this._dynamicTitle.setHeaderTitle('Phone Number');
  }

  formInit() {
    this.loginForm = this._fb.group({
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.pattern('^[0-9]*$'),
        ],
        [this.asyncValidator],
      ],
      phoneNumberPrefix: ['+91', Validators.required],
      agree: [true, [Validators.required, Validators.requiredTrue]],
    });
  }

  asyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<MyValidationErrors | null>) => {
      if (this.loginForm.value.agree) {
        this.isLoading = true;
        let mobNo = control.value; //phone number
        let reqUrl = HttpConstants.otp.sendOtp + mobNo;
        this._baseHttpService
          .makeHttpRequest<boolean>({
            method: 'get',
            url: reqUrl,
          })
          .subscribe((res) => {
            this.isLoading = false;
            if (res.hasErrors()) {
              observer.next({
                duplicated: { en: `Something went wrong please try again` },
              });
            } else {
              const { data, errors } = res;
              if (data['status']) {
                this.genOtpRes = data['otp'];
                this._msg.create('success', 'OTP sent on Mobile Number.', {
                  nzDuration: 3000,
                });
                this.loginForm.controls['phoneNumber'].disable();
                observer.next(null);
                this._router.navigate(['/auth/verifyCode'], {
                  state: { data: this.genOtpRes, mobile: control.value },
                });
              } else {
                observer.next({
                  duplicated: { en: `Failed to send OTP. please try again` },
                });
              }
            }
            observer.complete();
          });
      } else {
        observer.next({
          duplicated: { en: `Please accept the Terms of use.` },
        });
        observer.complete();
      }
    });

  isPrivacyDisplay: boolean = false;
  isTermofUseDigi: boolean = false;
  //isTermofUseCV19:boolean = false;

  showPrivacy() {
    this.agreeModal = true;
    this.isPrivacyDisplay = true;
  }

  showTerms() {
    this.agreeModal = true;
    this.isTermofUseDigi = true;
  }
  custAgree() {
    this.agreeModal = false;
    this.isPrivacyDisplay = false;
    this.isTermofUseDigi = false;
  }
}

export type MyErrorsOptions = { en: string } & Record<string, any>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;
