import { Component, OnInit } from '@angular/core';
import { DynamicTitleService } from 'src/app/shared/utility/dynamic-title.service';

@Component({
  selector: 'digi-heal-cart',
  templateUrl: './heal-cart.component.html',
  styleUrls: ['./heal-cart.component.less']
})
export class HealCartComponent implements OnInit {
  cartType: number = 1;
  constructor(private _dynamicTitleService:DynamicTitleService) { }
  ngOnInit(): void {
    this._dynamicTitleService.headerTitleSubject.next('Heal Cart')
  }

}
