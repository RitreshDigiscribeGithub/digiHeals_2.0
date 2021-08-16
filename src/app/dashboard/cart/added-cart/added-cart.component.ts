import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'digi-added-cart',
  templateUrl: './added-cart.component.html',
  styleUrls: ['./added-cart.component.less']
})
export class AddedCartComponent implements OnInit {
  icoBg = 'width: 48px;height: 53px;background: #CAF7F4;border-radius: 4px;';
  preCard = 'min-height: 75px;background: #FFFFFF;box-sizing: border-box;';
  quantity: number = 1;
  num = 1;
  limit = 7;

  minus() {
    if (this.num != 1) {
      this.num--;
      this.quantity = this.num;
    }
  }
  plus() {
    if (this.num != this.limit) {
      this.num++;
      this.quantity = this.num
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
