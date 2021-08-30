import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'digi-time-slot',
  templateUrl: './time-slot.component.html',
  styleUrls: ['./time-slot.component.less']
})
export class TimeSlotComponent implements OnInit {
  @Input() public duration: string;
  @Input('slots') public slots: any[];
  constructor() { }

  ngOnInit(): void {
  }
  isActive;
  slot(i) {
    this.isActive = i
  }
}
