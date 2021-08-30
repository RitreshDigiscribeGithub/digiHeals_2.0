import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'digi-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less']
})
export class OrderComponent implements OnInit {

  medList: any[] = [
    { section: 'Medciations' },
    { section: 'Diagnostics Test ' },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
