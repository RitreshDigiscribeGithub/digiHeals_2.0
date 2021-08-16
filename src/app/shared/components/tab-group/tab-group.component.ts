import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'digi-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.less']
})
export class TabGroupComponent implements OnInit {
  iconPath = 'assets/icons/tabs/';
  constructor(private _router: Router) { }
  ngOnInit(): void {
  }
  urlMetch(segment): boolean {
    return segment === this._router.url;
  }
  tabNav(param) {
    this._router.navigateByUrl(param)
  }
}
