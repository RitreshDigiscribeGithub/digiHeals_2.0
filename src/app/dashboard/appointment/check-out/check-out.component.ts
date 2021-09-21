import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'digi-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.less']
})
export class CheckOutComponent implements OnInit {
  confirm = false;
  isError = false;
  constructor(private _router: Router) { }
 
  ngOnInit(): void {
  }
  clickBtn() {
    this.confirm = true;
    setTimeout(() => {
      this.confirm = false;

      if (!this.confirm) {
        this.isError = true;
        setTimeout(() => {
          this.isError = false;

          setTimeout(() => {
            this._router.navigate(['./'])
          }, 3000);
        }, 3000);
      }

    }, 3000);
  }
}
