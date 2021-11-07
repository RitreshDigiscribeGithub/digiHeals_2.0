import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'digi-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.less']
})
export class PrescriptionComponent implements OnInit {
  prescription = false;
  constructor() { }

  ngOnInit(): void {
  }

}
