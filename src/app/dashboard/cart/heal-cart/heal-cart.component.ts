import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'digi-heal-cart',
  templateUrl: './heal-cart.component.html',
  styleUrls: ['./heal-cart.component.less']
})
export class HealCartComponent implements OnInit {
  cartType: number = 1;
  constructor() { }
  ngOnInit(): void {
  }

}
