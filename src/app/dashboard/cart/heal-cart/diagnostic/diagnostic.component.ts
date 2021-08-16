import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'digi-diagnostic',
  templateUrl: './diagnostic.component.html',
  styleUrls: ['./diagnostic.component.less']
})
export class DiagnosticComponent implements OnInit {

  icoBg = 'width: 48px;height: 53px;background: #CDECFF;border-radius: 4px;';
  preCard = 'height: 75px;background: #FFFFFF;border: 1.3px solid #EEEEEE;box-sizing: border-box;border-radius: 6px;';
  tab = 1;
  quantity: number = 1;
  constructor() { }
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

  ngOnInit(): void {
  }
}
