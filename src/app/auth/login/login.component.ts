import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicTitleService } from 'src/app/shared/utility/dynamic-title.service';

@Component({
  selector: 'digi-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(
    private _router: Router,
    private _dynamicTitle: DynamicTitleService
  ) { }

  ngOnInit(): void {
    this._dynamicTitle.setHeaderTitle('Phone Number')
  }

  continueNow() {
    this._router.navigateByUrl('auth/verifyCode')
  }

}
