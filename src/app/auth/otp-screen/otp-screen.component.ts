import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicTitleService } from 'src/app/shared/utility/dynamic-title.service';

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
      'font-size': '25px'
    },
    containerStyles: {
      'width': '100%',
      'text-align': 'center'
    },
  }
  constructor(
    private _dynamicTitle: DynamicTitleService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._dynamicTitle.setHeaderTitle('Verify Code')
  }
  onOtpChange(ev) {
    console.log(ev);
  }
  verify() {
    this._router.navigateByUrl('auth/registration')
  }
}
