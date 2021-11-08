import { Component, OnInit } from '@angular/core';
import { DynamicTitleService } from '@app/shared/utility/dynamic-title.service';

@Component({
  selector: 'digi-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less'],
})
export class CartComponent implements OnInit {
  constructor(private _dynamicTitleService: DynamicTitleService) {}

  ngOnInit(): void {
    this._dynamicTitleService.setHeaderTitle('Cart');
  }
}
