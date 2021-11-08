import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'digi-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit {
  @Input() public title: string;

  constructor(private _router: Router, private _location: Location) {}

  drawer: boolean = false;

  ngOnInit(): void {}

  backTo() {
    this._location.back();
  }
  menu_list: any[] = [
    { name: 'Home', icon: 'home', path: 'home' },
    { name: 'Health Records', icon: 'record', path: 'records' },
    { name: 'Your Orders', icon: 'orders', path: 'orderDetails' },
    { name: 'Your Bookings', icon: 'bookings', path: 'appointment' },
    { name: 'Your Account', icon: 'profile', path: 'profile' },
  ];

  bottom_list: any[] = [
    { name: 'Get Help', icon: 'help', events: () => {} },
    { name: 'Terms of Service', icon: 'tos', events: () => {} },
    { name: 'Privacy Policy', icon: 'tos', events: () => {} },
    {
      name: 'Log out',
      icon: 'logout',
      events: () => {
        this.logOut();
      },
    },
  ];
  nav(param) {
    this._router.navigateByUrl(param);
    this.drawer = false;
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

  logOut() {
    this._router.navigate(['auth']);
  }
  close() {
    this.drawer = false;
  }

  authHeader(): boolean {
    const [, segment2] = this._router.url.split('/');
    return segment2 !== 'auth';
  }
}
