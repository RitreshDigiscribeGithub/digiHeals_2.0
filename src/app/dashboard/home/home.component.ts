import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DynamicTitleService } from 'src/app/shared/utility/dynamic-title.service';

@Component({
  selector: 'digi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  constructor(private _dynamicTitleService: DynamicTitleService) { }
  OwlConfig: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: false
  }

  health_Partners: any[] = [
    { name: 'SRL Diagnostics', logo: 'srl-logo' },
    { name: 'Suburban Diagnostics', logo: 'suburban' },
    { name: 'Dr Lal Pathlabs', logo: 'lal' },
  ]
  ngOnInit(): void {
    this._dynamicTitleService.headerTitleSubject.next('dashboard');
  }

}
