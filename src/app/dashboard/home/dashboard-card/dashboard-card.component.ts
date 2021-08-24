import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'digi-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.less']
})
export class DashboardCardComponent implements OnInit {
  @Input() public title: string;
  @Input() public description: string;
  @Input() public color: string;
  @Input() public icon: string;
  @Input() public iconWidth: string;
  @Input() public list: any[];
  @Input() public tag: string;
  iconUrl = null;
  constructor() { }

  ngOnInit(): void {
    if (this.icon) {
      this.iconUrl = `url(assets/icons/dashboard_icon/${this.icon}.svg)`
    }
  }

}
