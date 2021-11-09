import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicTitleService } from 'src/app/shared/utility/dynamic-title.service';

@Component({
  selector: 'digi-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less'],
})
export class RegistrationComponent implements OnInit {
  tab: number = 1;
  constructor(
    private _dynamicTitle: DynamicTitleService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._dynamicTitle.setHeaderTitle('registration');
  }
  continue() {
    this._router.navigateByUrl('home');
  }

  nextHealthForm() {
    this.tab = 2;
  }
}
