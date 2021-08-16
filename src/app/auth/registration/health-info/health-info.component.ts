import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'digi-health-info',
  templateUrl: './health-info.component.html',
  styleUrls: ['./health-info.component.less']
})
export class HealthInfoComponent implements OnInit {

  constructor() { }

  listOfOption: Array<{ label: string; value: string }> = [];
  listOfTagOptions = [];

  ngOnInit(): void {
    const children: Array<{ label: string; value: string }> = [];
    for (let i = 10; i < 36; i++) {
      children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    }
    this.listOfOption = children;
  }

}
