import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicTitleService } from 'src/app/shared/utility/dynamic-title.service';
import { BaseHttpService } from '@services/base-http.service';
import { MessageService } from '@services/message.service';
import { Observable, Observer } from 'rxjs';
import { HttpConstants } from '../../services/http-constants';

@Component({
  selector: 'digi-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  validateForm!: FormGroup;
  isLoading: boolean = false;
  genOtpRes:any ='';
  agreeModal:boolean = false;

  constructor(
    private _router: Router,
    private _dynamicTitle: DynamicTitleService,
    private fb: FormBuilder, private baseHttpService: BaseHttpService,private msg:MessageService,
  ) { }

  ngOnInit(): void {
    this._dynamicTitle.setPageTitle('DigiHeals | Login');

    this.validateForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('^[0-9]*$')], [this.userNameAsyncValidator]],
      phoneNumberPrefix: ['+91'],
      agree: [true, [Validators.required, Validators.requiredTrue]],
    });
  }

  continueNow() {
    this._router.navigateByUrl('auth/verifyCode')
  }

  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<MyValidationErrors | null>) => {
           
        if(this.validateForm.value.agree === true) {
        this.isLoading = true;
       this.baseHttpService.makeRequest<boolean>({ method: "get", url: HttpConstants.otp.sendOtp + control.value }).subscribe((response) => {
        this.isLoading = false;
        if (response.hasErrors()) {
          observer.next({
            duplicated: { en: `Something went wrong please try again` }
          });
        } else {
          var res: any = response.data;
          if (res.status) {
            this.genOtpRes = res.otp;
            this.validateForm.controls['phoneNumber'].disable();
            this.msg.createMessage('success','OTP sent on Mobile Number.');
            observer.next(null);
            this._router.navigate(['/auth/verifyCode'],{ state: { data: this.genOtpRes,mobile: control.value } })
          } else {
            observer.next({
              duplicated: { en: `Failed to send OTP. please try again` }
            });
          }
        }
        observer.complete();
      });
    } else {
      observer.next({
        duplicated: { en: `Please accept the Terms of use.`}
      });
      observer.complete();
    }
    

    });

}

export type MyErrorsOptions = { en: string } & Record<string, any>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;
