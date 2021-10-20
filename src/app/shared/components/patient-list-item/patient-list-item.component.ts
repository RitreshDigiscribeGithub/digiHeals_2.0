import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'digi-patient-list-item',
  templateUrl: './patient-list-item.component.html',
  styleUrls: ['./patient-list-item.component.less'],
})
export class PatientListItemComponent implements OnInit {
  @Input() dataArray;
  constructor() {}

  ngOnInit(): void {}
}
