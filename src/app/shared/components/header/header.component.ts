import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'digi-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  @Input() public title: string;
  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  backTo() {

  }

  //only call on template
  headerByUrl() {
    if (
      this._router.url === '/auth/verifyCode' ||
      this._router.url === '/auth/login'
    ) {
      return 'auth-header';
    } else {
      return 'local-header';
    }
  }
}
