import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'digi-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.less']
})
export class CheckOutComponent implements OnInit {
  drawer: boolean = false;
  constructor(private _router: Router) { }

  ngOnInit(): void {
  }
  radioChange(ev) {
    if (ev.target.value === 'delivery') {
      this._router.navigateByUrl('/cart/schedule-time')
    }
  }
  placeOrder() {
    this.drawer = true;
  }
}
