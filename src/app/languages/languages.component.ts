import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'digi-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.less']
})
export class LanguagesComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }
  setLang(param) {
    localStorage.setItem('language', param);
    this._router.navigate(['auth']);
  }
}
